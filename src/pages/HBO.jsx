import { useState } from 'react';
import BackButton from '../components/BackButton';
import GenerateMovieButton from '../components/GenerateMovieButton';
import SelectGenre from '../components/SelectGenre';

const HBO = () => {
    const service = 'service=hbo';
    const url =
        'https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&output_language=en&show_type=movie&show_original_language=en&' +
        service;

    const [selectedGenre, setSelectedGenre] = useState(null);

    return (
        <>
            <BackButton />

            <div className="text-center">
                <h1>HBO</h1>
                <div className="">
                    <SelectGenre setSelectedGenre={setSelectedGenre} />
                    <GenerateMovieButton
                        selectedGenre={selectedGenre}
                        url={url}
                    />
                </div>
            </div>
        </>
    );
};
export default HBO;
