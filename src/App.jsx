import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import InboxPage from './pages/InboxPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage'; 
import WalksPage from './pages/WalksPage';
import Navbar from './components/Navbar';
import IsPrivate from './components/IsPrivate';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inbox" element={<IsPrivate> <InboxPage/> </IsPrivate>} />
        <Route path="/profile/:userId" element={<IsPrivate> <UserPage/> </IsPrivate>} />
        <Route path="/*" element={<ErrorPage />} />
        <Route path="/signup" element={ <SignupPage /> } />
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/walks" element={ <WalksPage /> } />
      </Routes> 
    </ThemeProvider>
  );
}

export default App;