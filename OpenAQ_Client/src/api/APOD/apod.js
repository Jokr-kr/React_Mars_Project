import React, { useState, useEffect } from 'react';
import axios from 'axios';

    const FetchComponent = ({ url }) =>
    {
        const [data, setData] = useState(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        useEffect(() =>
        {
            setLoading(true);
            axios.get(url)
                .then(response =>
                {
                    setData(response.data);
                    setError(null); // Reset the error
                })
                .catch(error =>
                {
                    setError(error);
                })
                .finally(() =>
                {
                    setLoading(false);
                });
        }, [url]);

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;

        return (
            <div>
                {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            </div>
        );
    };

    export default FetchComponent;



/*

FetchComponent url="https://api.example.com/data" />

*/

