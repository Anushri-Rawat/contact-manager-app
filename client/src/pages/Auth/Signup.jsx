import {
  Container,
  Card,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { React, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../actions/user";
import Context from "../../context/ContextProvider";

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
};

const flexProp = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const Signup = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const nameRef = useRef();
  const { state, dispatch } = useContext(Context);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    register({ name, email, password, confirmPassword }, dispatch);
  };

  return (
    <Container sx={container}>
      <Card sx={{ display: "flex", width: "75%", height: "65vh" }}>
        <Box
          component="div"
          sx={{
            width: "45%",
            background: "black",
            color: "white",
            textAlign: "center",
            ...flexProp,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Welcome to Connect!!
          </Typography>
          <p>Already have an account?</p>
          <Button
            size="medium"
            sx={{
              background: "white",
              color: "black",
              "&:hover": { backgroundColor: "#1976d2" },
            }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </Box>
        <Box
          component="div"
          sx={{
            width: "55%",
            ...flexProp,
          }}
        >
          <Typography component="div" variant="h5" sx={{ fontWeight: "600" }}>
            Sign up
          </Typography>
          <form style={{ width: "75%" }} onSubmit={formSubmitHandler}>
            <TextField
              label="Username"
              type="text"
              size="small"
              placeholder="Enter username"
              required
              inputRef={nameRef}
              margin="dense"
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              size="small"
              placeholder="Enter username"
              required
              inputRef={emailRef}
              margin="dense"
              fullWidth
            />
            <TextField
              label="Password"
              placeholder="Enter password"
              type="password"
              size="small"
              inputRef={passwordRef}
              required
              margin="dense"
              fullWidth
            />
            <TextField
              label="Confirm Password"
              placeholder="Enter password"
              type="password"
              size="small"
              inputRef={confirmPasswordRef}
              required
              margin="dense"
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
              Signup
            </Button>
          </form>
        </Box>
      </Card>
    </Container>
  );
};

export default Signup;
