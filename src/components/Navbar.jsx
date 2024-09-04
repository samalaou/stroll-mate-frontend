import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button component={Link} to="/" color="inherit">
            Stroll Mate
          </Button>
        </Typography>

        {isLoggedIn ? (
          <>
            <Button color="inherit" onClick={logOutUser}>Logout</Button>
            <Typography variant="body1" sx={{ marginLeft: 2 }}>
              {user && user.name}
            </Typography>
          </>
        ) : (
          <>
            <Button component={Link} to="/signup" color="inherit">
              Sign Up
            </Button>
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
