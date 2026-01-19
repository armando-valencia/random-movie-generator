import PlatformSelection from '../components/PlatformSelection';

const Home = () => (
    <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center animate-fade-in">
        <section className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[color:var(--muted)]">
                Stream roulette
            </p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                Find your next movie in a flash.
            </h1>
            <p className="text-base text-[color:var(--muted)] md:text-lg">
                Pick a platform, hit generate, and jump straight into a new
                watch.
            </p>
            <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[color:var(--surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)] shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
                    Updated monthly
                </span>
                <span className="rounded-full border border-[color:var(--border)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    Randomized picks
                </span>
            </div>
        </section>

        <section className="rounded-[32px] border border-[color:var(--border)] bg-[color:var(--surface)]/92 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.2)]">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold">
                        Choose your platform
                    </h2>
                    <p className="mt-2 text-sm text-[color:var(--muted)]">
                        Quick picks, zero browsing.
                    </p>
                </div>
                <span className="hidden rounded-full border border-[color:var(--border)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--muted)] md:inline-flex">
                    3 services
                </span>
            </div>
            <PlatformSelection />
        </section>
    </div>
);
export default Home;
