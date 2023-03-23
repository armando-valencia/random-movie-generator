import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({
    borderRadius: 0,
    fontWeight: 'normal',
    fontFamily: 'mono',
});

const customButton = defineStyle(props => {
    const { colorScheme: c } = props;
    return {
        bg: `${c}.100`,
        color: `${c}.200`,
        borderRadius: 'xl',
        transition: 'transform 0.15s ease-out, background 0.15s ease-out',

        _hover: {
            transform: 'scale(1.05, 1.05)',
            bg: `${c}.200`,
            color: `${c}.100`,
        },

        _active: {
            bg: `${c}.100`,
            color: `${c}.200`,
            transform: 'scale(1, 1)',
        },
    };
});

const outlinedButton = defineStyle(props => {
    const { colorScheme: c } = props;
    return {
        bg: `transparent`,
        color: `${c}.200`,
        borderRadius: 'xl',
        borderColor: `${c}.200`,
        border: '2px solid',
        transition: 'transform 0.15s ease-out, background 0.15s ease-out',

        _hover: {
            transform: 'scale(1.05, 1.05)',
        },

        _active: {
            bg: `${c}.200`,
            color: `${c}.100`,
            transform: 'scale(1, 1)',
        },
    };
});

export const buttonTheme = defineStyleConfig({
    baseStyle,
    variants: {
        custom: customButton,
        outlined: outlinedButton,
    },
});
