import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js';
import 'chartjs-adapter-date-fns'; // Ensure you have this adapter for date handling in Chart.js

function AirQualityChart()
{
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const chartRef = useRef(null);

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            try
            {
                const response = await axios.get('/Data?parameter=pm25&from=2021-01-01&to=2021-12-31');
                setData(response.data);
                setIsLoading(false);
            } catch (error)
            {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() =>
    {
        if (!isLoading && data.length > 0)
        {
            buildChart();
        }
    }, [data, isLoading]); // Dependency array includes data and isLoading to rebuild chart only when data or loading state changes

    const buildChart = () =>
    {
        const chartData = data.map(item => ({
            x: item.datetime,
            y: item.pm25
        }));

        const chart = new Chart(chartRef.current, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'PM2.5 Levels',
                    data: chartData,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        }
                    }
                }
            }
        });
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error.message}</p>;

    return (
        <div>
            <canvas ref={chartRef} />
        </div>
    );
}

export default AirQualityChart;