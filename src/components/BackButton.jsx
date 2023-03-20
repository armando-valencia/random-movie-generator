import { Link } from 'react-router-dom';

const BackButton = () => {
    return (
        <>
            <Link
                to="/"
                className="m-2 py-2 px-5 rounded border border-white text-white hover:border-[#31f610]  hover:text-[#31f610] absolute top-3 left-3"
            >
                Back
            </Link>
        </>
    );
};
export default BackButton;
