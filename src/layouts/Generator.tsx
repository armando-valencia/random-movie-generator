import { useState } from 'react';
import MovieModal from '../components/MovieModal';
import BackButton from '../components/BackButton';
import SelectGenre from '../components/SelectGenre';
import useFetchMovie from '../hooks/useFetchMovie';
import type { StreamingService } from '../types/movie';

type GeneratorProps = {
    page: string;
    service: StreamingService;
};

const Generator = ({ page, service }: GeneratorProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalCollapsed, setIsModalCollapsed] = useState<boolean>(false);
    const [selectedGenreId, setSelectedGenreId] = useState<string | null>(null);

    const { loading, error, movie, fetchMovie } = useFetchMovie();

    const handleGenerate = () => {
        setIsModalOpen(true);
        setIsModalCollapsed(false);
        fetchMovie(service, selectedGenreId);
    };

    return (
        <div className="space-y-8">
            <BackButton />
            <div className="relative overflow-visible rounded-[32px] border border-[color:var(--border)] bg-[color:var(--surface)]/85 p-6 shadow-[0_40px_120px_rgba(15,23,42,0.25)] md:p-12">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_55%)]" />
                <div className="relative space-y-8">
                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--muted)]">
                            Now streaming on
                        </p>
                        <div className="flex flex-wrap items-end justify-between gap-4">
                            <h1 className="flex items-center gap-3 text-3xl font-semibold md:text-5xl">
                                <span>{page}</span>
                                <span
                                    aria-hidden="true"
                                    className="inline-flex h-2.5 w-2.5 rounded-full shadow-[0_0_12px_rgba(0,0,0,0.15)]"
                                    style={{ backgroundColor: 'var(--accent)' }}
                                />
                            </h1>
                        </div>
                        <p className="max-w-2xl text-sm text-[color:var(--muted)] md:text-base">
                            Find something worth watching in one click.
                        </p>
                        <div
                            aria-hidden="true"
                            className="h-0.5 w-12 rounded-full opacity-60"
                            style={{ backgroundColor: 'var(--accent)' }}
                        />
                    </div>

                    <div className="accent-orbit rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)]/95 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.2)]">
                        <div className="flex flex-wrap items-center gap-4">
                            <button
                                type="button"
                                onClick={handleGenerate}
                                className="rounded-full bg-[color:var(--accent)] px-7 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-black transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.25)]"
                            >
                                Find a movie
                            </button>
                            {error ? (
                                <span className="rounded-full border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
                                    Fetch failed
                                </span>
                            ) : null}
                        </div>

                        <div className="mt-5">
                            <SelectGenre
                                selectedGenreId={selectedGenreId}
                                onChange={setSelectedGenreId}
                            />
                        </div>

                        <div className="mt-6 hidden rounded-2xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface-muted)] p-5 text-sm text-[color:var(--muted)] md:block">
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
                                    <p className="line-clamp-3">
                                        {movie.overview}
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--muted)]">
                                        No pick yet
                                    </p>
                                    <p>Tap "Find a movie" to start.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <MovieModal
                isOpen={isModalOpen}
                isCollapsed={isModalCollapsed}
                onClose={() => setIsModalCollapsed(true)}
                onExpand={() => setIsModalCollapsed(false)}
                onNext={handleGenerate}
                movie={movie}
                isLoading={loading}
                service={service}
            />
        </div>
    );
};
export default Generator;
