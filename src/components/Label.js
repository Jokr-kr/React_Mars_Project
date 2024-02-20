

export function CustomLabel({ value, height = '50px', width = '100px', fontSize = 'medium' })
{
    return (<label style={{ height, width, fontSize }}>{value}</label>)
}

export function NamedLabel({ value, className })
{
    return (<label className={className}>{value}</label>)
}

/* ways to use CustomLabel

<CustomLabel value="some text" />
height, width and fontsize has a default vaule, so they dont have to be included unless change is wanted

ways to use NamedLabel

<NamedLabel value="some text" className="the wanted css class" />

*/

