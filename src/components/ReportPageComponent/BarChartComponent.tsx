import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BarChartComponent: React.FC = () => {
    const chartOptions = {
        chart: {
            type: 'bar',
        },
        title: {
            text: 'Bar Chart Example',
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges'],
            title: {
                text: null,
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Fruit Eaten',
                align: 'high',
            },
            labels: {
                overflow: 'justify',
            },
        },
        tooltip: {
            valueSuffix: ' units',
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                },
            },
        },
        series: [
            {
                name: 'John',
                data: [5, 3, 4],
            },
            {
                name: 'Jane',
                data: [2, 2, 3],
            },
            {
                name: 'Joe',
                data: [3, 4, 4],
            },
        ],
    };

    return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default BarChartComponent;