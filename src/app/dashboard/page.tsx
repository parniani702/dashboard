import StatisticCard8 from "@/components/statistic-card-8";
import { Card } from "@/components/ui/card";

const DashboardPage = () => {
  return (
    <div>
      <StatisticCard8 />

      {/* Middle large cards */}
      <div className="flex flex-col xl:flex-row gap-3">
        <Card className="w-full xl:w-1/3 h-64 border-slate-700" />
      </div>

      {/* Bottom 4 larger cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {[...Array(4)].map((_, idx) => (
          <Card key={idx} className="h-64 border-slate-700" />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
