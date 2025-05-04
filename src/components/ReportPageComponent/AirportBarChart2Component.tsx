import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface ChartData {
  airline: string;
  score: number;
}

const AirlineHorizontalBarChart: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const mockData: ChartData[] = [
        { airline: 'Air India', score: 18 },
        { airline: 'Vistara', score: 14 },
      { airline: 'Indigo', score: 12 },
      { airline: 'Emirates', score: 7 },
      { airline: 'American', score: 2 },
    ];
    setData(mockData);
  }, []);

  const chartOptions = {
    chart: {
      type: 'bar',
      width: 350,
    },
    title: {
      text: 'Flight Count',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    xAxis: {
      categories: data.map((item) => item.airline),
      title: {
        text: null,
      },
      labels: {
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
        },
      },
    },
    yAxis: {
      min: 0,
      max: 25,
      title: {
        text: null,
      },
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
          },
        },
      },
    },
    series: [
      {
        name: 'Score',
        data: data.map((item) => item.score),
        colorByPoint: true,
        colors: ['#432143', '#5A2A5E', '#6E3A72', '#8A4A8E', '#A65BAA'],
      },
    ],
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
  };

  return (
    <div className="p-2 bg-white shadow-md rounded-lg">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default AirlineHorizontalBarChart;