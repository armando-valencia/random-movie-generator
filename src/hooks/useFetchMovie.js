import { useEffect, useState } from 'react';

export default function useFetchMovie(url) {
    const [data, setData] = useState(null);
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
            'X-RapidAPI-Host': import.meta.env.VITE_API_HOST,
        },
    };

    useEffect(() => {
        if (url) {
            let ignore = false;
            fetch(url, options)
                .then(response => response.json())
                .then(json => {
                    if (!ignore) {
                        setData(json);
                    }
                });
            return () => {
                ignore = true;
            };
        }
    }, [url]);

    console.log(data);
    return data;
}
