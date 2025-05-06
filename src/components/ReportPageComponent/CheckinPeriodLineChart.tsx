import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CheckinPeriodLineChart: React.FC = () => {
  const chartOptions = {
    chart: {
      type: 'area',
      height: 300,
      style: { fontFamily: 'inherit' },
    },
    title: {
      text: 'Check-in Period',
      align: 'left',
      style: { fontWeight: 'bold', fontSize: '22px', color: '#23223a' },
    },
    xAxis: {
      categories: ['8:00', '10:00', '12:00', '14:00', '16:00'],
      title: { text: 'Time' },
      labels: { style: { fontSize: '15px', color: '#23223a' } },
    },
    yAxis: {
      title: { text: null },
      labels: { format: '{value}%', style: { fontSize: '15px', color: '#23223a' } },
      max: 100,
    },
    tooltip: { valueSuffix: '%' },
    plotOptions: {
      area: {
        marker: {
          enabled: true,
          radius: 6,
          lineWidth: 3,
          lineColor: null,
          fillColor: null,
        },
        fillColor: {
          linearGradient: [0, 0, 0, 300],
          stops: [
            [0, 'rgba(67,33,67,0.15)'],
            [1, 'rgba(67,33,67,0.01)']
          ]
        },
        lineColor: '#e879f9',
        color: '#e879f9',
      },
      series: {
        marker: {
          symbol: 'circle',
          lineWidth: 2,
        },
      },
    },
    series: [
      {
        name: 'Check-in %',
        data: [80, 40, 20, 60, 10],
        color: '#e879f9',
        marker: {
          fillColor: '#fff',
          lineColor: '#e879f9',
          lineWidth: 3,
        },
      },
    ],
    credits: { enabled: false },
    legend: { enabled: false },
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default CheckinPeriodLineChart; 