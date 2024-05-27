import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import DateInputs from './DateInputs.js';
import Loading from '../Utility/Loading.js';
import ErrorMessage from '../Utility/ErrorMessage.js';
import useFetchData from '../../hooks/useFetchData.js';
import './Chart.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const parameters = [
    process.env.REACT_APP_PARAMETER_1,
    process.env.REACT_APP_PARAMETER_2,
    process.env.REACT_APP_PARAMETER_3,
    process.env.REACT_APP_PARAMETER_4,
    process.env.REACT_APP_PARAMETER_5
].filter(param => param);

const MyChart = () =>
{
    const now = new Date();
    now.setMinutes(0, 0, 0);
    const last24Hours = new Date(now);
    last24Hours.setHours(last24Hours.getHours() - 24);

    const [inputFromDateTime, setInputFromDateTime] = useState(last24Hours.toISOString().slice(0, -8));
    const [inputToDateTime, setInputToDateTime] = useState(now.toISOString().slice(0, -8));
    const [selectedParameters, setSelectedParameters] = useState(parameters);

    const { chartData, loading, error, fetchData: originalFetchData } = useFetchData();

    const fetchData = useCallback(() =>
    {
        originalFetchData(inputFromDateTime, inputToDateTime, selectedParameters);
    }, [inputFromDateTime, inputToDateTime, selectedParameters, originalFetchData]);

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

    useEffect(() =>
    {
        console.log('Chart Data:', chartData);
    }, [chartData]);

    const options = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                    tooltipFormat: 'MM/dd/yyyy HH:mm',
                    displayFormats: {
                        day: 'MM/dd/yyyy',
                        hour: 'HH:mm',
                    },
                },
                ticks: {
                    maxTicksLimit: 10,
                    autoSkip: true,
                },
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Values',
                },
            },
        },
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
    }), []);

    return (
        <div className="chart-container">
            <h2>Air Quality Data</h2>
            <div className="parameter-selector">
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
                onRenderChart={fetchData}
            />
            {loading ? (
                <Loading />
            ) : error ? (
                <ErrorMessage message={error} />
            ) : (
                <div className="chart-wrapper">
                    <Line data={chartData} options={options} />
                </div>
            )}
        </div>
    );
};

export default MyChart;