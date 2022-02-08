import { ThemeProvider } from 'styled-components';

// Theme import
import theme from './styles/themes/default';
import GlobalStyles from './styles/global';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
