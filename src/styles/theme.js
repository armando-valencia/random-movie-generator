import { extendTheme } from '@chakra-ui/react';
import { buttonTheme } from './components/Button';

export const theme = extendTheme({
    colors: {
        brand: {
            100: '#2C3333', // shade of gray
            200: '#31f610', // neon green
        },
    },
    components: {
        Button: buttonTheme,
    },
});
