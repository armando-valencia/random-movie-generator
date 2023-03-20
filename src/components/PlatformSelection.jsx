import { Link } from 'react-router-dom';

const platforms = ['Netflix', 'Hulu', 'HBO'];

const PlatformSelection = () => {
    return (
        <>
            <div className="flex flex-col items-center p-2">
                {platforms.map((platform) => (
                    <Link
                        key={platform}
                        platform={platform}
                        className="w-1/3 m-2 p-2 rounded-full border border-white text-white hover:border-[#31f610]  hover:text-[#31f610]"
                        to={`/${platform.toLowerCase()}`}
                    >
                        {platform}
                    </Link>
                ))}
            </div>
        </>
    );
};
export default PlatformSelection;
