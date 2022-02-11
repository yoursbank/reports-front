import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

// Hook import
import { ChartsProvider } from './hooks/charts';

// Theme import
import theme from './styles/themes/default';
import GlobalStyles from './styles/global';

// Route import
import { Routes } from './routes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ChartsProvider>
          <Routes />
          <GlobalStyles />
        </ChartsProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
