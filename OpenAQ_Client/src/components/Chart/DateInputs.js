import React from 'react';

const DateInputs = ({ fromDateTime, toDateTime, setFromDateTime, setToDateTime, onRenderChart }) =>
{
    const handleDateChange = (setter, type) => (e) =>
    {
        const value = e.target.value;
        setter((prev) =>
        {
            let [datePart, timePart] = prev.split('T');
            if (type === 'date')
            {
                datePart = value;
            } else if (type === 'time')
            {
                timePart = value;
            }
            const newDateTime = `${datePart}T${timePart}`;
            return newDateTime;
        });
    };

    const renderTimeOptions = () =>
    {
        const options = [];
        for (let i = 0; i < 24; i++)
        {
            const hour = i.toString().padStart(2, '0');
            options.push(<option key={i} value={`${hour}:00`}>{`${hour}:00`}</option>);
        }
        return options;
    };

    const inputStyle = {
        height: '20px',
        fontSize: '14px',
    };

    return (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
                From:
                <input
                    type="date"
                    value={fromDateTime.split('T')[0]}
                    onChange={handleDateChange(setFromDateTime, 'date')}
                    style={inputStyle}
                />
                <select
                    value={fromDateTime.split('T')[1]}
                    onChange={handleDateChange(setFromDateTime, 'time')}
                    style={inputStyle}
                >
                    {renderTimeOptions()}
                </select>
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
                To:
                <input
                    type="date"
                    value={toDateTime.split('T')[0]}
                    onChange={handleDateChange(setToDateTime, 'date')}
                    style={inputStyle}
                />
                <select
                    value={toDateTime.split('T')[1]}
                    onChange={handleDateChange(setToDateTime, 'time')}
                    style={inputStyle}
                >
                    {renderTimeOptions()}
                </select>
            </label>
            <button onClick={onRenderChart} style={inputStyle}>Render Chart</button>
        </div>
    );
};

export default DateInputs;