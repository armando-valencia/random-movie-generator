import { extendTheme } from '@chakra-ui/react';
import { buttonTheme } from './components/Button';

export const theme = extendTheme({
    colors: {
        brand: {
            100: '#2C3333', // shade of gray
            200: '#00ffff', // neon blue
        },
        active: {
            100: '#00ffff', // neon blue
            200: '#2C3333', // shade of gray
        },
    },
    components: {
        Button: buttonTheme,
    },
});
