export default class RateLimiter
{
    constructor(rateLimit)
    {
        this.rateLimit = rateLimit;
        this.lastRequestTime = Date.now();
    }

    delay(time)
    {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    async add(requestFunc)
    {
        const now = Date.now();
        const timeSinceLastRequest = now - this.lastRequestTime;
        if (timeSinceLastRequest < this.rateLimit)
        {
            await this.delay(this.rateLimit - timeSinceLastRequest);
        }
        this.lastRequestTime = Date.now();
        return requestFunc();
    }
}
