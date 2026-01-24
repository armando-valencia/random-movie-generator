import { useEffect } from 'react';
import type {
    Movie,
    StreamingInfoEntry,
    StreamingService,
} from '../types/movie';

type MovieModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onNext: () => void;
    movie: Movie | null;
    isLoading: boolean;
    service: StreamingService;
};

const MovieModal = ({
    isOpen,
    onClose,
    onNext,
    movie,
    isLoading,
    service,
}: MovieModalProps) => {
    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    const streamingInfo = movie?.streamingInfo?.us || {};
    const streamingEntries = Object.entries(streamingInfo) as [
        string,
        StreamingInfoEntry[]
    ][];
    const primaryService = streamingInfo?.[service]?.[0];
    const fallbackService = streamingEntries[0]?.[1]?.[0];
    const watchLink =
        primaryService?.watchLink ||
        primaryService?.link ||
        fallbackService?.watchLink ||
        fallbackService?.link ||
        '';
    const serviceLabel = service ? service.toUpperCase() : 'Service';
    const imdbLabel = movie?.imdbRating !== undefined ? movie.imdbRating : '-';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <button
                type="button"
                aria-label="Close modal"
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm focus:outline-none"
            />
            <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[0_30px_120px_rgba(15,23,42,0.45)] animate-fade-in">
                {isLoading ? (
                    <div className="grid gap-6 p-6 md:grid-cols-[0.8fr_1.2fr]">
                        <div className="h-64 w-full animate-pulse rounded-2xl bg-[color:var(--surface-muted)]" />
                        <div className="space-y-4">
                            <div className="h-8 w-2/3 animate-pulse rounded-full bg-[color:var(--surface-muted)]" />
                            <div className="h-4 w-full animate-pulse rounded-full bg-[color:var(--surface-muted)]" />
                            <div className="h-4 w-5/6 animate-pulse rounded-full bg-[color:var(--surface-muted)]" />
                            <div className="h-10 w-1/2 animate-pulse rounded-full bg-[color:var(--surface-muted)]" />
                        </div>
                    </div>
                ) : movie ? (
                    <div className="grid gap-6 p-6 md:grid-cols-[0.8fr_1.2fr]">
                        <div className="overflow-hidden rounded-2xl bg-[color:var(--surface-muted)]">
                            {movie.posterURLs?.['342'] ||
                            movie.backdropURLs?.['780'] ? (
                                <img
                                    src={
                                        movie.posterURLs?.['342'] ||
                                        movie.backdropURLs?.['780']
                                    }
                                    alt={`${movie.title} poster`}
                                    className="block h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-sm text-[color:var(--muted)]">
                                    No artwork available
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--muted)]">
                                    {serviceLabel} pick
                                </p>
                                <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
                                    {movie.title}
                                </h2>
                                <p className="mt-2 text-sm text-[color:var(--muted)]">
                                    {movie.year} - IMDb {imdbLabel}
                                </p>
                            </div>
                            <p className="text-sm leading-relaxed text-[color:var(--muted)]">
                                {movie.overview}
                            </p>
                            {movie.genres?.length ? (
                                <div className="flex flex-wrap gap-2">
                                    {movie.genres.map((genre) => (
                                        <span
                                            key={genre.id}
                                            className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            ) : null}
                            {streamingEntries.length ? (
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--muted)]">
                                        Streaming on
                                    </p>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {streamingEntries.map(
                                            ([serviceName]) => (
                                                <span
                                                    key={serviceName}
                                                    className="rounded-full bg-[color:var(--surface-muted)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--text)]"
                                                >
                                                    {serviceName}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            ) : null}
                            <div className="mt-auto flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    onClick={onNext}
                                    className="rounded-full bg-[color:var(--accent)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black transition duration-200 hover:-translate-y-0.5"
                                >
                                    Another one
                                </button>
                                {watchLink ? (
                                    <a
                                        href={watchLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="rounded-full border border-[color:var(--border)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--text)] transition duration-200 hover:-translate-y-0.5"
                                    >
                                        Watch now
                                    </a>
                                ) : null}
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="rounded-full border border-[color:var(--border)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)] transition duration-200 hover:-translate-y-0.5"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-6 text-sm text-[color:var(--muted)]">
                        No results returned. Try again in a moment.
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieModal;

