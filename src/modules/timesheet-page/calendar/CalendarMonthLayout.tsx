import React, { useContext, useEffect } from "react";
import { CalendarContext } from "./CalendarContext";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import format from "date-fns/format";
import dayjs from "dayjs";
import { checkDateInSelectedDateArray, checkStatusApprovedOrRejected, getOnlyApprovalsList, isFutureDate, isTileDisabled, updateCalendarByMonthOnApproveOrReject, updateCalendarByWeekOnApproveOrReject } from "../helper";
import {useDispatch, useSelector} from 'react-redux';
import { Tooltip } from "@mui/material";
import { approval_completed_color, approval_pending_color, approval_rejected_color, grid_border_color, timesheet_completed_color, timesheet_disabled_color } from "../../../utils/constants";
import { GET_APPROVALS_WEEK } from "../../approvals-page/actions/approvalTypes";
import KeyCloakService from "../../../security/keycloakService";


function CalendarLayoutMonth(props: any) {
  const timesheetData = useSelector((state: any) => state.timesheet);
  const selectedDateArray = timesheetData.timesheet;

  const { weeks } = props;

  const { stateCalendar, setStateCalendar } = useContext(CalendarContext);
  const {selectedDate, layout } = stateCalendar;

  const maxHeight = (weeks: any[]) => {
    const size = weeks.length;

    if (size === 5) {
      return {
        height: "calc((100% / 5) - 21.2px)",
        borderBottom: "1px solid #dadce0",
        borderRight: "1px solid #dadce0",
        padding: "20px",
      };
    }

    return {
      height: "calc((100% / 6) - 27.5px)",
    };
  };

  const approvedTimesheetDates = useSelector((state: any) => state.approvals);
  const statusTimesheetData = getOnlyApprovalsList(approvedTimesheetDates);
  const dispatch = useDispatch();
  const userId = KeyCloakService.CallUserId();
  const orgId = KeyCloakService.CallOrganizationId();
  
  useEffect(()=>{
    const updatedTS = updateCalendarByMonthOnApproveOrReject(selectedDate);
    dispatch({
      type: GET_APPROVALS_WEEK,
      startDate: updatedTS.startDate,
      endDate: updatedTS.endDate,
      userId:userId,
      orgId:orgId
    });
  },[selectedDate])
  
  return (
    <>
      {weeks.map((week: any, weekIndex: number) => (
        <Grid
          container
          spacing={0}
          direction="row"
          //justifyContent="space-evenly"
          alignItems="stretch"
          wrap="nowrap"
          key={`calendar-main-line-${weekIndex}`}
          style={maxHeight(weeks)}
        >
          {week.map((day: any, dayIndex: number) => {
            const isToday =
            dayjs(day).format("YYYY-MM-DD") === dayjs(new Date()).format("YYYY-MM-DD");
            const isDateDisabled = isTileDisabled({view:'month',date:day});
            const isDateFuture = isFutureDate(day);
            const statusFormFilled = checkDateInSelectedDateArray(
              selectedDateArray,
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
            return (
              <Grid
                item
                xs
                key={`calendar-main-line-${weekIndex}-column-${dayIndex}`}
                style={{
                  border: `1px solid ${grid_border_color} `,
                  textAlign: "center",
                  borderRadius: 0,
                  minWidth: 64.38,
                  height: "100%",
                  padding: "18px",
                }}
                onClick={()=>{
                  if(!(isDateDisabled && isDateFuture)){
                    props.setSelectedDate(dayjs(day).format("YYYY-MM-DD"));
                    props?.setDateSelectedStatus(true);
                  }

                }}
                data-testid="calendar-tile"
                sx={isDateDisabled || isDateFuture?{background:`${timesheet_disabled_color}`,cursor:"not-allowed",pointerEvents:'none'}:{cursor:"pointer"}}
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
        </Grid>
      ))}
    </>
  );
}

export default CalendarLayoutMonth;
