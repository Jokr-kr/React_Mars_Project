import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import DateInputs from './DateInputs.js';
import Loading from '../utility/Loading.js';
import ErrorMessage from '../utility/ErrorMessage.js';
import AirQualityChart from './AirQualityChart.js';
import useFetchData from '../../hooks/useFetchData.js';
import { lastHour, justNow } from '../utility/timeSetting.js';

// Register the components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MyChart = () =>
{
    const now = justNow();
    const last24Hours = lastHour(now);

    const [inputFromDateTime, setInputFromDateTime] = useState(last24Hours);
    const [inputToDateTime, setInputToDateTime] = useState(now);
    const [fromDateTime, setFromDateTime] = useState(last24Hours);
    const [toDateTime, setToDateTime] = useState(now);

    const { chartData, loading, error, fetchData } = useFetchData(fromDateTime, toDateTime);

    const handleRenderChart = () =>
    {
        setFromDateTime(inputFromDateTime);
        setToDateTime(inputToDateTime);
        fetchData(inputFromDateTime, inputToDateTime);
    };

    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Air Quality Data</h2>
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
                <AirQualityChart chartData={chartData} />
            )}
        </div>
    );
};

export default MyChart;