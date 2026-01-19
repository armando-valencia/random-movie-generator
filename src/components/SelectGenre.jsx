import { useState } from 'react';

const genres = [
    // { id: 1, genre: 'Biography' },
    // { id: 2, genre: 'Film Noir' },
    // { id: 3, genre: 'Game Show' },
    // { id: 4, genre: 'Musical' },
    // { id: 5, genre: 'Sport' },
    // { id: 6, genre: 'Short' },
    // { id: 7, genre: 'Adult' },
    { id: 12, genre: 'Adventure' },
    // { id: 14, genre: 'Fantasy' },
    // { id: 16, genre: 'Animation' },
    { id: 18, genre: 'Drama' },
    { id: 27, genre: 'Horror' },
    { id: 28, genre: 'Action' },
    // { id: 35, genre: 'Comedy' },
    // { id: 36, genre: 'History' },
    // { id: 37, genre: 'Western' },
    // { id: 53, genre: 'Thriller' },
    // { id: 80, genre: 'Crime' },
    // { id: 99, genre: 'Documentary' },
    { id: 878, genre: 'Science Fiction' },
    { id: 9648, genre: 'Mystery' },
];

const SelectGenre = ({ genreChanger, idChanger, genre }) => {
    const [showGenres, setShowGenres] = useState(null);

    const onClickNo = () => {
        setShowGenres(false);
        genreChanger(null);
        idChanger(null);
    };

    return (
        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 text-center">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                Filter by genre?
            </h2>
            <div className="mt-3 flex items-center justify-center gap-3">
                <button
                    type="button"
                    onClick={() => setShowGenres(true)}
                    className="rounded-full bg-[color:var(--accent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black"
                >
                    Yes
                </button>
                <button
                    type="button"
                    onClick={onClickNo}
                    className="rounded-full border border-[color:var(--border)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]"
                >
                    No
                </button>
            </div>

            {showGenres && (
                <div className="mt-4">
                    <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                        {genre ? `Genre: ${genre}` : 'Select Genre'}
                        <select
                            value={genre || ''}
                            onChange={event => {
                                const selected = genres.find(
                                    item => item.genre === event.target.value
                                );
                                if (selected) {
                                    genreChanger(selected.genre);
                                    idChanger(selected.id);
                                }
                            }}
                            className="mt-2 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-muted)] px-3 py-2 text-sm text-[color:var(--text)]"
                        >
                            <option value="">Choose</option>
                            {genres.map(option => (
                                <option key={option.id} value={option.genre}>
                                    {option.genre}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            )}
        </div>
    );
};
export default SelectGenre;
