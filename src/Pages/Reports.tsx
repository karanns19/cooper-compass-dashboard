import ReportPageCardComponent from "../components/ReportPageComponent/cards";
import AirlineBarChart from "../components/ReportPageComponent/AirlineBarchart1Comp";
import AirlineHorizontalBarChart from "../components/ReportPageComponent/AirportBarChart2Component"
import ReportDataTable from "../components/ReportPageComponent/AirportTableComp";


export default function History() {
  return (
    <div className="mt-[20px] p-6 h-full">
      <ReportPageCardComponent />

      <div className="flex flex-row gap-4 mt-4">
        <div className="w-2/3">
        <AirlineBarChart />
        </div>
        <div className="w-1/3">
          <AirlineHorizontalBarChart />
        </div>

      </div>
      <ReportDataTable />
      
    </div>
  );
}