import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Spinner,
} from '@chakra-ui/react';

// prettier-ignore
const MovieModal = ({ isModalOpen, onClose, setIsModalOpen, movie, isLoading }) => {

    return (
        <Modal isOpen={isModalOpen} onClose={onClose} isCentered size="xl">
            {!isLoading ? (
                <>
                    <ModalOverlay
                        backdropFilter="auto"
                        backdropBlur="3px"
                    />
                    <ModalContent bg="brand.100" color="brand.200">
                        <ModalBody
                            placeContent="center"
                            textAlign="center"
                            padding={4}
                            marginTop={10}
                        >
                            <>
                                <h1 className="text-lg font-bold">
                                    {movie.title || 'no title'}
                                </h1>
                                <h2 className='text-white'>
                                    {movie.overview || 'no description'}
                                </h2>
                            </>
                        </ModalBody>

                        <ModalFooter placeContent="center" paddingTop={10}>
                            <Button
                                variant="outlined"
                                colorScheme="brand"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </>
            ) : (<Spinner />)}
        </Modal>
    );
};
export default MovieModal;
