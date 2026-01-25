import { useEffect, useRef, useState } from 'react';

const EVENTS = {
    mouseDown: 'mousedown',
} as const;

const KEYS = {
    escape: 'Escape',
    arrowDown: 'ArrowDown',
} as const;

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
    const [genres, setGenres] = useState<GenreOption[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

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

    useEffect(() => {
        const handleOutside = (event: MouseEvent) => {
            if (!wrapperRef.current) return;
            if (!wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener(EVENTS.mouseDown, handleOutside);
        return () => {
            document.removeEventListener(EVENTS.mouseDown, handleOutside);
        };
    }, []);

    const handleClear = () => {
        onChange(null);
    };

    const selectedLabel = (() => {
        if (selectedGenreId) {
            return (
                genres.find((genre) => genre.id === selectedGenreId)?.name ||
                'Selected genre'
            );
        }
        if (isLoading) {
            return 'Loading genres...';
        }
        return 'Any genre (optional)';
    })();

    return (
        <div className="flex flex-wrap items-center gap-4">
            <label
                htmlFor="genre-select"
                className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[color:var(--muted)]"
            >
                Genre
            </label>
            <div ref={wrapperRef} className="relative">
                <button
                    id="genre-select"
                    type="button"
                    onClick={() => setIsOpen((value) => !value)}
                    onKeyDown={(event) => {
                        if (event.key === KEYS.escape) {
                            setIsOpen(false);
                        }
                        if (event.key === KEYS.arrowDown) {
                            setIsOpen(true);
                        }
                    }}
                    disabled={isLoading}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    className="flex h-10 min-w-[210px] items-center justify-between gap-4 rounded-full border border-[color:var(--border)] bg-[color:var(--surface-muted)] px-4 text-xs text-[color:var(--text)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
                >
                    <span className="truncate">{selectedLabel}</span>
                    <span className="text-[color:var(--muted)]">
                        <svg
                            aria-hidden="true"
                            width="14"
                            height="14"
                            viewBox="0 0 20 20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M6 8l4 4 4-4" />
                        </svg>
                    </span>
                </button>
                {isOpen ? (
                    <div
                        role="listbox"
                        aria-label="Genre options"
                        className="absolute left-0 top-full z-20 mt-2 w-full min-w-[240px] rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-2 text-xs shadow-[0_20px_40px_rgba(15,23,42,0.18)]"
                    >
                        <button
                            type="button"
                            role="option"
                            aria-selected={!selectedGenreId}
                            onClick={() => {
                                onChange(null);
                                setIsOpen(false);
                            }}
                            className={`w-full rounded-xl px-3 py-2 text-left font-semibold uppercase tracking-[0.2em] transition ${
                                !selectedGenreId
                                    ? 'bg-[color:var(--accent)] text-black shadow-[0_10px_24px_rgba(0,0,0,0.2)]'
                                    : 'text-[color:var(--muted)] hover:bg-[color:var(--surface-muted)]'
                            }`}
                        >
                            Any genre
                        </button>
                        <div className="genre-scroll mt-2 max-h-64 overflow-auto">
                            {genres.map((option) => {
                                const isSelected =
                                    option.id === selectedGenreId;
                                return (
                                    <button
                                        key={option.id}
                                        type="button"
                                        role="option"
                                        aria-selected={isSelected}
                                        onClick={() => {
                                            onChange(option.id);
                                            setIsOpen(false);
                                        }}
                                        className={`mt-1 w-full rounded-xl px-3 py-2 text-left font-semibold uppercase tracking-[0.18em] transition ${
                                            isSelected
                                                ? 'bg-[color:var(--accent)] text-black shadow-[0_10px_24px_rgba(0,0,0,0.2)]'
                                                : 'text-[color:var(--text)] hover:bg-[color:var(--surface-muted)]'
                                        }`}
                                    >
                                        {option.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ) : null}
            </div>
            {selectedGenreId ? (
                <button
                    type="button"
                    onClick={handleClear}
                    className="h-10 rounded-full border border-[color:var(--border)] px-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[color:var(--muted)] transition duration-200 hover:-translate-y-0.5 hover:text-[color:var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
                >
                    Clear
                </button>
            ) : null}
            {error ? <p className="text-xs text-red-400">{error}</p> : null}
        </div>
    );
};

export default SelectGenre;
