import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const platforms = ['Netflix', 'Hulu', 'HBO'];

const PlatformSelection = () => {
    return (
        <div className="flex items-center justify-center p-3 gap-2">
            {platforms.map(platform => (
                <Link
                    key={platform}
                    platform={platform}
                    to={`/${platform.toLowerCase()}`}
                >
                    <Button
                        variant="custom"
                        colorScheme="brand"
                        className="m-1 w-full"
                    >
                        {platform}
                    </Button>
                </Link>
            ))}
        </div>
    );
};
export default PlatformSelection;
