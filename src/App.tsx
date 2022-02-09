import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

// Theme import
import theme from './styles/themes/default';
import GlobalStyles from './styles/global';

// Route import
import { Routes } from './routes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes />
        <GlobalStyles />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
