import { Box, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { GET_TIMESHEETS } from "./actions/timesheetTypes";
import { checkDateInSelectedDateArray } from "./helper";
import "react-calendar/dist/Calendar.css";
import "./reactCalendar.css";
import KeyCloakService from "../../security/keycloakService";

function TimesheetManager() {
  const [date, setDate] = useState<Date>(new Date());
  const timeapproval = useSelector((state: any) => state.timesheet);
  const dispatch = useDispatch();
  const user=KeyCloakService.CallUserId()
  useEffect(() => {
    dispatch({
      type: GET_TIMESHEETS,
      timesheeet: {
        userId:user, // after getting list of user , should be able to select the user
        organizationId: 1,
      },
    });
  }, []);
  function isWeekend(date: Date) {
    const day = date.getDay();
    return day === 6 || day === 0; // Saturday or Sunday
  }

  function isTileDisabled({ view, date }: any) {
    const todayDate = new Date().getTime();
    const clickedDate = new Date(date).getTime();
    if (view === "month" && isWeekend(date)) {
      return true; // Disable the tile for weekends in month view
    } else if (clickedDate > todayDate) {
      return true;
    }
    return false;
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
        <Calendar
          value={date}
          tileClassName="react-calendar-tile-class"
          tileContent={({ date }) => {
            const statusFormFilled = checkDateInSelectedDateArray(
              timeapproval.timesheet,
              dayjs(date).format("YYYY-MM-DD")
            );

            return statusFormFilled ? (
              <Tooltip arrow title="Time sheet filled" placement="bottom">
                <p></p>
              </Tooltip>
            ) : (
              <p className="not-filled"></p>
            );
          }}
          tileDisabled={isTileDisabled}
        />
      </Box>
    </Box>
  );
}

export default TimesheetManager;
