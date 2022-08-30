import React, { useContext, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Typography, Button } from "@mui/material";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventInput from "../../../components/calender/EventInput";
import Context from "../../../context/ContextProvider";
import { updateEvents } from "../../../actions/user";

const localizer = momentLocalizer(moment);

// let bdayArray = [];
// const filterContactBirthday = (contacts) => {
//   for (let i = 0; i < contacts.length; i++) {
//     if (contacts[i].birthday && contacts[i].birthday < Date.now()) {
//       bdayArray.push({
//         title: `${contacts[i].contact_name} birthday`,
//         start: new Date(`2022-${contacts[i].birthday.slice(5)}`),
//         end: new Date(`2022-${contacts[i].birthday.slice(5)}`),
//       });
//     }
//   }
// };

function BigCalender() {
  const {
    state: { currentUser, contacts },
    dispatch,
  } = useContext(Context);
  const [openEventInput, setOpenEventInput] = useState(false);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title)
      updateEvents(
        currentUser,
        {
          eventsList: [
            {
              start,
              end,
              title,
            },
          ],
        },
        dispatch
      );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h5">Event scheduling Calender</Typography>
      <Button
        variant="contained"
        onClick={() => setOpenEventInput(true)}
        sx={{ margin: "20px 0 0" }}
      >
        Add event
      </Button>
      {openEventInput && (
        <EventInput
          openEventInput={openEventInput}
          setOpenEventInput={setOpenEventInput}
        />
      )}
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        startAccessor="start"
        endAccessor="end"
        events={currentUser?.eventsList}
        style={{ height: 500, margin: "30px 50px" }}
        onSelectEvent={(event) => alert(event.title)}
        selectable={true}
        onSelectSlot={handleSelect}
      />
    </div>
  );
}

export default BigCalender;
