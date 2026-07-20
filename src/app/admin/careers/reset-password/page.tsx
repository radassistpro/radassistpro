import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function AdminResetPasswordRedirect() {
  redirect("/admin/careers/forgot-password/");
}
