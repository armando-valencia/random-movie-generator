import { useState } from 'react';
import { API_BASE_URL } from '../util/constants';
import {
    HBO_MAX_CURSORS,
    HULU_CURSORS,
    NETFLIX_CURSORS,
} from '../util/cursors';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_API_HOST,
    },
};

const useFetchMovie = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [movie, setMovie] = useState(null);

    const fetchMovie = async (service) => {
        let cursorArray;

        if (service === 'hulu') {
            cursorArray = HULU_CURSORS;
        } else if (service === 'netflix') {
            cursorArray = NETFLIX_CURSORS;
        } else if (service === 'hbo') {
            cursorArray = HBO_MAX_CURSORS;
        }

        setLoading(true);

        // Pick a random cursor from the cursorArray
        const randomCursor = Math.floor(Math.random() * cursorArray.length);

        const randomCursorUrl =
            randomCursor > 0
                ? `${API_BASE_URL}&services=${service}&cursor=${cursorArray[randomCursor]}`
                : `${API_BASE_URL}&services=${service}`;

        try {
            // Fetch a list of movies from the API
            const response = await fetch(randomCursorUrl, options);
            const data = await response.json();

            // Pick a random movie from the list
            // prettier-ignore
            const randomMovieIndex = Math.floor(Math.random() * data.result.length);

            // Set random movie to state
            setMovie(data.result[randomMovieIndex]);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, movie, fetchMovie };
};

export default useFetchMovie;
