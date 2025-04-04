import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { ID } from "node-appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";
import { workspaceSchema } from "../schemas";
import { BUCKET_ID, DATABASE_ID, WORKSPACES_ID } from "@/config";

const app = new Hono()
  .get("/", sessionMiddleware, async (c) => {
    const databases = c.get("databases");
    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID
    );
    return c.json({ data: workspaces.documents });
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
        }
      );
      return c.json({ data: workspace }, 201);
    }
  );

export default app;
