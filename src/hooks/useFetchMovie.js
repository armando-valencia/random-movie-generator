import { useState } from 'react';
import { API_BASE_URL, HULU_CURSORS } from '../util/constants';

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
    let randomCursorUrl;

    const fetchMovie = async (service) => {
        setLoading(true);

        // Pick a random cursor from the cursorArray
        const randomCursor = Math.floor(Math.random() * HULU_CURSORS.length);

        console.log('RANDOM CURSOR', randomCursor);

        // If the random cursor is 0, don't add a cursor to the URL. Otherwise, add cursor to the URL
        if (randomCursor <= 0) {
            randomCursorUrl = `${API_BASE_URL}&services=${service}`;
        } else {
            randomCursorUrl = `${API_BASE_URL}&services=${service}&cursor=${HULU_CURSORS[randomCursor]}`;
        }

        // console.log('RANDOM CURSOR URL', randomCursorUrl);

        try {
            // Fetch a list of movies from the API
            const response = await fetch(randomCursorUrl, options);
            const data = await response.json();

            console.log('DATA', data);

            // Pick a random movie from the list
            const randomMovieIndex = Math.floor(
                Math.random() * data.result.length
            );

            console.log('RANDOM MOVIE INDEX', randomMovieIndex);

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
