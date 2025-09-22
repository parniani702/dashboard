import { Card } from "@/components/ui/card";
import DashboardSideBar from "./_components/dashboard-sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto">
      <div className="flex h-[70vh]">
        <Card className="hidden card border-[1px]  shadow-xl p-4 xl:block w-1/5">
          <DashboardSideBar />
        </Card>
        <div className="w-full mx-auto md:w-4/5 xl:mr-6">
          {children}
          </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
