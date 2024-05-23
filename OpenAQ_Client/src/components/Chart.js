import React, { useEffect, useState } from 'react';
import
{
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

// Register the components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
const MyChart = () =>
{
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =>
    {
        const fetchData = async () =>
        {
            try
            {
                const response = await axios.get('http://localhost:3000/Data', {
                    params: {
                        parameter: 'pm25',
                        from: '2024-01-01',
                        to: '2024-01-30'
                    }
                });

                const data = response.data;
                // console.log('Data received:', data); // Log the data

                if (data && Array.isArray(data) && data.length > 0)
                {
                    const labels = data.map(item => item.datetime);
                    const values = data.map(item => item.pm25); // Adjust this to match the parameter

                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'PM2.5 Levels',
                                data: values,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            },
                        ],
                    });
                } else
                {
                    console.error('No data received or data is not in expected format');
                    setError('No data received or data is not in expected format');
                }
            } catch (error)
            {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            } finally
            {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Air Quality Data</h2>
            <Line data={chartData} />
        </div>
    );
};

export default MyChart;