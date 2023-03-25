import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
} from '@chakra-ui/react';

let movieTitle;
let movieDesc;

const MovieModal = ({ isModalOpen, onClose, setIsModalOpen, data }) => {
    if (data !== null) {
        let movieIndex = data[Math.floor(Math.random() * data.length)];
        movieTitle = movieIndex.title;
        movieDesc = movieIndex.overview;
    }

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={onClose} isCentered size="xl">
                <ModalOverlay backdropFilter="auto" backdropBlur="3px" />
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
                                    {movieTitle ? movieTitle : 'test title'}
                                </h1>
                                <h2>{movieDesc ? movieDesc : 'test desc'}</h2>
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
            </Modal>
        </>
    );
};
export default MovieModal;
