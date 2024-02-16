import React, { useState, useEffect } from 'react';

export default function Showimage({ imagepath, Alt })
{
    const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
    const [imgSrc, setImgSrc] = useState(defaultImage);

    useEffect(() =>
    {
        if (imagepath)
        {
            setImgSrc(imagepath);
        }
    }, [imagepath]);

    const handleError = () =>
    {
        setImgSrc(defaultImage);
    };

    return <img src={imgSrc} alt={Alt || 'Image'} onError={handleError} />;
}


/*
how to use this component:
<Showimage imagepath = "path/to/your/image.jpg" 
Alt = "A description of the image"/>

or

<Showimage imagepath = "path/to/your/image.jpg"/>

Alt is not strictly necessary.
*/