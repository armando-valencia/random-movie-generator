/* @vitest-environment node */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import fs from 'node:fs/promises';
import { handler } from '../netlify/functions/get-movie';

type FetchResponse = {
    ok: boolean;
    status: number;
    json: () => Promise<unknown>;
    text: () => Promise<string>;
};

const createJsonResponse = (status: number, payload: unknown): FetchResponse => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => payload,
    text: async () => JSON.stringify(payload),
});

vi.mock('node:fs/promises', () => ({
    default: {
        readFile: vi.fn(),
    },
}));

describe('get-movie handler', () => {
    const originalEnv = { ...process.env };

    beforeEach(() => {
        process.env = {
            ...originalEnv,
            RAPIDAPI_KEY: 'test-key',
            RAPIDAPI_HOST: 'streaming-availability.p.rapidapi.com',
        };
        vi.restoreAllMocks();
    });

    afterEach(() => {
        process.env = { ...originalEnv };
    });

    it('uses request host to load cursors when local file read fails', async () => {
        vi.spyOn(fs, 'readFile').mockRejectedValueOnce(new Error('no file'));
        const fetchMock = vi.fn();
        fetchMock
            .mockResolvedValueOnce(
                createJsonResponse(200, {
                    services: {
                        netflix: ['123:Demo Cursor'],
                    },
                })
            )
            .mockResolvedValueOnce(
                createJsonResponse(200, {
                    shows: [
                        {
                            title: 'Sample Movie',
                            streamingOptions: {
                                us: [{ service: { id: 'netflix' } }],
                            },
                        },
                    ],
                })
            );
        globalThis.fetch = fetchMock as unknown as typeof fetch;
        vi.spyOn(Math, 'random').mockReturnValue(0);

        const response = await handler({
            queryStringParameters: { service: 'netflix' },
            headers: { host: 'example.com', 'x-forwarded-proto': 'https' },
        });

        expect(fetchMock).toHaveBeenNthCalledWith(
            1,
            'https://example.com/data/cursors.json'
        );
        const apiUrl = (fetchMock.mock.calls[1] as [string])[0];
        expect(apiUrl).toContain('cursor=123%3ADemo%20Cursor');
        expect(response.statusCode).toBe(200);
        expect(response.headers['cache-control']).toBe('no-store, max-age=0');
    });

    it('returns 400 for invalid service', async () => {
        const response = await handler({
            queryStringParameters: { service: 'paramount' },
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toContain('Invalid service');
    });

    it('returns 500 when env vars are missing', async () => {
        delete process.env.RAPIDAPI_KEY;
        delete process.env.RAPIDAPI_HOST;
        const response = await handler({
            queryStringParameters: { service: 'netflix' },
        });

        expect(response.statusCode).toBe(500);
        expect(response.body).toContain('Server configuration missing');
    });

    it('uses local cursor file when available', async () => {
        vi.spyOn(fs, 'readFile').mockResolvedValueOnce(
            JSON.stringify({
                services: { netflix: ['999:Local Cursor'] },
            })
        );
        const fetchMock = vi.fn().mockResolvedValueOnce(
            createJsonResponse(200, {
                shows: [
                    {
                        title: 'Local Movie',
                        streamingOptions: {
                            us: [{ service: { id: 'netflix' } }],
                        },
                    },
                ],
            })
        );
        globalThis.fetch = fetchMock as unknown as typeof fetch;
        vi.spyOn(Math, 'random').mockReturnValue(0);

        const response = await handler({
            queryStringParameters: { service: 'netflix' },
        });

        const apiUrl = (fetchMock.mock.calls[0] as [string])[0];
        expect(apiUrl).toContain('cursor=999%3ALocal%20Cursor');
        expect(response.statusCode).toBe(200);
    });

    it('uses cursor param override when provided', async () => {
        vi.spyOn(fs, 'readFile').mockResolvedValueOnce(
            JSON.stringify({ services: { netflix: ['123:One'] } })
        );
        const fetchMock = vi.fn().mockResolvedValueOnce(
            createJsonResponse(200, {
                shows: [
                    {
                        title: 'Override Movie',
                        streamingOptions: {
                            us: [{ service: { id: 'netflix' } }],
                        },
                    },
                ],
            })
        );
        globalThis.fetch = fetchMock as unknown as typeof fetch;

        const response = await handler({
            queryStringParameters: {
                service: 'netflix',
                cursor: '777:Override Cursor',
            },
        });

        const apiUrl = (fetchMock.mock.calls[0] as [string])[0];
        expect(apiUrl).toContain('cursor=777%3AOverride%20Cursor');
        expect(response.statusCode).toBe(200);
    });

    it('includes genre param when provided', async () => {
        vi.spyOn(fs, 'readFile').mockResolvedValueOnce(
            JSON.stringify({ services: { netflix: ['123:One'] } })
        );
        const fetchMock = vi.fn().mockResolvedValueOnce(
            createJsonResponse(200, {
                shows: [
                    {
                        title: 'Genre Movie',
                        streamingOptions: {
                            us: [{ service: { id: 'netflix' } }],
                        },
                    },
                ],
            })
        );
        globalThis.fetch = fetchMock as unknown as typeof fetch;

        const response = await handler({
            queryStringParameters: {
                service: 'netflix',
                genre: 'comedy',
            },
        });

        const apiUrl = (fetchMock.mock.calls[0] as [string])[0];
        expect(apiUrl).toContain('genres=comedy');
        expect(response.statusCode).toBe(200);
    });

    it('returns upstream error details when fetch is not ok', async () => {
        vi.spyOn(fs, 'readFile').mockResolvedValueOnce(
            JSON.stringify({ services: { netflix: ['123:One'] } })
        );
        const fetchMock = vi
            .fn()
            .mockResolvedValueOnce(
                createJsonResponse(404, { message: 'Not Found' })
            );
        globalThis.fetch = fetchMock as unknown as typeof fetch;

        const response = await handler({
            queryStringParameters: { service: 'netflix' },
        });

        expect(response.statusCode).toBe(404);
        expect(response.body).toContain('Upstream request failed');
    });

    it('returns 500 when fetch throws', async () => {
        vi.spyOn(fs, 'readFile').mockResolvedValueOnce(
            JSON.stringify({ services: { netflix: ['123:One'] } })
        );
        const fetchMock = vi.fn().mockRejectedValueOnce(new Error('boom'));
        globalThis.fetch = fetchMock as unknown as typeof fetch;

        const response = await handler({
            queryStringParameters: { service: 'netflix' },
        });

        expect(response.statusCode).toBe(500);
        expect(response.body).toContain('Upstream request failed');
    });

    it('filters shows that do not match the requested service', async () => {
        vi.spyOn(fs, 'readFile').mockResolvedValueOnce(
            JSON.stringify({ services: { netflix: ['123:One'] } })
        );
        const fetchMock = vi.fn().mockResolvedValueOnce(
            createJsonResponse(200, {
                shows: [
                    {
                        title: 'Mismatch',
                        streamingOptions: {
                            us: [{ service: { id: 'hulu' } }],
                        },
                    },
                ],
            })
        );
        globalThis.fetch = fetchMock as unknown as typeof fetch;

        const response = await handler({
            queryStringParameters: { service: 'netflix' },
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toContain('"result":[]');
    });
});
