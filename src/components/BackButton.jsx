import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { IoReturnUpBackSharp } from 'react-icons/io5';

const BackButton = () => {
    return (
        <Link to="/" className="absolute top-6 left-6">
            {/* <Button variant="outlined" colorScheme="brand"> */}
            <IoReturnUpBackSharp size={35} className="" />
            {/* </Button> */}
        </Link>
    );
};
export default BackButton;
