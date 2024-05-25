import { useState, useCallback } from 'react';
import axios from 'axios';

const useFetchData = () =>
{
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (from, to, selectedParameters) =>
    {
        setLoading(true);
        setError(null);

        try
        {
            const datasets = [];
            const allLabels = new Set();

            for (const param of selectedParameters)
            {
                const response = await axios.get('http://localhost:3000/Data', {
                    params: {
                        parameter: param,
                        from: from,
                        to: to,
                    },
                });

                const data = response.data;
                if (data && Array.isArray(data) && data.length > 0)
                {
                    const labels = data.map((item) => new Date(item.datetime).toISOString()); // Ensure proper date format
                    const values = data.map((item) => item[param]);
                    labels.forEach(label => allLabels.add(label));

                    datasets.push({
                        label: `${param.toUpperCase()} Levels`,
                        data: values,
                        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
                        borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
                        borderWidth: 1,
                    });
                }
            }

            setChartData({
                labels: Array.from(allLabels).sort(),
                datasets
            });
        } catch (error)
        {
            setError('Error fetching data');
        } finally
        {
            setLoading(false);
        }
    }, []);

    return { chartData, loading, error, fetchData };
};

export default useFetchData;