import { createGlobalStyle } from 'styled-components';
import theme from './styles';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.colors.background};
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif; /* Add your preferred font-family here */
  }
`;

export default GlobalStyle;
