import { useState } from 'react';
import { HULU_CURSORS } from '../util/constants';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_API_HOST,
    },
};

// Generate an endpoint URL with a random cursor
const pickRandomCursor = (service) => {
    const [cursorArray, setCursorArray] = useState();

    // Set the cursorArray based on the service
    switch (service) {
        case 'hulu':
            setCursorArray(HULU_CURSORS);
        case 'netflix':
            setCursorArray(HULU_CURSORS);
        case 'hbo':
            setCursorArray(HULU_CURSORS);
    }

    // Pick a random cursor from the cursorArray
    const randomCursor = Math.floor(Math.random() * cursorArray.length - 1);

    // If the random cursor is 0, return the API URL without a cursor
    if (randomCursor === 0) {
        return `${API_BASE_URL}&services=${service}`;
    }

    // Otherwise, return the API URL with a random cursor
    return `${API_BASE_URL}&services=${service}&cursor=${cursorArray[randomCursor]}`;
};

const useFetchMovie = async (service) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [movie, setMovie] = useState(null);

    try {
        setLoading(true);

        // Fetch a list of movies from the API
        const response = await fetch(pickRandomCursor(service), options);
        const data = await response.json();

        console.log(data);

        // Pick a random movie from the list
        let randomMovie = data[Math.floor(Math.random() * data.length - 1)];

        // Set movie title and description to state
        setMovie({
            title: randomMovie.title,
            description: randomMovie.overview,
        });
    } catch (err) {
        setError(err);
    } finally {
        setLoading(false);
    }

    return { loading, error, movie };
};

export default useFetchMovie;
