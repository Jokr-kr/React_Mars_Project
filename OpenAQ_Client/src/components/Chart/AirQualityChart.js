import React from 'react';
import { Line } from 'react-chartjs-2';

const AirQualityChart = ({ chartData }) => (
    <div style={{ width: '80vw', height: '500px' }}>
        <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
);

export default AirQualityChart;