import { useState } from 'react';
import BackButton from '../components/BackButton';
import GenerateMovieButton from '../components/GenerateMovieButton';
import SelectGenre from '../components/SelectGenre';

const Hulu = () => {
    const service = 'service=hulu';
    const url =
        'https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&output_language=en&show_type=movie&show_original_language=en&' +
        service;

    const [selectedGenre, setSelectGenre] = useState(null);

    return (
        <>
            <BackButton />

            <div className="text-center">
                <h1>Hulu</h1>
                <div className="">
                    <SelectGenre setSelectGenre={setSelectGenre} />
                    <GenerateMovieButton
                        selectedGenre={selectedGenre}
                        url={url}
                    />
                </div>
            </div>
        </>
    );
};
export default Hulu;
