import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
    const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const dragStartYRef = useRef(0);
    const dragPointerIdRef = useRef<number | null>(null);
    const dragOffsetRef = useRef(0);
    const draggingRef = useRef(false);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKey);
        return () => {
            window.removeEventListener('keydown', handleKey);
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        setIsOverviewExpanded(false);
        setDragOffset(0);
        setIsDragging(false);
        dragOffsetRef.current = 0;
        draggingRef.current = false;
    }, [isOpen, movie?.id]);

    if (!isOpen) {
        return null;
    }
    if (typeof document === 'undefined') {
        return null;
    }

    const streamingInfo = movie?.streamingInfo?.us || {};
    const streamingEntries = Object.entries(streamingInfo) as [
        string,
        StreamingInfoEntry[],
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
    const overview = movie?.overview?.trim() || '';
    const overviewLimit = 220;
    const shouldTruncateOverview = overview.length > overviewLimit;
    const displayedOverview =
        isOverviewExpanded || !shouldTruncateOverview
            ? overview
            : `${overview.slice(0, overviewLimit).trimEnd()}...`;
    const dragProgress = Math.min(dragOffset / 360, 1);
    const overlayOpacity = Math.max(0.15, 0.4 - dragProgress * 0.2);
    const dragScale = 1 - dragProgress * 0.03;
    const handleDragEnd = (event: React.PointerEvent<HTMLDivElement>) => {
        if (
            dragPointerIdRef.current !== null &&
            dragPointerIdRef.current !== event.pointerId
        ) {
            return;
        }
        const threshold = Math.min(window.innerHeight * 0.22, 160);
        if (dragOffsetRef.current > threshold) {
            setIsDragging(false);
            draggingRef.current = false;
            setDragOffset(window.innerHeight);
            dragOffsetRef.current = window.innerHeight;
            window.setTimeout(onClose, 220);
        } else {
            setDragOffset(0);
            dragOffsetRef.current = 0;
            setIsDragging(false);
            draggingRef.current = false;
        }
        if (dragPointerIdRef.current !== null) {
            try {
                event.currentTarget.releasePointerCapture(
                    dragPointerIdRef.current,
                );
            } catch {
                // Ignore release errors when capture is already cleared.
            }
        }
        dragPointerIdRef.current = null;
    };

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-end justify-center px-0 pb-0 pt-6 sm:items-center sm:px-4 sm:pb-4 sm:pt-4"
            onClick={onClose}
            role="presentation"
            style={{
                backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
                transition: isDragging
                    ? 'none'
                    : 'background-color 240ms ease-out',
            }}
        >
            <div
                ref={modalRef}
                className="relative z-10 w-full max-w-4xl max-h-[90vh] h-[90vh] overflow-hidden rounded-t-2xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[0_30px_120px_rgba(15,23,42,0.45)] animate-fade-in sm:h-auto sm:rounded-3xl"
                onClick={(event) => event.stopPropagation()}
                style={{
                    transform: dragOffset
                        ? `translate3d(0, ${dragOffset}px, 0) scale(${dragScale})`
                        : undefined,
                    transition: isDragging
                        ? 'none'
                        : 'transform 240ms ease-out',
                    touchAction: isDragging ? 'none' : 'pan-y',
                    willChange: isDragging ? 'transform' : undefined,
                    boxShadow: dragOffset
                        ? '0 18px 80px rgba(15, 23, 42, 0.35)'
                        : undefined,
                }}
            >
                <div className="absolute inset-0 -z-10 rounded-t-2xl bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_60%)] sm:rounded-3xl" />
                <button
                    type="button"
                    aria-label="Close modal"
                    onClick={onClose}
                    className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] text-lg font-semibold text-[color:var(--text)] shadow-[0_10px_30px_rgba(15,23,42,0.25)] transition duration-200 hover:-translate-y-0.5 sm:right-6 sm:top-6"
                >
                    x
                </button>
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
                    <div className="grid h-full min-h-0 grid-rows-[auto,1fr,auto]">
                        <div
                            className="relative max-h-[40vh] min-h-[240px] touch-none overflow-hidden rounded-t-2xl bg-[color:var(--surface-muted)]"
                            onPointerDown={(event) => {
                                if (event.button !== 0) {
                                    return;
                                }
                                if (
                                    event.target instanceof HTMLElement &&
                                    event.target.closest('button, a')
                                ) {
                                    return;
                                }
                                event.preventDefault();
                                dragStartYRef.current = event.clientY;
                                dragPointerIdRef.current = event.pointerId;
                                dragOffsetRef.current = 0;
                                draggingRef.current = true;
                                event.currentTarget.setPointerCapture(
                                    event.pointerId,
                                );
                                setIsDragging(true);
                            }}
                            onPointerMove={(event) => {
                                if (
                                    !draggingRef.current ||
                                    dragPointerIdRef.current !== event.pointerId
                                ) {
                                    return;
                                }
                                const delta = Math.max(
                                    0,
                                    event.clientY - dragStartYRef.current,
                                );
                                dragOffsetRef.current = delta;
                                setDragOffset(delta);
                            }}
                            onPointerUp={handleDragEnd}
                            onPointerCancel={handleDragEnd}
                        >
                            {movie.posterURLs?.['342'] ||
                            movie.backdropURLs?.['780'] ? (
                                <img
                                    src={
                                        movie.posterURLs?.['342'] ||
                                        movie.backdropURLs?.['780']
                                    }
                                    alt={`${movie.title} poster`}
                                    className="block h-full w-full object-cover object-top"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-sm text-[color:var(--muted)]">
                                    No artwork available
                                </div>
                            )}
                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[color:var(--surface)] to-transparent md:hidden" />
                        </div>
                        <div className="flex min-h-0 flex-1 flex-col px-6 pb-2 pt-4">
                            <div
                                ref={scrollRef}
                                className="modal-scroll flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pb-4 overscroll-contain"
                            >
                                {/* <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--muted)]">
                                    {serviceLabel} pick
                                </p> */}
                                <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
                                    {movie.title}
                                </h2>
                                <p className="mt-2 text-sm text-[color:var(--muted)]">
                                    {movie.year} - IMDb {imdbLabel}
                                </p>
                                {overview ? (
                                    <div className="space-y-2">
                                        <p className="text-sm leading-relaxed text-[color:var(--muted)]">
                                            {displayedOverview}
                                        </p>
                                        {shouldTruncateOverview ? (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setIsOverviewExpanded(
                                                        (value) => !value,
                                                    )
                                                }
                                                className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]"
                                            >
                                                {isOverviewExpanded
                                                    ? 'See less'
                                                    : 'See more'}
                                            </button>
                                        ) : null}
                                    </div>
                                ) : null}
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
                                                ),
                                            )}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="border-t border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-4">
                            <div className="flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    onClick={onNext}
                                    className="flex-1 rounded-full bg-[color:var(--accent)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black transition duration-200 hover:-translate-y-0.5"
                                >
                                    Another one
                                </button>
                                {watchLink ? (
                                    <a
                                        href={watchLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex flex-1 items-center justify-center rounded-full border border-[color:var(--border)] px-5 py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--text)] transition duration-200 hover:-translate-y-0.5"
                                    >
                                        Watch now
                                    </a>
                                ) : null}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-6 text-sm text-[color:var(--muted)]">
                        No results returned. Try again in a moment.
                    </div>
                )}
            </div>
        </div>,
        document.body,
    );
};

export default MovieModal;
