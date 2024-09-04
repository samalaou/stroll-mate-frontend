import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import CenteredPaper from "../components/CenteredPaper";
import authService from "../services/auth.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };

    authService.signup(requestBody)
      .then((response) => {
        console.log(response);
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        setOpenSnackbar(true);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <CenteredPaper
      title="Sign Up"
      linkText="Already have an account?"
      linkTo="/login"
      linkTitle="Login"
      openSnackbar={openSnackbar}
      errorMessage={errorMessage}
      handleCloseSnackbar={handleCloseSnackbar}
    >
      <form onSubmit={handleSignupSubmit} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={handleEmail}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={handlePassword}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Name"
          type="text"
          value={name}
          onChange={handleName}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
      </form>
    </CenteredPaper>
  );
}

export default SignupPage;
