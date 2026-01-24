import { useState } from 'react';
import MovieModal from '../components/MovieModal';
import BackButton from '../components/BackButton';
import useFetchMovie from '../hooks/useFetchMovie';
import type { StreamingService } from '../types/movie';

type GeneratorProps = {
    page: string;
    service: StreamingService;
};

const Generator = ({ page, service }: GeneratorProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { loading, error, movie, fetchMovie } = useFetchMovie();

    const handleGenerate = () => {
        setIsModalOpen(true);
        fetchMovie(service);
    };

    return (
        <div className="space-y-8">
            <BackButton />
            <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]/90 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.18)] md:p-10">
                <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                    <div className="space-y-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--muted)]">
                            Now streaming on
                        </p>
                        <h1 className="text-3xl font-semibold md:text-4xl">
                            {page}
                        </h1>
                        <p className="text-sm text-[color:var(--muted)]">
                            We&apos;ll pick a random movie and show where to
                            watch it. Every click spins a new cursor.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={handleGenerate}
                                className="rounded-full bg-[color:var(--accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-black transition duration-200 hover:-translate-y-0.5"
                            >
                                Surprise me
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="rounded-full border border-[color:var(--border)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--muted)] transition duration-200 hover:-translate-y-0.5"
                            >
                                Clear
                            </button>
                        </div>
                        {error ? (
                            <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-400">
                                We couldn&apos;t fetch a movie right now. Try
                                again in a moment.
                            </div>
                        ) : null}
                    </div>

                    <div className="rounded-2xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface-muted)] p-6 text-sm text-[color:var(--muted)]">
                        {loading ? (
                            <div className="space-y-3">
                                <div className="h-4 w-1/3 animate-pulse rounded-full bg-[color:var(--surface)]" />
                                <div className="h-5 w-3/4 animate-pulse rounded-full bg-[color:var(--surface)]" />
                                <div className="h-4 w-full animate-pulse rounded-full bg-[color:var(--surface)]" />
                            </div>
                        ) : movie ? (
                            <div className="space-y-2">
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--muted)]">
                                    Latest pick
                                </p>
                                <p className="text-lg font-semibold text-[color:var(--text)]">
                                    {movie.title}
                                </p>
                                <p>{movie.overview}</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--muted)]">
                                    No pick yet
                                </p>
                                <p>
                                    Tap "Surprise me" to reveal a random movie.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <MovieModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onNext={handleGenerate}
                movie={movie}
                isLoading={loading}
                service={service}
            />
        </div>
    );
};
export default Generator;
