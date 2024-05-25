import React, { useState, useEffect, useCallback } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import DateInputs from './DateInputs.js';
import Loading from '../Utility/Loading.js';
import ErrorMessage from '../Utility/ErrorMessage.js';
import useFetchData from '../../hooks/useFetchData.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const parameters = ['pm25', 'pm10', 'no2'];

const MyChart = () =>
{
    const now = new Date();
    now.setMinutes(0, 0, 0);
    const last24Hours = new Date(now);
    last24Hours.setHours(last24Hours.getHours() - 24);

    const [inputFromDateTime, setInputFromDateTime] = useState(last24Hours.toISOString().slice(0, -8));
    const [inputToDateTime, setInputToDateTime] = useState(now.toISOString().slice(0, -8));
    const [fromDateTime, setFromDateTime] = useState(last24Hours.toISOString().slice(0, -8));
    const [toDateTime, setToDateTime] = useState(now.toISOString().slice(0, -8));
    const [selectedParameters, setSelectedParameters] = useState(parameters);

    const { chartData, loading, error, fetchData: originalFetchData } = useFetchData();

    const fetchData = useCallback(() =>
    {
        originalFetchData(fromDateTime, toDateTime, selectedParameters);
    }, [fromDateTime, toDateTime, selectedParameters, originalFetchData]);

    const handleRenderChart = () =>
    {
        setFromDateTime(inputFromDateTime);
        setToDateTime(inputToDateTime);
        fetchData();
    };

    const handleParameterChange = (param) =>
    {
        setSelectedParameters(prevParams =>
            prevParams.includes(param)
                ? prevParams.filter(p => p !== param)
                : [...prevParams, param]
        );
    };

    useEffect(() =>
    {
        fetchData();
    }, [fetchData]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    tooltipFormat: 'MM/dd/yyyy',
                    displayFormats: {
                        day: 'MM/dd/yyyy',
                    },
                },
                ticks: {
                    maxTicksLimit: 10
                }
            }
        }
    };

    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Air Quality Data</h2>
            <div>
                {parameters.map(param => (
                    <label key={param}>
                        <input
                            type="checkbox"
                            checked={selectedParameters.includes(param)}
                            onChange={() => handleParameterChange(param)}
                        />
                        {param.toUpperCase()}
                    </label>
                ))}
            </div>
            <DateInputs
                fromDateTime={inputFromDateTime}
                toDateTime={inputToDateTime}
                setFromDateTime={setInputFromDateTime}
                setToDateTime={setInputToDateTime}
                onRenderChart={handleRenderChart}
            />
            {loading ? (
                <Loading />
            ) : error ? (
                <ErrorMessage message={error} />
            ) : (
                <div style={{ width: '80vw', height: '500px' }}>
                    <Line data={chartData} options={options} />
                </div>
            )}
        </div>
    );
};

export default MyChart;