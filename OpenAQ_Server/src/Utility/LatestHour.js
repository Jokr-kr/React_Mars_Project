
export default function LatestHour()
{
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    //padding 0 in front in case of single digits since format need double digits
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');

    const formattedDateTime = `${year}-${month}-${day} ${hours}:00:00`;
    return formattedDateTime;
}