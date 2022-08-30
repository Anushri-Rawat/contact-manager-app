import { useState } from "react";
import Calendar from "react-calendar";
import "./Calender.css";
import moment from "moment";

const mark = ["1-08-2002", "2-08-2022", "05-08-2022"];
function Calender() {
  return (
    <>
      <Calendar
        tileClassName={({ date, view }) => {
          if (mark.find((x) => x === moment(date).format("DD-MM-YYYY"))) {
            return "highlight";
          }
        }}
      />
    </>
  );
}

export default Calender;
