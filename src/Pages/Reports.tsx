import ReportPageCardComponent from "../components/ReportPageComponent/cards";
import AirlineBarChart from "../components/ReportPageComponent/AirlineBarchart1Comp";
import AirlineHorizontalBarChart from "../components/ReportPageComponent/AirportBarChart2Component"
import ReportDataTable from "../components/ReportPageComponent/AirportTableComp";
import CheckinPeriodLineChart from "../components/ReportPageComponent/CheckinPeriodLineChart";
import BaggageEfficiencyDonutChart from "../components/ReportPageComponent/BaggageEfficiencyDonutChart";
import ReportsIcon from '../assets/icons/Reports.png'

export default function Reports() {
  return (
    <div className="mt-[20px] p-6 h-full">
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-white rounded-xl p-4 shadow flex items-center justify-center">
          <img src={ReportsIcon} alt="Reports" className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#23223a]">Reports</h1>
          <p className="text-gray-500 text-lg">Get detailed report status</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="bg-[#432143] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold shadow hover:bg-[#321032]">
            Export <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
          </button>
        </div>
      </div>

      <ReportPageCardComponent />

      <div className="flex flex-row gap-4 mt-4">
        <div className="w-2/3">
        <AirlineBarChart />
        </div>
        <div className="w-1/3">
          <AirlineHorizontalBarChart />
        </div>
      </div>

      {/* New row for two more graphs */}
      <div className="flex flex-row gap-6 mt-4 items-stretch">
        <div className="w-1/2 flex">
          <div className="flex-1 bg-white rounded-2xl shadow p-8 flex flex-col justify-between">
            <CheckinPeriodLineChart />
          </div>
        </div>
        <div className="w-1/2 flex">
          <div className="flex-1 bg-white rounded-2xl shadow p-8 flex flex-col justify-between">
            <BaggageEfficiencyDonutChart />
          </div>
        </div>
      </div>

      <ReportDataTable />
      
    </div>
  );
}