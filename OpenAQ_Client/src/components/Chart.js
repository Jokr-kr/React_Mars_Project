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
import { lastHour, justNow } from './utility/timeSetting';

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
    const now = justNow();
    const last24Hours = lastHour(now);

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fromDateTime, setFromDateTime] = useState(last24Hours);
    const [toDateTime, setToDateTime] = useState(now);

    const fetchData = async (from, to) =>
    {
        setLoading(true);
        setError(null);
        try
        {
            const response = await axios.get('http://localhost:3000/Data', {
                params: {
                    parameter: 'pm25',
                    from: from,
                    to: to,
                },
            });

            const data = response.data;

            if (data && Array.isArray(data) && data.length > 0)
            {
                const labels = data.map((item) => item.datetime);
                const values = data.map((item) => item.pm25);

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
                setError('No data received or data is not in the expected format');
            }
        } catch (error)
        {
            setError('Error fetching data');
        } finally
        {
            setLoading(false);
        }
    };

    useEffect(() =>
    {
        fetchData(last24Hours, now);
    }, [last24Hours, now]);

    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Air Quality Data</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <label>
                    From:
                    <input
                        type="datetime-local"
                        value={fromDateTime}
                        onChange={(e) => setFromDateTime(e.target.value)}
                    />
                </label>
                <label>
                    To:
                    <input
                        type="datetime-local"
                        value={toDateTime}
                        onChange={(e) => setToDateTime(e.target.value)}
                    />
                </label>
                <button onClick={() => fetchData(fromDateTime, toDateTime)}>Render Chart</button>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <div style={{ width: '80vw', height: '500px' }}>
                    <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
            )}
        </div>
    );
};

export default MyChart;