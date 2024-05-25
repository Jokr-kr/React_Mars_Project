import React from 'react';
import './Chart.css';

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

    const renderTimeOptions = () =>     //all data is stored in full hours.
    {                                   //since minutes are redundant i added this    
        const options = [];
        for (let i = 0; i < 24; i++)
        {
            const hour = i.toString().padStart(2, '0');
            options.push(<option key={i} value={`${hour}:00`}>{`${hour}:00`}</option>);
        }
        return options;
    };

    return (
        <div className="date-inputs-container">
            <label className="date-input-label">
                From:
                <input                                                      //as a remind in aer toDateTime is formatted as YYYY-MM-DDTHH:MM
                    type="date"                                             //fromDateTime.split('T') takes the above datetime and splits it to an array
                    value={fromDateTime.split('T')[0]}                      // [0] is YYYY-MM-DD
                    onChange={handleDateChange(setFromDateTime, 'date')}
                    className="date-input"
                />
                <select
                    value={fromDateTime.split('T')[1]}                      //[1] is HH:MM
                    onChange={handleDateChange(setFromDateTime, 'time')}
                    className="date-input"
                >
                    {renderTimeOptions()}
                </select>
            </label>
            <label className="date-input-label">
                To:
                <input
                    type="date"
                    value={toDateTime.split('T')[0]}                        // as above [0] refeer to YYYY-MM-DD from YYYY-MM-DDTHH:MM
                    onChange={handleDateChange(setToDateTime, 'date')}
                    className="date-input"
                />
                <select
                    value={toDateTime.split('T')[1]}                        //as abover [1] refeer to HH:MM from YYYY-MM-DDTHH:MM
                    onChange={handleDateChange(setToDateTime, 'time')}
                    className="date-input"
                >
                    {renderTimeOptions()}
                </select>
            </label>
            <button onClick={onRenderChart} className="render-button">Render Chart</button>
        </div>
    );
};

export default DateInputs;