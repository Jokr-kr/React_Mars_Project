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

    const renderTimeOptions = () =>  //all data is stored in full hours.
    {                                //since minutes are redundant i added this                              
        const options = [];
        for (let i = 0; i < 24; i++)
        {
            const hour = i.toString().padStart(2, '0');
            options.push(<option key={i} value={`${hour}:00`}>{`${hour}:00`}</option>);
        }
        return options;
    };

    const inputStyle = {    //simple attempt to make the date and the hour inputs to be the same size
        height: '20px',
        fontSize: '14px',
    };

    return (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
                From:
                <input                                                   //                                                        v
                    type="date"                                          //as a remind in aer toDateTime is formatted as YYYY-MM-DDTHH:MM
                    value={fromDateTime.split('T')[0]}                   //fromDateTime.split('T') takes the above datetime and splits it to an array
                    onChange={handleDateChange(setFromDateTime, 'date')} // [0] is YYYY-MM-DD
                    style={inputStyle}
                />
                <select
                    value={fromDateTime.split('T')[1]}
                    onChange={handleDateChange(setFromDateTime, 'time')} //[1] is HH:MM
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
                    onChange={handleDateChange(setToDateTime, 'date')} //same as above [0] refeer to YYYY-MM-DD from YYYY-MM-DDTHH:MM
                    style={inputStyle}
                />
                <select
                    value={toDateTime.split('T')[1]}
                    onChange={handleDateChange(setToDateTime, 'time')} //as abover [1] refeer to HH:MM from YYYY-MM-DDTHH:MM
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