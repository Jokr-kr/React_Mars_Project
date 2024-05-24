import { useState } from 'react';
import axios from 'axios';

const useFetchData = (initialFrom, initialTo) =>
{
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    return { chartData, loading, error, fetchData };
};

export default useFetchData;