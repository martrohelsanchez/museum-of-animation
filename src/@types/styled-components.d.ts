import defaultTheme from 'src/theme';

type CustomDefautlTheme = typeof defaultTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends CustomDefautlTheme {}
}
