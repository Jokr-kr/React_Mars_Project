function RateLimiter(rateLimit)
{
    let lastRequestTime = Date.now();

    function delay(time)
    {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    async function add(requestFunc)
    {
        const now = Date.now();
        const timeSinceLastRequest = now - lastRequestTime;
        if (timeSinceLastRequest < rateLimit)
        {
            await delay(rateLimit - timeSinceLastRequest);
        }
        lastRequestTime = Date.now();
        return requestFunc();
    }

    return { add };
}

export default RateLimiter;
