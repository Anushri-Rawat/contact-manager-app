import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Button,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EventInput.css";
import Context from "../../context/ContextProvider";
import { updateEvents } from "../../actions/user";

const EventInput = ({ openEventInput, setOpenEventInput }) => {
  const {
    state: { currentUser, eventsList },
    dispatch,
  } = useContext(Context);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

  function handleAddEvent() {
    updateEvents(currentUser, { eventsList: [newEvent] }, dispatch);
  }

  return (
    <Dialog open={openEventInput} onClose={() => setOpenEventInput(false)}>
      <DialogTitle>
        Add Event
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={() => setOpenEventInput(false)}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          autoFocus
          margin="normal"
          label="Event Name"
          type="text"
          size="small"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          fullWidth
          required
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{ whiteSpace: "nowrap", marginRight: "8px" }}
          >
            Start Date and Time
          </Typography>
          <DatePicker
            selected={newEvent.start}
            onChange={(start) => {
              setNewEvent({ ...newEvent, start });
            }}
            minDate={new Date()}
            required
            // style={{
            //   padding: "4px 0 5px!important",
            //   height: "1.4375em!important",
            // }}
          />
          <TextField
            type="time"
            margin="normal"
            label="Start time"
            size="small"
            InputLabelProps={{ shrink: true, required: true }}
            fullWidth
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{ whiteSpace: "nowrap", marginRight: "10px" }}
          >
            End Date and Time
          </Typography>
          <DatePicker
            selected={newEvent.end}
            onChange={(end) => {
              setNewEvent({ ...newEvent, end });
            }}
            required
            minDate={new Date()}
          />
          <TextField
            type="time"
            margin="normal"
            label="End time"
            size="small"
            InputLabelProps={{ shrink: true, required: true }}
            fullWidth
          />
        </Box>
        <Button
          variant="contained"
          onClick={handleAddEvent}
          sx={{ justifyContent: "flex-end" }}
        >
          Add Event
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EventInput;
