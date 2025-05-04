import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import chartData from '../../data/plot1Data.json';

interface ChartData {
  airline: string;
  handled: number;
  missed: number;
}

const AirlineBarChart: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    setData(chartData);
  }, []);

  const chartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Airline vs Baggage Count',
    },
    xAxis: {
      categories: data.map((item) => item.airline),
      title: {
        text: 'Airlines',
      },
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