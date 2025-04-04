import { Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, signUpSchema } from "@/features/auth/schemas";
import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from "../constants";

const app = new Hono()
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { email, password } = c.req.valid("json");
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
    setCookie(c, AUTH_COOKIE_NAME, session.secret, AUTH_COOKIE_OPTIONS);
    return c.json({ success: true });
  })
  .post("/register", zValidator("json", signUpSchema), async (c) => {
    const { name, email, password } = c.req.valid("json");

    const { account } = await createAdminClient();

    await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE_NAME, session.secret, AUTH_COOKIE_OPTIONS);
    return c.json({ success: true });
  })
  .post("/logout", async (c) => {
    deleteCookie(c, AUTH_COOKIE_NAME);
    return c.json({ success: true });
  });

export default app;
