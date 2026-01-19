import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

const STORAGE_KEY = 'rm-theme';

const getInitialTheme = () => {
    if (typeof window === 'undefined') {
        return 'dark';
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
        return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
};

const ThemeToggle = () => {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('dark', theme === 'dark');
        window.localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    const isDark = theme === 'dark';

    return (
        <button
            type="button"
            aria-pressed={isDark}
            aria-label="Toggle theme"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)] shadow-[0_10px_30px_rgba(15,23,42,0.12)] transition duration-200 hover:-translate-y-0.5 hover:text-[color:var(--text)]"
        >
            {isDark ? <FiSun /> : <FiMoon />}
            {isDark ? 'Light' : 'Dark'}
        </button>
    );
};

export default ThemeToggle;
