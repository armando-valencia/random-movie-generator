import { useRef, useState } from 'react';
import { API_PROXY_BASE_URL } from '../util/constants';
import type { Movie, StreamingService } from '../types/movie';

type FetchMovieResponse = {
    result?: Movie[];
};

const useFetchMovie = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [movie, setMovie] = useState<Movie | null>(null);
    const lastMovieIdRef = useRef<string | null>(null);

    const getRandomIndex = (max: number) => {
        if (max <= 1) return 0;
        if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
            const array = new Uint32Array(1);
            window.crypto.getRandomValues(array);
            return array[0] % max;
        }
        return Math.floor(Math.random() * max);
    };

    const pickRandomMovie = (items: Movie[]) => {
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

    const fetchMovie = async (service: StreamingService) => {
        setError(null);
        setLoading(true);
        const randomCursorUrl = `${API_PROXY_BASE_URL}?service=${service}`;

        try {
            // Fetch a list of movies from the API
            const response = await fetch(randomCursorUrl, {
                cache: 'no-store',
            });
            if (!response.ok) {
                throw new Error('Request failed.');
            }
            const data: FetchMovieResponse = await response.json();
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
            setError(err instanceof Error ? err : new Error('Unknown error.'));
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, movie, fetchMovie };
};

export default useFetchMovie;
