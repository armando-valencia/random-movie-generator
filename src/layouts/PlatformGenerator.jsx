import { useState } from 'react';
import BackButton from '../components/BackButton';
import GenerateMovieButton from '../components/GenerateMovieButton';
import SelectGenre from '../components/SelectGenre';

const PlatformGenerator = ({ page, service }) => {
    const serviceStr = `service=${service}`;
    const url =
        'https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&output_language=en&show_type=movie&show_original_language=en&' +
        serviceStr;

    const [selectedGenre, setSelectedGenre] = useState(null);
    const [selectedGenreId, setSelectedGenreId] = useState(null);

    return (
        <>
            <BackButton />

            <div className="text-center">
                <h1 className="text-2xl font-semibold">{page}</h1>
                <div>
                    <SelectGenre
                        genreChanger={setSelectedGenre}
                        idChanger={setSelectedGenreId}
                        genre={selectedGenre}
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
export default PlatformGenerator;
