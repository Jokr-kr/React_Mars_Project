export default function LatestHour()
{
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');

    const formattedDateTime = `${year}-${month}-${day} ${hours}:00:00`;
    return formattedDateTime;
}

// datetime format needed is 0000-00-00 00:00:00:00
// so i pad 0 to the start in case of single digits