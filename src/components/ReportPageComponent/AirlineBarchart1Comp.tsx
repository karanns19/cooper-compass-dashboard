import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import airlineData from '../../data/airlineData.json';
import airportData from '../../data/airportData.json';
import { useAuth } from '../../context/AuthContext';

interface ChartData {
  airline?: string;
  airport?: string;
  handled: number;
  missed: number;
}

const AirlineBarChart: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    setData(user?.role === 'Airport Staff' ? airlineData : airportData);
  }, [user?.role]);

  const chartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: user?.role === 'Airport Staff' ? 'Airline vs Baggage Count' : 'Airport vs Baggage Count',
    },
    xAxis: {
      categories: data.map((item) => user?.role === 'Airport Staff' ? item.airline : item.airport),
      title: {
        text: user?.role === 'Airport Staff' ? 'Airlines' : 'Airports',
      },
      labels: {
        style: {
          fontSize: '12px',
          fontWeight: 'bold'
        },
        rotation: 0
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Baggage Count',
      },
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#000',
          },
        },
      },
    },
    series: [
      {
        name: 'Handled',
        data: data.map((item) => item.handled),
        color: '#4CAF50',
      },
      {
        name: 'Missed',
        data: data.map((item) => item.missed),
        color: '#F44336',
      },
    ],
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

export default AirlineBarChart;