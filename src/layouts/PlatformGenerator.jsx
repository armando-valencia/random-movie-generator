import { useState } from 'react';
import { Spinner, useDisclosure } from '@chakra-ui/react';
import MovieModal from '../components/MovieModal';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { IoReturnUpBackSharp } from 'react-icons/io5';
import useFetchMovie from '../hooks/useFetchMovie';

const PlatformGenerator = ({ page, service }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { onOpen, onClose } = useDisclosure();

    const { loading, error, movie, fetchMovie } = useFetchMovie();

    if (loading) return <Spinner size="lg" />;
    if (error) return <p>Something went wrong...</p>;

    return (
        <>
            <Link to="/" className="absolute top-6 left-6">
                <IoReturnUpBackSharp size={45} className="" />
            </Link>

            <div className="text-center">
                <h1 className="text-2xl font-semibold p-4">{page}</h1>
                <Button
                    variant="outlined"
                    colorScheme="brand"
                    onClick={(e) => {
                        setIsModalOpen(true);
                        fetchMovie(service);
                    }}
                >
                    Generate!
                </Button>
            </div>

            {isModalOpen && movie && (
                <MovieModal
                    isModalOpen={isModalOpen}
                    onClose={onClose}
                    setIsModalOpen={setIsModalOpen}
                    movie={movie}
                    isLoading={loading}
                />
            )}
        </>
    );
};
export default PlatformGenerator;
