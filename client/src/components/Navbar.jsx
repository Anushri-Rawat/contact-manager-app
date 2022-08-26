import { React, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LinkIcon from "@mui/icons-material/Link";
import { useNavigate } from "react-router-dom";
import Context from "../context/ContextProvider";
import Usermenu from "./user/Usermenu";

export default function Navbar() {
  const navigate = useNavigate();
  const ctx = useContext(Context);
  const { currentUser } = ctx.state;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: "black" }}>
        <Toolbar>
          <Typography variant="h5" component="h1" noWrap sx={{ mr: 1 }}>
            Connect
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            component="div"
            sx={{ flexGrow: 1, justifyContent: "flex-start" }}
          >
            <LinkIcon />
          </IconButton>
          {!currentUser ? (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          ) : (
            <Usermenu />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
