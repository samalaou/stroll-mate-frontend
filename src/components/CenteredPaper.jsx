import { Box, Paper, Typography, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';

const CenteredPaper = ({ title, linkText, linkTo, linkTitle, openSnackbar, errorMessage, handleCloseSnackbar, children }) => {
  console.log(linkTo)
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
      }}
    >
      <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" align="center" gutterBottom>
          {title}
        </Typography>

        {children}

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          {linkText}{" "}

          <Link to={linkTo}>{linkTitle}</Link>
        </Typography>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={errorMessage}
        />
      </Paper>
    </Box>
  );
};

export default CenteredPaper;
