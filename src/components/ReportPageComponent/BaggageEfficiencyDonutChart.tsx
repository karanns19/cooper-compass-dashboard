import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BaggageEfficiencyDonutChart: React.FC = () => {
  const chartOptions = {
    chart: {
      type: 'pie',
      height: 300,
      style: { fontFamily: 'inherit' },
    },
    title: {
      text: 'Baggage Handling Efficiency',
      align: 'left',
      style: { fontWeight: 'bold', fontSize: '22px', color: '#23223a' },
    },
    plotOptions: {
      pie: {
        innerSize: '75%',
        dataLabels: {
          enabled: false,
        },
        borderWidth: 0,
      },
      series: {
        states: {
          hover: {
            enabled: false,
          },
        },
      },
    },
    series: [
      {
        name: 'Efficiency',
        data: [
          { name: 'Baggage Transfers', y: 80, color: '#60a5fa' },
          { name: 'Delayed Baggage', y: 10, color: '#fca5a5' },
          { name: 'Average Time', y: 10, color: '#fde68a' },
        ],
        type: 'pie',
        showInLegend: false,
      },
    ],
    credits: { enabled: false },
    legend: { enabled: false },
    tooltip: { enabled: false },
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="relative flex items-center justify-center">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        <div className="absolute text-4xl font-bold text-[#23223a]" style={{ left: '50%', top: '60%', transform: 'translate(-50%, -60%)' }}>80%</div>
      </div>
      <div className="flex flex-wrap gap-6 mt-4 items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#60a5fa] inline-block"></span>
            <span className="text-[#23223a] font-medium">Baggage Transfers</span>
          </div>
          <span className="text-xs text-[#60a5fa]">97% Baggage successfully transfered</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#fca5a5] inline-block"></span>
            <span className="text-[#23223a] font-medium">Delayed Baggage</span>
          </div>
          <span className="text-xs text-[#fca5a5]">3% of baggage missing or delay</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#fde68a] inline-block"></span>
            <span className="text-[#23223a] font-medium">Average Time</span>
          </div>
          <span className="text-xs text-[#fde68a]">12 min to transfer</span>
        </div>
      </div>
    </div>
  );
};

export default BaggageEfficiencyDonutChart; 