import type { Metadata } from "next";
import site from "../../lib.json";
import { AdminDashboard } from "../../components/admin-dashboard";

export const metadata: Metadata = {
  title: `${site.admin.title} | ${site.brand.name}`,
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <main className="admin-page"><div className="admin-wrap"><AdminDashboard copy={site.admin} /></div></main>;
}
