import fs from 'node:fs/promises';
import path from 'node:path';

const API_BASE_URL =
    'https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&output_language=en&show_type=movie&show_original_language=en';

const SERVICES = {
    netflix: 'netflix',
    hulu: 'hulu',
    hbo: 'hbo',
} as const;

type StreamingService = (typeof SERVICES)[keyof typeof SERVICES];

const ALLOWED_SERVICES = new Set(Object.values(SERVICES));
const DEFAULT_CURSORS: Record<StreamingService, string[]> = {
    [SERVICES.netflix]: [''],
    [SERVICES.hulu]: [''],
    [SERVICES.hbo]: [''],
};

type CursorServices = Record<string, string[]>;

type HandlerEvent = {
    queryStringParameters?: Record<string, string | undefined> | null;
};

type HandlerResponse = {
    statusCode: number;
    headers: Record<string, string>;
    body: string;
};

async function loadCursorServices(): Promise<CursorServices | null> {
    const localPath = path.resolve(process.cwd(), 'public/data/cursors.json');
    try {
        const raw = await fs.readFile(localPath, 'utf8');
        const payload: { services?: CursorServices } = JSON.parse(raw);
        return payload.services || null;
    } catch (error) {
        const baseUrl =
            process.env.URL || process.env.DEPLOY_PRIME_URL || null;
        if (!baseUrl) {
            return null;
        }
        try {
            const response = await fetch(`${baseUrl}/data/cursors.json`);
            if (!response.ok) {
                return null;
            }
            const payload: { services?: CursorServices } = await response.json();
            return payload.services || null;
        } catch (fetchError) {
            return null;
        }
    }
}

export async function handler(event: HandlerEvent): Promise<HandlerResponse> {
    const { RAPIDAPI_KEY, RAPIDAPI_HOST } = process.env;

    if (!RAPIDAPI_KEY || !RAPIDAPI_HOST) {
        return {
            statusCode: 500,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ error: 'Server configuration missing.' }),
        };
    }

    const params = event.queryStringParameters || {};
    const service = params.service && params.service.toLowerCase();
    const cursorParam = params.cursor || '';

    if (!service || !ALLOWED_SERVICES.has(service)) {
        return {
            statusCode: 400,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ error: 'Invalid service.' }),
        };
    }

    const cursorServices = await loadCursorServices();
    const cursorList = cursorServices?.[service] || DEFAULT_CURSORS[service];
    const randomIndex = Math.floor(Math.random() * cursorList.length);
    const selectedCursor = cursorParam || cursorList[randomIndex] || '';

    const url = selectedCursor
        ? `${API_BASE_URL}&services=${service}&cursor=${encodeURIComponent(selectedCursor)}`
        : `${API_BASE_URL}&services=${service}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': RAPIDAPI_HOST,
            },
        });

        const data = await response.json();

        return {
            statusCode: response.status,
            headers: {
                'content-type': 'application/json',
                'cache-control': 'public, max-age=86400, s-maxage=86400',
            },
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ error: 'Upstream request failed.' }),
        };
    }
}
