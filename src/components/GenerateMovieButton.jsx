import { Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import useFetchMovie from '../hooks/useFetchMovie';

// selectedGenreId,
const GenerateMovieButton = ({
    url,
    setIsModalOpen,
    setData,
    setIsLoading,
}) => {
    // fullUrl = selectedGenreId ? `${url}&genre=${selectedGenreId}` : url;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
            'X-RapidAPI-Host': import.meta.env.VITE_API_HOST,
        },
    };

    useEffect(() => {
        useFetchMovie(url, options);
    }, []);

    const fetchData = async () => {
        try {
            let response = await fetch(url, options);
            let data = await response.json();
            setData(data.result);
            console.log(`data: `, data.result);
        } catch (err) {
            console.log(err);
        }
    };

    const callFetch = async () => {
        setIsModalOpen(true);
        setIsLoading(true);

        await fetchData();

        setIsLoading(false);
    };

    return (
        <Button
            variant="outlined"
            colorScheme="brand"
            onClick={e => callFetch()}
        >
            Generate!
        </Button>
    );
};
export default GenerateMovieButton;
