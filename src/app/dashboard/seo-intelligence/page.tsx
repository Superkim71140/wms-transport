import { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "WMS Operations Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SeoDashboardPage() {
  return <DashboardClient />;
}
