import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const BackButton = () => {
    return (
        <Link to="/" className="absolute top-6 left-6">
            <Button variant="outlined" colorScheme="brand">
                Back
            </Button>
        </Link>
    );
};
export default BackButton;
