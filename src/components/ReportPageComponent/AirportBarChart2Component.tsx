import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useAuth } from '../../context/AuthContext';

interface ChartData {
  name: string;
  score: number;
}

const airlineTestData: ChartData[] = [
  { name: 'Air India', score: 18 },
  { name: 'Vistara', score: 14 },
  { name: 'Indigo', score: 12 },
  { name: 'Emirates', score: 7 },
  { name: 'American', score: 2 },
];

const airportTestData: ChartData[] = [
  { name: 'Bengaluru', score: 20 },
  { name: 'Mumbai', score: 17 },
  { name: 'Delhi', score: 14 },
  { name: 'Hyderabad', score: 11 },
  { name: 'Kolkata', score: 8 },
];

const AirlineHorizontalBarChart: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    setData(user?.userType === 'airport' ? airlineTestData : airportTestData);
  }, [user?.userType]);

  const chartOptions = {
    chart: {
      type: 'bar',
      width: 350,
    },
    title: {
      text: user?.userType === 'airport' ? 'Flight Count (Airlines)' : 'Flight Count (Airports)',
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    xAxis: {
      categories: data.map((item) => item.name),
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