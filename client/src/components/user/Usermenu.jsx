import {
  Avatar,
  IconButton,
  Tooltip,
  Box,
  Badge,
  Menu,
  MenuItem,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Dashboard,
  Notifications,
  Logout,
  Settings,
} from "@mui/icons-material";
import { React, useContext, useState } from "react";
import Context from "../../context/ContextProvider";
import user from "./../../user-3.jpg";
import { useNavigate } from "react-router-dom";
import { logout } from "./../../actions/user";

const Usermenu = () => {
  const navigate = useNavigate();
  const ctx = useContext(Context);
  const { currentUser, profile } = ctx.state;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout(currentUser, ctx.dispatch);
  };

  return (
    <>
      <Box>
        <IconButton size="large" color="inherit">
          <Badge color="error" badgeContent={2}>
            <Notifications />
          </Badge>
        </IconButton>
        <Tooltip title="Open user settings">
          <IconButton onClick={handleClick}>
            <Avatar src={currentUser.photo} alt={currentUser?.name}></Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 38,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 12,
                width: 12,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={() =>
              ctx.dispatch({
                type: "UPDATE_PROFILE",
                payload: { ...profile, open: true },
              })
            }
          >
            <ListItem>
              <Settings fontSize="small" />
            </ListItem>
            Profile
          </MenuItem>
          <MenuItem onClick={() => navigate("/dashboard")}>
            <ListItemText>
              <Dashboard fontSize="small" />
            </ListItemText>
            Dashboard
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItem>
              <Logout fontSize="small" />
            </ListItem>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default Usermenu;
