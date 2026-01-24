import { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import StreamingService from './pages/StreamingService';
import ThemeToggle from './components/ThemeToggle';
import {
    SERVICES,
    SERVICE_LABELS,
    isStreamingService,
} from './util/constants';
import type { StreamingService as StreamingServiceSlug } from './types/movie';

const getServiceFromPath = (
    pathname: string
): StreamingServiceSlug | null => {
    const segment = pathname.split('/')[1];
    if (segment && isStreamingService(segment)) {
        return segment;
    }
    return null;
};

function App() {
    const location = useLocation();

    useEffect(() => {
        const service = getServiceFromPath(location.pathname);
        const root = document.documentElement;
        const body = document.body;
        if (service) {
            root.dataset.service = service;
            body.dataset.service = service;
        } else {
            root.removeAttribute('data-service');
            body.removeAttribute('data-service');
        }
    }, [location.pathname]);

    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="pointer-events-none absolute -left-24 top-16 h-80 w-80 rounded-[40%] bg-[color:var(--blob-1)] blur-[120px]" />
            <div className="pointer-events-none absolute right-[-6%] top-[-12%] h-72 w-72 rounded-[45%] bg-[color:var(--blob-2)] blur-[130px]" />
            <div className="pointer-events-none absolute -right-6 bottom-[-12%] h-96 w-96 rounded-full bg-[color:var(--blob-3)] blur-[140px]" />

            <div className="relative z-10 flex min-h-screen flex-col">
                <header className="flex items-center justify-between px-6 py-5 md:px-10">
                    <Link
                        to="/"
                        className="text-xs font-semibold uppercase tracking-[0.4em] text-[color:var(--muted)] transition hover:text-[color:var(--text)]"
                    >
                        Random Movie Generator
                    </Link>
                    <ThemeToggle />
                </header>

                <main className="flex-1 px-6 pb-12 md:px-10">
                    <div className="mx-auto w-full max-w-5xl">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path={`/${SERVICES.netflix}`}
                                element={
                                    <StreamingService
                                        service={SERVICES.netflix}
                                        label={SERVICE_LABELS[SERVICES.netflix]}
                                    />
                                }
                            />
                            <Route
                                path={`/${SERVICES.hulu}`}
                                element={
                                    <StreamingService
                                        service={SERVICES.hulu}
                                        label={SERVICE_LABELS[SERVICES.hulu]}
                                    />
                                }
                            />
                            <Route
                                path={`/${SERVICES.hbo}`}
                                element={
                                    <StreamingService
                                        service={SERVICES.hbo}
                                        label={SERVICE_LABELS[SERVICES.hbo]}
                                    />
                                }
                            />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App;
