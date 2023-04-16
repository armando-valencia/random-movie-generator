import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Spinner,
} from '@chakra-ui/react';

let movieTitle;
let movieDesc;

// prettier-ignore
const MovieModal = ({ isModalOpen, onClose, setIsModalOpen, data, isLoading }) => {
    if (data !== null) {
        let movieIndex = data[Math.floor(Math.random() * data.length)];
        movieTitle = movieIndex.title;
        movieDesc = movieIndex.overview;
    }

    return (
        <>
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
                                {data !== null && (
                                    <>
                                        <h1 className="text-lg font-bold">
                                            {movieTitle}
                                        </h1>
                                        <h2 className='text-white'>
                                            {movieDesc}
                                        </h2>
                                    </>
                                )}
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
        </>
    );
};
export default MovieModal;
