import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
} from '@chakra-ui/react';

const MovieModal = ({ isModalOpen, onClose, setIsModalOpen }) => {
    let movieTitle;
    let movieDesc;

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
                        <h1>{movieTitle ? movieTitle : 'test title'}</h1>
                        <h2>{movieDesc ? movieDesc : 'test desc'}</h2>
                    </ModalBody>

                    <ModalFooter placeContent="center" paddingTop={10}>
                        <Button
                            variant="outlined"
                            colorScheme="brand"
                            onClick={e => setIsModalOpen(false)}
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
