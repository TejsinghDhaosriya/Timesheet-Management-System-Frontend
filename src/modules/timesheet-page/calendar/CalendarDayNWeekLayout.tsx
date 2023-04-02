import { Grid, Tooltip } from "@mui/material";
import { format } from "date-fns";
import dayjs from "dayjs";
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  approval_completed_color,
  approval_pending_color,
  approval_rejected_color,
  timesheet_completed_color,
  timesheet_disabled_color,
} from "../../../utils/constants";
import {
  checkDateInSelectedDateArray,
  checkStatusApprovedOrRejected,
  getOnlyApprovalsList,
  isFutureDate,
  isTileDisabled,
} from "../helper";
import { CalendarContext } from "./CalendarContext";

const CalendarDayNWeekLayout = (props: any) => {
  const { selectedWeekIndex, selectedWeek, module } = props;
  useEffect(() => {
    //console.log('selectedweek changes',selectedWeek)
  }, [selectedWeek, selectedWeekIndex]);
  const { stateCalendar, setStateCalendar } = useContext(CalendarContext);
  const { selectedDate, layout, defaultEventDuration, draggingEventId } =
    stateCalendar;
  const viewLayout = Array.from(
    Array(layout === "week" ? 7 : layout === "day" ? 1 : 0).keys()
  );
  const timesheetData = useSelector((state: any) => state.timesheet);

  const selectedDateArray = timesheetData.timesheet;

  const approvedTimesheetDates = useSelector((state: any) => state.approvals);
  const statusTimesheetData = getOnlyApprovalsList(approvedTimesheetDates);
  //console.log(statusTimesheetData);
  
  return (
    <div style={{ display: "flex" }}>
      {module === "timesheet" &&
        viewLayout.map((index: any) => {
          const day = layout === "week" ? selectedWeek[index] : selectedDate;
          const isToday =
            format(day, "ddMMyyyy") === format(new Date(), "ddMMyyyy");
          const isDateDisabled = isTileDisabled({ view: "month", date: day });
          const isDateFuture = isFutureDate(day);
          const statusFormFilled = checkDateInSelectedDateArray(
            selectedDateArray,
            dayjs(day).format("YYYY-MM-DD")
          );
          return (
            <Grid
              item
              xs
              id={`day${index + 1}`}
              data-group="day-column"
              data-date={day}
              key={`board-day-column-${layout}-${selectedWeekIndex}-${day}-${index}`}
              style={{
                borderBottom: "1px solid #dadce0",
                border: "1px solid #dadce0",
                textAlign: "center",
                borderRadius: 0,
                minWidth: 64.38,
                height: "100%",
                padding: "20px",
              }}
              onClick={() => {
                if (!(isDateDisabled && isDateFuture)) {
                  props.setSelectedDate(dayjs(day).format("YYYY-MM-DD"));
                  props.setDateSelectedStatus(true);
                }
              }}
              data-testid="calendar-tile"
              sx={
                isDateDisabled || isDateFuture
                  ? {
                      background: `${timesheet_disabled_color}`,
                      cursor: "not-allowed",
                      pointerEvents: "none",
                    }
                  : { cursor: "pointer" }
              }
            >
              <Tooltip title={statusFormFilled ? "Time sheet Filled" : ""}>
                <span
                  style={
                    statusFormFilled
                      ? {
                          cursor: "pointer",
                          background: `${timesheet_completed_color}`,
                          padding: "5px 10px",
                          borderRadius: "50%",
                        }
                      : { cursor: "pointer" }
                  }
                >
                  {day.getDate()}
                </span>
              </Tooltip>
            </Grid>
          );
        })}

      {module === "approvals" &&
        viewLayout.map((index: any) => {
          const day = layout === "week" ? selectedWeek[index] : selectedDate;
          const isToday =
            format(day, "ddMMyyyy") === format(new Date(), "ddMMyyyy");
          const isDateDisabled = isTileDisabled({ view: "month", date: day });
          const isDateFuture = isFutureDate(day);
          const statusFormFilled = checkDateInSelectedDateArray(
            selectedDateArray,
            dayjs(day).format("YYYY-MM-DD")
          );
          const statusApproved = checkDateInSelectedDateArray(
            approvedTimesheetDates,
            dayjs(day).format("YYYY-MM-DD")
          ); 
          const getStatusApproved = checkStatusApprovedOrRejected(
            statusTimesheetData,
            dayjs(day).format("YYYY-MM-DD")
          );
          let isDateApproved = false,
            isDateRejected = false,
            isDatePending = false;
          if (getStatusApproved === 1) {
            isDateApproved = true;
          } else if (getStatusApproved === 2) {
            isDateRejected = true;
          } else if (getStatusApproved === 0) {
            isDatePending = true;
          }
          //console.log(statusApproved, statusFormFilled);
          return (
            <Grid
              item
              xs
              id={`day${index + 1}`}
              data-group="day-column"
              data-date={day}
              key={`board-day-column-${layout}-${selectedWeekIndex}-${day}-${index}`}
              style={{
                borderBottom: "1px solid #dadce0",
                border: "1px solid #dadce0",
                textAlign: "center",
                borderRadius: 0,
                minWidth: 64.38,
                height: "100%",
                padding: "20px",
                //background:'red'
              }}
              onClick={() => {
                if (statusFormFilled) {
                  props.setSelectedDate(dayjs(day).format("YYYY-MM-DD"));
                  props.setDateSelectedStatus(true);
                }
              }}
              data-testid="calendar-tile-approvals"
              sx={
                isDateDisabled || isDateFuture
                  ? {
                      background: `${timesheet_disabled_color}`,
                      cursor: "not-allowed",
                      pointerEvents: "none",
                    }
                  : { cursor: "pointer" }
              }
            >
              <Tooltip
                title={
                  isDateApproved
                    ? "Time sheet Approved"
                    : isDateRejected
                    ? "Timesheet Rejected"
                    : statusFormFilled ? "Timesheet Pending":"Timesheet not filled"
                }
              >
                <span
                  style={
                    isDateApproved
                      ? {
                          cursor: "pointer",
                          background: `${approval_completed_color}`,
                          padding: "5px 10px",
                          borderRadius: "50%",
                        }
                      : isDateRejected && statusFormFilled
                      ? {
                          cursor: "pointer",
                          background: `${approval_rejected_color}`,
                          padding: "5px 10px",
                          borderRadius: "50%",
                        }
                      : statusFormFilled?{
                          cursor: "pointer",
                          background: `${approval_pending_color}`,
                          padding: "5px 10px",
                          borderRadius: "50%",
                        }:{}
                  }
                >
                  {day.getDate()}
                </span>
              </Tooltip>
            </Grid>
          );
        })}
    </div>
  );
};

export default CalendarDayNWeekLayout;
