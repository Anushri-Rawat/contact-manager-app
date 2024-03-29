import {
  Container,
  Card,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Link,
  Box,
} from "@mui/material";
import { React, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword, login } from "../../actions/user";
import Context from "../../context/ContextProvider";

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  padding: "0px",
};

const flexProp = {
  width: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "100vh",
};

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const {
    state: { currentUser },
    dispatch,
  } = useContext(Context);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    login({ email, password }, dispatch);
  };

  const forgotPasswordHandler = () => {
    const email = emailRef.current.value;
    forgotPassword(currentUser, { email }, dispatch);
  };

  return (
    <Box sx={container}>
      <Box component="div" sx={flexProp}>
        <Typography component="div" variant="h5" sx={{ fontWeight: "600" }}>
          Login
        </Typography>
        <form style={{ width: "75%" }} onSubmit={formSubmitHandler}>
          <TextField
            label="Email"
            type="email"
            placeholder="Enter email"
            required
            inputRef={emailRef}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            inputRef={passwordRef}
            required
            margin="normal"
            fullWidth
          />
          <FormControlLabel
            component="div"
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              color: "white",
              background: "black",
              margin: "5px 0 10px",
            }}
            fullWidth
          >
            Login
          </Button>
        </form>
        <Typography>
          <Link onClick={forgotPasswordHandler}>Forgot password ?</Link>
        </Typography>
      </Box>
      <Box
        component="div"
        sx={{
          background: "black",
          color: "white",
          textAlign: "center",
          ...flexProp,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Welcome to Connect!!
        </Typography>
        <p>Don't have an account?</p>
        <Button
          size="medium"
          sx={{
            background: "white",
            color: "black",
            "&:hover": { backgroundColor: "#1976d2" },
          }}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
