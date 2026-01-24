import { useEffect, useMemo, useState } from 'react';

type GenreOption = {
    id: string;
    name: string;
};

type GenresPayload = {
    genres?: GenreOption[];
};

type SelectGenreProps = {
    selectedGenreId: string | null;
    onChange: (genreId: string | null) => void;
};

const SelectGenre = ({ selectedGenreId, onChange }: SelectGenreProps) => {
    const showGenres = true;
    const [genres, setGenres] = useState<GenreOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        setError(null);

        fetch('/data/genres.json', { cache: 'no-store' })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error('Request failed.');
                }
                const data: GenresPayload | GenreOption[] =
                    await response.json();
                const list = Array.isArray(data) ? data : data.genres;
                if (!Array.isArray(list)) {
                    throw new Error('Invalid response.');
                }
                if (isMounted) {
                    const sorted = [...list].sort((a, b) =>
                        a.name.localeCompare(b.name)
                    );
                    setGenres(sorted);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setError('Unable to load genres right now.');
                }
            })
            .finally(() => {
                if (isMounted) {
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const selectedGenre = useMemo(
        () => genres.find((genre) => genre.id === selectedGenreId) || null,
        [genres, selectedGenreId]
    );

    const handleClear = () => {
        onChange(null);
    };

    return (
        <div className="flex flex-wrap items-center gap-3">
            <label className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[color:var(--muted)]">
                Genre (optional)
                <select
                    value={selectedGenreId || ''}
                    onChange={(event) => {
                        const value = event.target.value;
                        if (!value) {
                            onChange(null);
                            return;
                        }
                        onChange(value);
                    }}
                    disabled={isLoading}
                    className="mt-2 min-w-[180px] rounded-full border border-[color:var(--border)] bg-[color:var(--surface-muted)] px-4 py-2 text-xs text-[color:var(--text)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
                >
                    <option value="">
                        {isLoading ? 'Loading genres...' : 'Any genre'}
                    </option>
                    {genres.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </label>
            {selectedGenreId ? (
                <button
                    type="button"
                    onClick={handleClear}
                    className="rounded-full border border-[color:var(--border)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[color:var(--muted)] transition duration-200 hover:-translate-y-0.5 hover:text-[color:var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
                >
                    Clear
                </button>
            ) : null}
            {error ? <p className="text-xs text-red-400">{error}</p> : null}
        </div>
    );
};

export default SelectGenre;
