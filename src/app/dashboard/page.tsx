import CircelChart from "./_components/CircelChart";
import InfoCards from "./_components/InfoCard";
import LineChart from "./_components/LineChart";
import TableList from "./_components/TableList";


const DashboardPage = () => {
  return (
    <div className="space-y-3">
      {/* information Cards */}
      <InfoCards />
      {/* charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
        <LineChart />
        <CircelChart />
      </div>
      {/* table lists */}
      <div className="">
        <TableList />
      </div>
    </div>
  );
};

export default DashboardPage;
