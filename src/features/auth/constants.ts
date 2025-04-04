import { CookieOptions } from "hono/utils/cookie";
export const AUTH_COOKIE_NAME = "sk-project-management-session";
export const AUTH_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  path: "/",
  secure: true,
  sameSite: "strict",
  maxAge: 60 * 60 * 24 * 30,
};
