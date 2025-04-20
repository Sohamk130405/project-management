import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ID, Query } from "node-appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";
import { workspaceSchema } from "../schemas";
import { BUCKET_ID, DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { MemberRole } from "@/features/members/types";
import { generateInviteCode } from "@/lib/utils";
import { getMember } from "@/features/members/utils";
import { z } from "zod";
import { Workspace } from "../types";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");

    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", user.$id),
    ]);

    if (members.total === 0) c.json({ data: { document: [] }, total: 0 });

    const workspaceIds = members.documents.map((member) => member.workspaceId);

    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceIds)]
    );

    return c.json({ data: workspaces });
  })
  .get("/:workspaceId", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const { workspaceId } = c.req.param();
    const databases = c.get("databases");

    const member = await getMember({
      workspaceId,
      userId: user.$id,
      databases,
    });

    if (!member) return c.json({ error: "Unauthorized" }, 401);
    const workspace = await databases.getDocument<Workspace>(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId
    );

    return c.json({ data: workspace });
  })
  .get("/:workspaceId/info", sessionMiddleware, async (c) => {
    const { workspaceId } = c.req.param();
    const databases = c.get("databases");

    const workspace = await databases.getDocument<Workspace>(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId
    );

    return c.json({
      data: {
        name: workspace.name,
      },
    });
  })
  .post(
    "/",
    sessionMiddleware,
    zValidator("form", workspaceSchema),
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");
      const storage = c.get("storage");
      const { name, image } = c.req.valid("form");

      let uploadedImageUrl: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile(BUCKET_ID, ID.unique(), image);
        const arrayBuffer = await storage.getFileView(BUCKET_ID, file.$id);

        uploadedImageUrl = `data:image/png;base64,${Buffer.from(
          arrayBuffer
        ).toString("base64")}`;
      }
      const workspace = await databases.createDocument(
        DATABASE_ID,
        WORKSPACES_ID,
        ID.unique(),
        {
          name,
          userId: user.$id,
          imageUrl: uploadedImageUrl,
          inviteCode: generateInviteCode(),
        }
      );
      await databases.createDocument(DATABASE_ID, MEMBERS_ID, ID.unique(), {
        userId: user.$id,
        workspaceId: workspace.$id,
        role: MemberRole.ADMIN,
      });
      return c.json({ data: workspace }, 201);
    }
  )
  .patch(
    "/:workspaceId",
    sessionMiddleware,
    zValidator("form", workspaceSchema),
    async (c) => {
      const databases = c.get("databases");
      const user = c.get("user");
      const storage = c.get("storage");

      const { workspaceId } = c.req.param();
      const { name, image } = c.req.valid("form");

      const member = await getMember({
        databases,
        userId: user.$id,
        workspaceId,
      });

      if (!member || member.role !== MemberRole.ADMIN)
        return c.json({ error: "Unauthorized" }, 401);

      let uploadedImageUrl: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile(BUCKET_ID, ID.unique(), image);
        const arrayBuffer = await storage.getFileView(BUCKET_ID, file.$id);

        uploadedImageUrl = `data:image/png;base64,${Buffer.from(
          arrayBuffer
        ).toString("base64")}`;
      } else {
        uploadedImageUrl = image;
      }

      const workspace = await databases.updateDocument(
        DATABASE_ID,
        WORKSPACES_ID,
        workspaceId,
        {
          name,
          imageUrl: uploadedImageUrl,
        }
      );
      return c.json({ data: workspace }, 200);
    }
  )
  .delete("/:workspaceId", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");
    const { workspaceId } = c.req.param();
    const member = await getMember({
      databases,
      workspaceId,
      userId: user.$id,
    });

    if (!member || member.role !== MemberRole.ADMIN)
      return c.json({ error: "Unauthorized" }, 401);

    await databases.deleteDocument(DATABASE_ID, WORKSPACES_ID, workspaceId);

    return c.json({ data: { $id: workspaceId } }, 200);
  })
  .put("/:workspaceId/reset-invite-code", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");
    const { workspaceId } = c.req.param();
    const member = await getMember({
      databases,
      workspaceId,
      userId: user.$id,
    });

    if (!member || member.role !== MemberRole.ADMIN)
      return c.json({ error: "Unauthorized" }, 401);

    const workspace = await databases.updateDocument(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId,
      {
        inviteCode: generateInviteCode(),
      }
    );

    return c.json({ data: workspace }, 200);
  })
  .post(
    "/:workspaceId/join",
    sessionMiddleware,
    zValidator("json", z.object({ code: z.string() })),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");
      const { workspaceId } = c.req.param();
      const { code } = c.req.valid("json");

      const member = await getMember({
        databases,
        userId: user.$id,
        workspaceId,
      });
      if (member) return c.json({ error: "Already a member" }, 400);

      const workspace = await databases.getDocument<Workspace>(
        DATABASE_ID,
        WORKSPACES_ID,
        workspaceId
      );

      if (code !== workspace.inviteCode)
        return c.json({ error: "Invalid invite code" }, 400);

      await databases.createDocument(DATABASE_ID, MEMBERS_ID, ID.unique(), {
        userId: user.$id,
        workspaceId: workspace.$id,
        role: MemberRole.MEMBER,
      });
      return c.json({ data: workspace }, 200);
    }
  );

export default app;
