import { clearAdminSession } from "@/lib/admin";
import { redirect } from "next/navigation";

export async function GET() {
  await clearAdminSession();
  redirect("/admin/login");
}