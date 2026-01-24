import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import {
    PREFERS_DARK_QUERY,
    THEME_LABELS,
    THEME_MODES,
    type ThemeMode,
} from '../util/constants';

const STORAGE_KEY = 'rm-theme';

const getInitialTheme = (): ThemeMode => {
    if (typeof window === 'undefined') {
        return THEME_MODES.dark;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === THEME_MODES.light || stored === THEME_MODES.dark) {
        return stored;
    }
    return window.matchMedia(PREFERS_DARK_QUERY).matches
        ? THEME_MODES.dark
        : THEME_MODES.light;
};

const ThemeToggle = () => {
    const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('dark', theme === THEME_MODES.dark);
        window.localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    const isDark = theme === THEME_MODES.dark;

    return (
        <button
            type="button"
            aria-pressed={isDark}
            aria-label="Toggle theme"
            onClick={() =>
                setTheme(isDark ? THEME_MODES.light : THEME_MODES.dark)
            }
            className="flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)] shadow-[0_10px_30px_rgba(15,23,42,0.12)] transition duration-200 hover:-translate-y-0.5 hover:text-[color:var(--text)]"
        >
            {isDark ? <FiSun /> : <FiMoon />}
            {isDark ? THEME_LABELS.light : THEME_LABELS.dark}
        </button>
    );
};

export default ThemeToggle;
