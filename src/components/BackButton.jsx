import { Link } from 'react-router-dom';
import { IoReturnUpBackSharp } from 'react-icons/io5';

const BackButton = () => {
    return (
        <Link to="/" className="absolute top-6 left-6">
            <IoReturnUpBackSharp size={45} className="" />
        </Link>
    );
};
export default BackButton;
