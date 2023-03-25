import { useState } from 'react';
import BackButton from '../components/BackButton';
import GenerateMovieButton from '../components/GenerateMovieButton';
import SelectGenre from '../components/SelectGenre';
import MovieModal from '../components/MovieModal';
import { useDisclosure } from '@chakra-ui/react';

const PlatformGenerator = ({ page, service }) => {
    const url = `https://streaming-availability.p.rapidapi.com/v2/search/basic?country=us&output_language=en&show_type=movie&show_original_language=en&services=${service}`;

    const [selectedGenre, setSelectedGenre] = useState(null);
    const [selectedGenreId, setSelectedGenreId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState(null);
    const { onOpen, onClose } = useDisclosure();

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
                        selectedGenreId={selectedGenreId}
                        url={url}
                        setIsModalOpen={setIsModalOpen}
                        setData={setData}
                        data={data}
                    />
                </div>
            </div>

            {isModalOpen && (
                <MovieModal
                    isModalOpen={isModalOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    setIsModalOpen={setIsModalOpen}
                    data={data}
                />
            )}
        </>
    );
};
export default PlatformGenerator;
