import fs from 'node:fs/promises';
import path from 'node:path';

const API_BASE_URL =
    'https://streaming-availability.p.rapidapi.com/shows/search/filters';

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

const isStreamingService = (value: string): value is StreamingService =>
    ALLOWED_SERVICES.has(value as StreamingService);

type V4ImageSet = {
    verticalPoster?: Record<string, string>;
    horizontalBackdrop?: Record<string, string>;
};

type V4Genre = {
    id: string;
    name: string;
};

type V4StreamingOption = {
    service?: {
        id?: string;
        name?: string;
    };
    link?: string;
    videoLink?: string;
};

type V4Show = {
    title: string;
    overview?: string;
    releaseYear?: number;
    imdbId?: string;
    tmdbId?: string;
    rating?: number;
    imageSet?: V4ImageSet;
    genres?: V4Genre[];
    streamingOptions?: {
        us?: V4StreamingOption[];
    };
};

type V4Response = {
    shows?: V4Show[];
};

type NormalizedShow = {
    title: string;
    overview?: string;
    year?: number;
    imdbId?: string;
    tmdbId?: string;
    imdbRating?: number;
    posterURLs?: Record<string, string>;
    backdropURLs?: Record<string, string>;
    genres?: V4Genre[];
    streamingInfo?: {
        us?: Record<string, { link?: string; watchLink?: string }[]>;
    };
};

const normalizeShows = (
    payload: V4Response,
    service: StreamingService
): NormalizedShow[] => {
    const shows = payload.shows || [];
    return shows.flatMap(show => {
        const posterUrl =
            show.imageSet?.verticalPoster?.w360 ||
            show.imageSet?.verticalPoster?.w480 ||
            show.imageSet?.verticalPoster?.w240 ||
            '';
        const backdropUrl =
            show.imageSet?.horizontalBackdrop?.w720 ||
            show.imageSet?.horizontalBackdrop?.w1080 ||
            show.imageSet?.horizontalBackdrop?.w480 ||
            '';
        const streamOptions = show.streamingOptions?.us || [];
        const matchingOptions = streamOptions.filter(
            option => option.service?.id === service
        );
        if (!matchingOptions.length) {
            return [];
        }
        const streamingInfo = {
            us: {
                [service]: matchingOptions.map(option => ({
                    link: option.link,
                    watchLink: option.videoLink,
                })),
            },
        };
        const imdbRating =
            typeof show.rating === 'number' ? show.rating / 10 : undefined;

        return [
            {
                title: show.title,
                overview: show.overview,
                year: show.releaseYear,
                imdbId: show.imdbId,
                tmdbId: show.tmdbId,
                imdbRating,
                posterURLs: posterUrl ? { '342': posterUrl } : undefined,
                backdropURLs: backdropUrl ? { '780': backdropUrl } : undefined,
                genres: show.genres,
                streamingInfo,
            },
        ];
    });
};

async function loadCursorServices(): Promise<CursorServices | null> {
    const localPath = path.resolve(process.cwd(), 'public/data/cursors.json');
    try {
        const raw = await fs.readFile(localPath, 'utf8');
        const payload: { services?: CursorServices } = JSON.parse(raw);
        return payload.services || null;
    } catch (error) {
        const baseUrl = process.env.URL || process.env.DEPLOY_PRIME_URL || null;
        if (!baseUrl) {
            return null;
        }
        try {
            const response = await fetch(`${baseUrl}/data/cursors.json`);
            if (!response.ok) {
                return null;
            }
            const payload: { services?: CursorServices } =
                await response.json();
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
    const serviceParam = params.service && params.service.toLowerCase();
    const genreParam = params.genre || '';

    if (!serviceParam || !isStreamingService(serviceParam)) {
        return {
            statusCode: 400,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ error: 'Invalid service.' }),
        };
    }

    const service = serviceParam;
    const genreFilter = genreParam
        ? `&genres=${encodeURIComponent(genreParam)}`
        : '';
    const queryString =
        `country=us&series_granularity=show&order_direction=asc&order_by=original_title&genres_relation=and&output_language=en&show_type=movie&show_original_language=en&catalogs=${encodeURIComponent(
            service
        )}${genreFilter}`;
    const url = `${API_BASE_URL}?${queryString}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': RAPIDAPI_HOST,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            return {
                statusCode: response.status,
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    error: 'Upstream request failed.',
                    details: errorText,
                }),
            };
        }

        const data: V4Response = await response.json();
        const normalized = normalizeShows(data, service);

        return {
            statusCode: response.status,
            headers: {
                'content-type': 'application/json',
                'cache-control': 'public, max-age=86400, s-maxage=86400',
            },
            body: JSON.stringify({ result: normalized }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ error: 'Upstream request failed.' }),
        };
    }
}
