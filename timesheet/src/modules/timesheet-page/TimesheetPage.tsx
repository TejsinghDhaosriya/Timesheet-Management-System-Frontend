import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import FormModal from "../../components/FormModal";
import { Box } from "@mui/system";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./reactCalendar.css";
import { Typography, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";

const TimesheetPage = () => {
  const getSelectedDateArray = useSelector<any>((state)=>state?.timesheet?.timesheetData);
  const [date, setDate] = useState<Date>(new Date());
  const [formatedDate, setFormatedDate] = useState("");
  const [dateSelectedStatus, setDateSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedDateArray, setSelectedDateArray] = useState<any>(getSelectedDateArray);
  //--------------------------------------------------------
  //--------------------------------------------------------

  function checkDateInSelectedDateArray(dateString: string) {
    const isDatePresent = selectedDateArray.filter((selDate:any) => {
      return selDate.date === dateString;
    });
    return isDatePresent.length === 1;
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
          onClickDay={(date, event: any) => {
            const statusFormFilled = checkDateInSelectedDateArray(
              dayjs(date).format("DD/MM/YYYY")
            );
            const todayDate = new Date().getTime();
            const clickedDate = new Date(date).getTime();
            if (statusFormFilled) {
              event.target
                .closest(
                  "button.react-calendar__tile.react-calendar__month-view__days__day.react-calendar-tile-class"
                )
                .classList.add("timesheet-filled");
            }
            if(clickedDate>todayDate){
              event.target
              .closest(
                "button.react-calendar__tile.react-calendar__month-view__days__day.react-calendar-tile-class"
              )
              .classList.add("future-date-disabled");
            }
            
          }}
          tileContent={({ date }) => {
            //console.log(date,"caledar-date")
            const statusFormFilled = checkDateInSelectedDateArray(
              dayjs(date).format("DD/MM/YYYY")
            );
            return statusFormFilled ? (
              <Tooltip arrow title="Time sheet filled" placement="bottom">
                <p> </p>
              </Tooltip>
            ) : null;
          }}
        />
      </Box>
      <FormModal
        dateSelectedStatus={dateSelectedStatus}
        dateSelected={selectedDate}
        setDateSelected={(value: boolean) => setDateSelected(value)}
        formattedDate={formatedDate}
        setSelectedDateArray={setSelectedDateArray}
        selectedDateArray={selectedDateArray}
      />
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {selectedDateArray.map((info:any, idx:number) => {
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
              <li>
                Start Time : {dayjs(timesheetInfo.startTime).format("hh:mm a")}
              </li>
              <li>
                End Time : {dayjs(timesheetInfo.endTime).format("hh:mm a")}
              </li>
              <li>Overtime Hours: {timesheetInfo.overTime}</li>
            </div>
          );
        })}
      </Box>
    </Box>
  );
};

export default TimesheetPage;
