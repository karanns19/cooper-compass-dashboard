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
    if (user?.userType === 'airport') {
      const transformedData = airlineData.airlines.map(airline => ({
        airline: airline.name,
        handled: Math.floor(Math.random() * 1000) + 500,
        missed: Math.floor(Math.random() * 50) + 1
      }));
      setData(transformedData);
    } else {
      const transformedData = airportData.airports.map(airport => ({
        airport: airport.name,
        handled: Math.floor(Math.random() * 2000) + 1000,
        missed: Math.floor(Math.random() * 100) + 1
      }));
      setData(transformedData);
    }
  }, [user?.userType]);

  const chartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: user?.userType === 'airport' ? 'Airline vs Baggage Count' : 'Airport vs Baggage Count',
    },
    xAxis: {
      categories: data.map((item) => user?.userType === 'airport' ? item.airline : item.airport),
      title: {
        text: user?.userType === 'airport' ? 'Airlines' : 'Airports',
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