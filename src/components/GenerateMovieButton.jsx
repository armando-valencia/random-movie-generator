import { Button } from '@chakra-ui/react';
import useFetchMovie from '../hooks/useFetchMovie';

const GenerateMovieButton = ({ url, selectedGenreId, setIsModalOpen }) => {
    // const fullUrl = selectedGenreId ? `${url}&genre=${selectedGenreId}` : url;

    // const fetchMovie = useFetchMovie(fullUrl);

    return (
        <>
            <Button
                variant="outlined"
                colorScheme="brand"
                onClick={e => setIsModalOpen(true)}
            >
                Generate!
            </Button>
        </>
    );
};
export default GenerateMovieButton;
