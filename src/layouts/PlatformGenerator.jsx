import { useEffect, useState } from 'react';
import { Spinner, useDisclosure } from '@chakra-ui/react';
import BackButton from '../components/BackButton';
import GenerateMovieButton from '../components/GenerateMovieButton';
import MovieModal from '../components/MovieModal';
import { API_BASE_URL } from '../util/constants';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_API_HOST,
    },
};

const PlatformGenerator = ({ page, service }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { onOpen, onClose } = useDisclosure();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [newUrl, setNewUrl] = useState('');
    const url = `${API_BASE_URL}&services=${service}`;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(newUrl ? newUrl : url, options);
            const data = await response.json();

            console.log(data);

            if (data.hasMore) {
                setNewUrl(
                    `${API_BASE_URL}&services=${service}&cursor=${data.nextCursor}`
                );
            } else {
                setNewUrl(`${API_BASE_URL}&services=${service}`);
            }

            setData(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Spinner size="lg" />;
    if (error) return <p>Something went wrong.</p>;

    return (
        <>
            <BackButton />

            <div className="text-center">
                <h1 className="text-2xl font-semibold p-4">{page}</h1>
                <div>
                    {data ? <p>{data.title}</p> : 'no data'}
                    <GenerateMovieButton
                        setIsModalOpen={setIsModalOpen}
                        fetchData={fetchData}
                    />
                </div>
            </div>

            {isModalOpen && (
                <MovieModal
                    isModalOpen={isModalOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    setIsModalOpen={setIsModalOpen}
                    data={data.result}
                    isLoading={loading}
                    service={service}
                />
            )}
        </>
    );
};
export default PlatformGenerator;
