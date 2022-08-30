import React, { useContext, useEffect } from "react";
import { ContactPage, Group, Visibility } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import moment from "moment";
import Context from "../../../context/ContextProvider";
import { getAllUsers } from "../../../actions/user";
import { getAllContacts, getContactsCategory } from "../../../actions/contacts";
import PieContactType from "./PieContactType";
import Calender from "../../../components/calender/Calender";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const objectComparisonCallback = (arrayItemA, arrayItemB) => {
  if (arrayItemA.created_at > arrayItemB.created_at) {
    return -1;
  }
  if (arrayItemA.created_at < arrayItemB.created_at) {
    return 1;
  }
  return 0;
};
const Main = () => {
  const {
    state: { currentUser, users, contacts, contactsCategory },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    if (users.length === 0) getAllUsers(currentUser, dispatch);
    if (contacts.length === 0) getAllContacts(currentUser, dispatch);
    if (contactsCategory.length === 0) {
      getContactsCategory(currentUser, dispatch);
    }
  }, [currentUser, users, contacts]);

  return (
    <Box
      sx={{
        display: { sm: "flex", md: "grid" },
        gridTemplateColumns: "1fr 1fr 1fr 1.4fr",
        gridAutoRows: "minmax(100px, auto)",
        gap: 3,
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Paper elevation={3} sx={{ p: 2, background: "#00C49F" }}>
        <Typography variant="h5">Total Users</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Group sx={{ height: 90, width: 90, opacity: 0.3, mr: 1 }} />
          <Typography variant="h5">{users.length}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, background: "#0088FE" }}>
        <Typography variant="h5">Total Contacts</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ContactPage sx={{ height: 90, width: 90, opacity: 0.3, mr: 1 }} />
          <Typography variant="h5">55</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, background: "#FFBB28" }}>
        <Typography variant="h5">Daily Visitors</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Visibility sx={{ height: 90, width: 90, opacity: 0.3, mr: 1 }} />
          <Typography variant="h5">104</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: 4, gridRow: "1/4" }}>
        <Box>
          <Typography>Recently added Users</Typography>
          <List>
            {[...users]
              .sort(objectComparisonCallback)
              .slice(0, 4)
              .map((user, i) => (
                <Box key={user._id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt={user?.name} src={user?.photo} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user?.name}
                      secondary={`Time Created: ${moment(
                        user?.created_at
                      ).format("YYYY-MM-DD H:mm:ss")}`}
                    />
                  </ListItem>
                  {i !== 3 && <Divider variant="inset" />}
                </Box>
              ))}
          </List>
        </Box>
        <Divider sx={{ mt: 1, mb: 2, opacity: 0.7 }} />
        <Box>
          <Typography>Recently added Contacts</Typography>
          <List>
            {[...contacts]
              .sort(objectComparisonCallback)
              .slice(0, 4)
              .map((contacts) => (
                <Box key={contacts._id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt={contacts?.contact_name} variant="rounded">
                        {contacts?.contact_name[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={contacts?.contact_name}
                      secondary={`Added: ${moment(
                        contacts?.created_at
                      ).fromNow()}`}
                    />
                  </ListItem>
                </Box>
              ))}
          </List>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: "1/4" }}>
        {contacts.length > 0 ? <PieContactType /> : ""}
      </Paper>
      <Box
        sx={{
          display: { xm: "flex", sm: "grid" },
          gridTemplateColumns: "1fr 1fr",
          gridAutoRows: "minmax(100px, auto)",
          gap: 3,
          textAlign: "center",
          flexDirection: "column",
          gridColumn: "1/4",
        }}
      >
        <Paper elevation={3}>
          <Calender />
        </Paper>
        <Paper elevation={3} sx={{ p: 1 }}>
          <Typography>Events List</Typography>
          {currentUser?.eventsList.length > 0
            ? currentUser?.eventsList.slice(0, 4).map((event) => (
                <Box
                  key={event.title}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <ListItem sx={{ padding: "2px 8px" }}>
                    <ListItemAvatar>
                      <NotificationsActiveIcon />
                    </ListItemAvatar>
                    <ListItemText
                      primary={event?.title}
                      secondary={`Deadline: ${moment(event?.end).fromNow()}`}
                    />
                  </ListItem>
                </Box>
              ))
            : "No events"}
        </Paper>
      </Box>
    </Box>
  );
};

export default Main;
