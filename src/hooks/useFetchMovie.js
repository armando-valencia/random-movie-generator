import { useState } from 'react';
import { API_PROXY_BASE_URL } from '../util/constants';
const useFetchMovie = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [movie, setMovie] = useState(null);

    const fetchMovie = async (service) => {
        setError(null);
        setLoading(true);
        const randomCursorUrl = `${API_PROXY_BASE_URL}?service=${service}`;

        try {
            // Fetch a list of movies from the API
            const response = await fetch(randomCursorUrl);
            if (!response.ok) {
                throw new Error('Request failed.');
            }
            const data = await response.json();
            if (!Array.isArray(data?.result) || data.result.length === 0) {
                throw new Error('No results.');
            }

            // Pick a random movie from the list
            // prettier-ignore
            const randomMovieIndex = Math.floor(Math.random() * data.result.length);

            // Set random movie to state
            setMovie(data.result[randomMovieIndex]);
        } catch (err) {
            setMovie(null);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, movie, fetchMovie };
};

export default useFetchMovie;
