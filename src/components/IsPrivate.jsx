import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import { CircularProgress, Box } from '@mui/material';

function IsPrivate( { children } ) {
  
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) 
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        </Box>
  );

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default IsPrivate;
