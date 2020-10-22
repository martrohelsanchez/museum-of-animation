import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        mobile: string;
        font: {
            primary: string;
        };
    }
}

const theme: DefaultTheme = {
    mobile: '700px',
    font: {
        primary: "Calibri, 'Gill Sans', 'Gill Sans MT', 'Trebuchet MS', sans-serif"
    }
}

export default theme;