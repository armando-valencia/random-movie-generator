import { Button } from '@chakra-ui/react';

// selectedGenreId,
const GenerateMovieButton = ({ setIsModalOpen, fetchData }) => {
    // fullUrl = selectedGenreId ? `${url}&genre=${selectedGenreId}` : url;

    return (
        <Button
            variant="outlined"
            colorScheme="brand"
            onClick={e => {
                setIsModalOpen(true);
                fetchData();
            }}
        >
            Generate!
        </Button>
    );
};
export default GenerateMovieButton;
