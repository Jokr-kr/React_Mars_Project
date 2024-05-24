
function lastHour(now)
{
    const last24Hours = new Date(now);
    last24Hours.setHours(last24Hours.getHours() - 24);
    const formattedLast24Hours = last24Hours.toISOString().slice(0, 19);
    return formattedLast24Hours;
}

function justNow()
{
    const now = new Date();
    const formattedNow = now.toISOString().slice(0, 19);
    return formattedNow;
}



export { lastHour, justNow }