import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import FormModal from "../../components/FormModal";
import { Box } from "@mui/system";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./reactCalendar.css";
import { Typography, Tooltip } from "@mui/material";
import { checkDateInSelectedDateArray } from "./helper";
import TimesheetData from "./timesheetInterface";
import { GET_TIMESHEETS } from "./actions/timesheetTypes";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingStart } from "./reducers/timesheetSlice";
import KeyCloakService from "../../security/keycloakService";

export default function TimesheetPage() {
  const ts = useSelector((state: any) => state.timesheet);
  const isLoading = useSelector((state: any) => state.isLoading);
  const isError = useSelector((state: any) => state.error);
  const dispatch = useDispatch();
  const userId = KeyCloakService.CallUserId();
  const orgId = KeyCloakService.CallOrganizationId();

  useEffect((): any => {
    dispatch({
      type: GET_TIMESHEETS,
      timesheeet: { userId: userId, organizationId: orgId },
    });
  }, []);

  const getSelectedDateArray = ts.timesheet;

  const [date, setDate] = useState<Date>(new Date());
  const [formatedDate, setFormatedDate] = useState("");
  const [dateSelectedStatus, setDateSelectedStatus] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedDateArray, setSelectedDateArray] =
    useState<any>(getSelectedDateArray);
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
  useEffect(() => {
    setSelectedDateArray(getSelectedDateArray);
  }, [selectedDateArray, getSelectedDateArray]);

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
            setSelectedDate(dayjs(value).format("YYYY-MM-DD"));
            setDateSelectedStatus(true);
          }}
          value={date}
          tileClassName="react-calendar-tile-class"
          onClickDay={(date, event: any) => {
            const statusFormFilled = checkDateInSelectedDateArray(
              selectedDateArray,
              dayjs(date).format("YYYY-MM-DD")
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
          }}
          tileContent={({ date }) => {
            const statusFormFilled = checkDateInSelectedDateArray(
              selectedDateArray,
              dayjs(date).format("YYYY-MM-DD")
            );
            return statusFormFilled ? (
              <Tooltip arrow title="Time sheet filled" placement="bottom">
                <p> </p>
              </Tooltip>
            ) : null;
          }}
          tileDisabled={isTileDisabled}
        />
      </Box>
      <FormModal
        dateSelectedStatus={dateSelectedStatus}
        dateSelected={selectedDate}
        setDateSelectedStatus={(value: boolean) => setDateSelectedStatus(value)}
        formattedDate={formatedDate}
        setSelectedDateArray={setSelectedDateArray}
        selectedDateArray={selectedDateArray}
        setSelectedDate={(value: string) => {
          setSelectedDate(value);
        }}
      />
    </Box>
  );
}
