import OverviewSection from "@/app/components/Overview";
import ChartsSection from "@/app/components/Charts";
import OrdersSection from "@/app/components/OrdersTable";
import GeoChartSection from "@/app/components/Statistics";
export const metadata = {
  title: "Dashboard - Auto Car Dealers",
  description: "Manage your car deals and settings from the admin dashboard.",
};

export default function Dashboard() {
  return (
    <main className="my-5">
      <OverviewSection />
      <OrdersSection />
      <ChartsSection />
      <GeoChartSection />
    </main>
  );
}
