import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Chart.css';

const DateInputs = ({ fromDateTime, toDateTime, setFromDateTime, setToDateTime, onRenderChart }) =>
{
    return (
        <div className="date-inputs-container">
            <label className="date-input-label">
                From:
                <DatePicker
                    selected={new Date(fromDateTime)}
                    onChange={(date) => setFromDateTime(date.toISOString())}
                    showTimeSelect
                    dateFormat="Pp"
                    className="date-input"
                />
            </label>
            <label className="date-input-label">
                To:
                <DatePicker
                    selected={new Date(toDateTime)}
                    onChange={(date) => setToDateTime(date.toISOString())}
                    showTimeSelect
                    dateFormat="Pp"
                    className="date-input"
                />
            </label>
            <button onClick={onRenderChart} className="render-button">Render Chart</button>
        </div>
    );
};

export default DateInputs;