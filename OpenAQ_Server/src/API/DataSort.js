import add2DB from './DataInsert.js'
export default function processData(data, res)
{
    const parameters = data.results[0].parameters;
    var DateTime = data.results[0].lastUpdated;
    var location_id = data.results[0].id;
    var pm10 = parameters[0].lastValue ? parameters[0].lastValue : null;
    var no2 = parameters[1].lastValue ? parameters[1].lastValue : null;
    var pm25 = parameters[2].lastValue ? parameters[2].lastValue : null;

    add2DB(DateTime, location_id, pm10, pm25, no2, res)
}

/*   
    console.log("datetime = " + DateTime)
    console.log("location_id = " + location_id)
    console.log("pm10 = " + pm10 + " µg/m³")
    console.log("No2 = " + no2 + " µg/m³")
    console.log("pm25 = " + pm25 + " µg/m³")
*/