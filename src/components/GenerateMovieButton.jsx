import { Button } from '@chakra-ui/react';
import { useState } from 'react';

// prettier-ignore
const GenerateMovieButton = ({ url, selectedGenreId, setIsModalOpen, setData, data }) => {
    // fullUrl = selectedGenreId ? `${url}&genre=${selectedGenreId}` : url;
    const [isFetching, setIsFetching] = useState(false);

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
            'X-RapidAPI-Host': import.meta.env.VITE_API_HOST,
        },
    };

    const callFetchHook = () => {
        if (url && isFetching) {

            console.log('begin fetch');
            fetch(url, options)
                .then(response => response.json())
                .then(response => {
                    console.log('RES', response.result);
                    setData(response.result);
                })
                .catch(err => console.error(err));

            setIsFetching(false);
            console.log('after fetch');
        }
    };

    return (
        <>
            <Button
                variant="outlined"
                colorScheme="brand"
                onClick={() => {
                    setIsFetching(true);
                    setIsModalOpen(true);
                    callFetchHook();
                    console.log('DATA:', data);
                }}
            >
                Generate!
            </Button>
        </>
    );
};
export default GenerateMovieButton;
