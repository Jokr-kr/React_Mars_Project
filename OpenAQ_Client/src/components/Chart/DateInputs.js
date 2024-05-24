import React from 'react';

const DateInputs = ({ fromDateTime, toDateTime, setFromDateTime, setToDateTime, onRenderChart }) => (
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
        <button onClick={onRenderChart}>Render Chart</button>
    </div>
);

export default DateInputs;