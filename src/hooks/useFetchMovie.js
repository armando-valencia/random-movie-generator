import { useState } from 'react';

export default function useFetchMovie(url, isFetching, setIsFetching) {
    const [data, setData] = useState(null);
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
            'X-RapidAPI-Host': import.meta.env.VITE_API_HOST,
        },
    };

    if (url && isFetching) {
        fetch(url, options)
            .then(response => response.json())
            .then(response => {
                setData([response]);
            })
            .catch(err => console.error(err));

        setIsFetching(false);
    }

    console.log('DATA', data);
    return data;
}
