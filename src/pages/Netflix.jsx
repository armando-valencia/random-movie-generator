import { useState } from 'react';
import BackButton from '../components/BackButton';
import GenerateMovieButton from '../components/GenerateMovieButton';
import SelectGenre from '../components/SelectGenre';

const Netflix = () => {
    const service = 'service=netflix';
    const url =
        'https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&output_language=en&show_type=movie&show_original_language=en&' +
        service;

    const [selectedGenre, setSelectedGenre] = useState(null);
    const [selectedGenreId, setSelectedGenreId] = useState('');

    return (
        <>
            <BackButton />

            <div className="text-center">
                <h1>Netflix</h1>
                <div className="">
                    <SelectGenre
                        genreChanger={setSelectedGenre}
                        idChanger={setSelectedGenreId}
                    />
                    <GenerateMovieButton
                        selectedGenre={selectedGenre}
                        selectedGenreId={selectedGenreId}
                        url={url}
                    />
                </div>
            </div>
        </>
    );
};
export default Netflix;
