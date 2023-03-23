import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const BackButton = () => {
    return (
        <>
            <Link to="/" className="absolute top-3 left-3">
                <Button variant="outlined" colorScheme="brand">
                    Back
                </Button>
            </Link>
        </>
    );
};
export default BackButton;
