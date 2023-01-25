import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import FormModal from "../../components/FormModal";
import { Box } from "@mui/system";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./reactCalendar.css";
import { Button, Typography } from "@mui/material";

const TimesheetPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [formatedDate, setFormatedDate] = useState("");
  const [dateSelected, setDateSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedDateArray, setSelectedDateArray] = useState([
    {
      date: "02/01/2023",
      timesheetInfo: {
        description: "Solved responsive issue",
        startTime: 0,
        endTime: 0,
        overTime: 0,
      },
      timeSheetSubmitted: false,
    },
    {
      date: "10/01/2023",
      timesheetInfo: {
        description: "Solved responsive issue on something",
        startTime: 0,
        endTime: 0,
        overTime: 0,
      },
      timeSheetSubmitted: false,
    },
    {
      date: "13/01/2023",
      timesheetInfo: {
        description: "Worked on Navbar, sidebar",
        startTime: 0,
        endTime: 0,
        overTime: 0,
      },
      timeSheetSubmitted: false,
    },
  ]);
  //--------------------------------------------------------
  //--------------------------------------------------------

  function checkDateInSelectedDateArray(dateString: string) {
    const isDatePresent = selectedDateArray.filter((selDate) => {
      return selDate.date === dateString;
    });
    return isDatePresent.length === 1 ? true : false;
  }
  return (
    <Box sx={{ marginTop: "70px" }} className="time-sheet-page-container">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Time Sheet </Typography>
        <Calendar
          onChange={(value: Date) => {
            setSelectedDate(dayjs(value).format("DD/MM/YYYY"));
            setDateSelected(true);
          }}
          value={date}
          tileClassName="react-calendar-tile-class"
          tileContent={({date}) => {
            const statusFormFilled = checkDateInSelectedDateArray(dayjs(date).format("DD/MM/YYYY"))
            return statusFormFilled?<p style={{position:"absolute",background:'red',right: "3rem",transform:"scale(1.5)"}}>.</p>:null;
          }}
        />
      </Box>
      <FormModal
        openStatus={dateSelected}
        dateSelected={selectedDate}
        setDateSelected={(value: boolean) => setDateSelected(value)}
        formattedDate={formatedDate}
        setSelectedDateArray={setSelectedDateArray}
        selectedDateArray={selectedDateArray}
      />
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {selectedDateArray.map((info, idx) => {
          const { timesheetInfo } = info;
          return (
            <div
              key={`${timesheetInfo.description}`}
              style={{
                border: "2px solid black",
                width: 200,
                margin: "10px",
                listStyle: "none",
                padding: "10px",
              }}
            >
              <li>Date : {info.date}</li>
              <li>Description : {timesheetInfo.description}</li>
              <li>Start Time : {dayjs(timesheetInfo.startTime).format('hh:mm a')}</li>
              <li>End Time : {dayjs(timesheetInfo.endTime).format('hh:mm a')}</li>
              <li>Overtime Hours: {timesheetInfo.overTime}</li>
            </div>
          );
        })}
      </Box>
    </Box>
  );
};

export default TimesheetPage;
