import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminCareersDashboard } from "@/components/admin/AdminCareersDashboard";
import { getHrUser } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Careers Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminCareersPage() {
  const session = await getHrUser();
  if (!session) redirect("/admin/careers/login");

  return <AdminCareersDashboard />;
}
