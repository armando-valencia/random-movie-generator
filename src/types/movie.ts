export type { StreamingService } from '../util/constants';

export type Genre = {
    id: number;
    name: string;
};

export type StreamingInfoEntry = {
    watchLink?: string;
    link?: string;
};

export type StreamingInfoRegion = Record<string, StreamingInfoEntry[]>;

export type Movie = {
    title: string;
    overview?: string;
    year?: number;
    runtime?: number;
    imdbRating?: number;
    imdbId?: string;
    tmdbId?: string;
    posterURLs?: Record<string, string>;
    backdropURLs?: Record<string, string>;
    genres?: Genre[];
    streamingInfo?: {
        us?: StreamingInfoRegion;
    };
};
