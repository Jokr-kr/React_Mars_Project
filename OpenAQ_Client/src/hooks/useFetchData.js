import { useState, useCallback, useRef } from 'react';
import axios from 'axios';

const useFetchData = () =>
{
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const cache = useRef({});

    const fetchData = useCallback(async (from, to, selectedParameters) =>
    {
        const cacheKey = `${from}_${to}_${selectedParameters.join(',')}`;
        if (cache.current[cacheKey])
        {
            setChartData(cache.current[cacheKey]);
            return;
        }

        setLoading(true);
        setError(null);

        try
        {
            const datasets = [];
            const allLabels = new Set();

            for (const param of selectedParameters)
            {
                console.log(`Fetching data for parameter: ${param}`);
                const response = await axios.get('http://localhost:3000/Data', {
                    params: {
                        parameter: param,
                        from: from,
                        to: to,
                    },
                });

                const data = response.data;
                console.log(`API Response for ${param}: `, data); // Log API response

                if (data && Array.isArray(data) && data.length > 0)
                {
                    const labels = data.map((item) => new Date(item.datetime).toISOString());
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

            console.log("Fetched Data: ", datasets); // Add this log

            const newChartData = {
                labels: Array.from(allLabels).sort(),
                datasets
            };

            cache.current[cacheKey] = newChartData;
            setChartData(newChartData);
        } catch (error)
        {
            console.error('Error fetching data:', error); // Log error
            setError('Error fetching data');
        } finally
        {
            setLoading(false);
        }
    }, []);

    return { chartData, loading, error, fetchData };
};

export default useFetchData;