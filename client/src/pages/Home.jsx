import { useNavigate } from "react-router-dom";
import MainAppbar from "../components/Navbar";
import { Typography, Button } from "@mui/material";
import { Container } from "@mui/system";
import { useContext } from "react";
import Context from "../context/ContextProvider";

const Home = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Context);
  return (
    <>
      <MainAppbar />
      <Container
        maxWidth="sm"
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Welcome to Connect!!</Typography>
        <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
          Connect gives you everything you need to organize your contacts. Build
          relationships, find opportunities, and reach your goals.
        </Typography>
        <Button
          variant="contained"
          size="medium"
          sx={{ background: "black" }}
          onClick={() => navigate("/signup")}
        >
          Signup
        </Button>
      </Container>
    </>
  );
};

export default Home;
