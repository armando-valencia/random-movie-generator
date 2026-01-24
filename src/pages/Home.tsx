import PlatformSelection from '../components/PlatformSelection';

const Home = () => (
    <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center animate-fade-in">
        <section className="space-y-6">
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                Find your next movie in a flash.
            </h1>
            <p className="text-base text-[color:var(--muted)] md:text-lg">
                Pick a platform to jump straight into a new watch.
            </p>
            <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[color:var(--surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)] shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
                    Updated monthly
                </span>
            </div>
        </section>

        <section className="rounded-[32px] border border-[color:var(--border)] bg-[color:var(--surface)]/92 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.2)]">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold">
                        Choose your platform
                    </h2>
                </div>
            </div>
            <PlatformSelection />
        </section>
    </div>
);
export default Home;
