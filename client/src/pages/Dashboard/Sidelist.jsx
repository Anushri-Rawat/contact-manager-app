import {
  ChevronLeft,
  Logout,
  Dashboard,
  PermContactCalendar,
  PeopleAlt,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import React from "react";
import { useContext, useState } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import Context from "../../context/ContextProvider";
import Main from "./Main/Main";
import { logout } from "./../../actions/user";
import ContactsInfo from "./Contacts/ContactsInfo";
import UserInfo from "./Users/UserInfo";
import AddContactForm from "./Contacts/AddContactForm";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DrawerHeading = styled("div")(({ theme }) => ({
  position: "relative",
  left: "-60px",
  fontSize: "24px",
  fontWeight: 800,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const list = [
  {
    title: "Main",
    icon: <Dashboard />,
    link: "",
    component: <Main />,
  },
  {
    title: "Users",
    icon: <PeopleAlt />,
    link: "users",
    component: <UserInfo />,
  },
  {
    title: "Contacts",
    icon: <PermContactCalendar />,
    link: "contacts",
    component: <ContactsInfo />,
  },
];

const Sidelist = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Context);
  const { currentUser } = state;
  const handleLogout = () => {
    logout(currentUser, dispatch);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <DrawerHeading>Connect</DrawerHeading>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {list.map((item) => (
            <ListItem key={item.title} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => navigate(item.link)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ mx: "auto", mt: 3, mb: 1 }}>
          <Tooltip title="xyz">
            <Avatar
              src={currentUser?.photo}
              {...(open && { sx: { width: 100, height: 100 } })}
            />
          </Tooltip>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          {open && <Typography>{currentUser?.name}</Typography>}
          <Typography variant="body2">{currentUser?.role || "role"}</Typography>
          {open && (
            <Typography variant="body2">{currentUser?.email}</Typography>
          )}
          <Tooltip title="Logout" sx={{ mt: 1 }}>
            <IconButton onClick={handleLogout}>
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          {list.map((item) => (
            <Route key={item.title} path={item.link} element={item.component} />
          ))}
          <Route path="/contacts/createForm" element={<AddContactForm />} />
        </Routes>
      </Box>
    </>
  );
};

export default Sidelist;
