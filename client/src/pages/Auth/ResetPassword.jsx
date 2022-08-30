import {
  Container,
  Card,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { React, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../actions/user";
import Context from "../../context/ContextProvider";

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
};

const flexProp = {
  height: "100vh",
  width: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const ResetPassword = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const {
    state: { currentUser },
    dispatch,
  } = useContext(Context);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    const confirmpassword = confirmPasswordRef.current.value;
    resetPassword(currentUser, { password, confirmpassword }, id, dispatch);
  };

  return (
    <Box sx={container}>
      <Box component="div" sx={flexProp}>
        <Typography component="div" variant="h5" sx={{ fontWeight: "600" }}>
          Reset Password
        </Typography>
        <form style={{ width: "75%" }} onSubmit={formSubmitHandler}>
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            inputRef={passwordRef}
            required
            margin="normal"
            fullWidth
          />
          <TextField
            label="Confirm Password"
            type="password"
            placeholder="Enter Confirm Password"
            required
            inputRef={confirmPasswordRef}
            margin="normal"
            fullWidth
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
            Confirm
          </Button>
        </form>
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

export default ResetPassword;
