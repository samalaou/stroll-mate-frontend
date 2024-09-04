import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes> 
    </ThemeProvider>
  );
}

export default App;