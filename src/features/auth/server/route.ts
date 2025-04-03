import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, signUpSchema } from "@/features/schemas";

const app = new Hono()
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { email, password } = c.req.valid("json");
    return c.json({ success: "ok", email, password });
  })
  .post("/register", zValidator("json", signUpSchema), async (c) => {
    const { name, email, password } = c.req.valid("json");
    return c.json({ success: "ok", name, email, password });
  });

export default app;
