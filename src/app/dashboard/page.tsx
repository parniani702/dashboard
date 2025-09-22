import { Card } from "@/components/ui/card";

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Top 4 small cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {[...Array(4)].map((_, idx) => (
          <Card key={idx} className="h-32 border-slate-700" />
        ))}
      </div>

      {/* Middle large cards */}
      <div className="flex flex-col xl:flex-row gap-3">
        <Card className="w-full xl:w-2/3 h-64 border-slate-700" />
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
