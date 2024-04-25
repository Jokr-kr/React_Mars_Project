export default function test(res)
{
    const oneYear = new Date();
    oneYear.setFullYear(oneYear.getFullYear() - 1);
    const isoDateString = oneYear.toISOString();
    res.send(isoDateString)
}