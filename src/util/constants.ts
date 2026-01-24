export const API_PROXY_BASE_URL = '/api/get-movie';

export const THEME_MODES = {
    light: 'light',
    dark: 'dark',
} as const;

export type ThemeMode = (typeof THEME_MODES)[keyof typeof THEME_MODES];

export const THEME_LABELS: Record<ThemeMode, string> = {
    [THEME_MODES.light]: 'Light',
    [THEME_MODES.dark]: 'Dark',
};

export const PREFERS_DARK_QUERY = '(prefers-color-scheme: dark)';

export const SERVICES = {
    netflix: 'netflix',
    hulu: 'hulu',
    hbo: 'hbo',
} as const;

export type StreamingService = (typeof SERVICES)[keyof typeof SERVICES];

export const SERVICE_LIST = Object.values(SERVICES);

export const SERVICE_LABELS: Record<StreamingService, string> = {
    [SERVICES.netflix]: 'Netflix',
    [SERVICES.hulu]: 'Hulu',
    [SERVICES.hbo]: 'HBO',
};

export const isStreamingService = (value: string): value is StreamingService =>
    SERVICE_LIST.includes(value as StreamingService);
