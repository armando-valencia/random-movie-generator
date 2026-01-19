import { useRef, useState } from 'react';
import { API_PROXY_BASE_URL } from '../util/constants';
const useFetchMovie = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [movie, setMovie] = useState(null);
    const lastMovieIdRef = useRef(null);

    const getRandomIndex = (max) => {
        if (max <= 1) return 0;
        if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
            const array = new Uint32Array(1);
            window.crypto.getRandomValues(array);
            return array[0] % max;
        }
        return Math.floor(Math.random() * max);
    };

    const pickRandomMovie = (items) => {
        if (!items.length) return null;
        if (items.length === 1) return items[0];
        let index = getRandomIndex(items.length);
        let candidate = items[index];
        if (candidate?.imdbId === lastMovieIdRef.current) {
            index = (index + 1) % items.length;
            candidate = items[index];
        }
        return candidate;
    };

    const fetchMovie = async (service) => {
        setError(null);
        setLoading(true);
        const randomCursorUrl = `${API_PROXY_BASE_URL}?service=${service}`;

        try {
            // Fetch a list of movies from the API
            const response = await fetch(randomCursorUrl, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error('Request failed.');
            }
            const data = await response.json();
            if (!Array.isArray(data?.result) || data.result.length === 0) {
                throw new Error('No results.');
            }

            // Pick a random movie from the list
            const selected = pickRandomMovie(data.result);
            if (!selected) {
                throw new Error('No results.');
            }
            lastMovieIdRef.current = selected.imdbId || selected.tmdbId || null;
            setMovie(selected);
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
