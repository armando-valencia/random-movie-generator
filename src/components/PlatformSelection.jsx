import { Link } from 'react-router-dom';

const platforms = [
    {
        name: 'Netflix',
        accent: '#E50914',
        accentSoft: 'rgba(229, 9, 20, 0.12)',
    },
    {
        name: 'Hulu',
        accent: '#1CE783',
        accentSoft: 'rgba(28, 231, 131, 0.14)',
    },
    {
        name: 'HBO',
        accent: '#6E6CFF',
        accentSoft: 'rgba(110, 108, 255, 0.16)',
    },
];

const PlatformSelection = () => (
    <div className="mt-6 grid gap-4">
        {platforms.map((platform, index) => (
            <Link
                key={platform.name}
                to={`/${platform.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(15,23,42,0.2)]"
                style={{
                    '--brand': platform.accent,
                    '--brand-soft': platform.accentSoft,
                    transitionDelay: `${index * 60}ms`,
                }}
            >
                <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                    <div className="absolute -left-10 top-6 h-20 w-20 rounded-full bg-[color:var(--brand)] opacity-20 blur-3xl" />
                </div>
                <div className="relative flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--text)]" style={{ backgroundColor: 'var(--brand-soft)' }}>
                            {platform.name.slice(0, 2)}
                        </span>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--muted)]">
                                {platform.name}
                            </p>
                        </div>
                    </div>
                    <span className="flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition duration-300 group-hover:bg-[color:var(--brand)] group-hover:text-black" style={{ color: 'var(--brand)', borderColor: 'var(--brand)', backgroundColor: 'transparent' }}>
                        Go
                    </span>
                </div>
            </Link>
        ))}
    </div>
);

export default PlatformSelection;
