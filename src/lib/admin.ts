import { cookies } from "next/headers";

const ADMIN_COOKIE = "aeterna_admin";

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE)?.value === "true";
}

export async function setAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE, "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();

  cookieStore.delete(ADMIN_COOKIE);
}