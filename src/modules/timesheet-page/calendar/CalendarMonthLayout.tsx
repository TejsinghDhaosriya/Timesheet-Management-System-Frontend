import React, { useContext } from "react";
import { CalendarContext } from "./CalendarContext";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import format from "date-fns/format";
import dayjs from "dayjs";
import { checkDateInSelectedDateArray, isFutureDate, isTileDisabled } from "../helper";
import {useSelector} from 'react-redux';
import { Tooltip } from "@mui/material";
import { grid_border_color, timesheet_completed_color, timesheet_disabled_color } from "../../../utils/constants";


function CalendarLayoutMonth(props: any) {
  const timesheetData = useSelector((state: any) => state.timesheet);
  const selectedDateArray = timesheetData.timesheet;

  const { weeks } = props;

  const { stateCalendar, setStateCalendar } = useContext(CalendarContext);
  const { layout } = stateCalendar;

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

  return (
    <>
      {weeks.map((week: any, weekIndex: number) => (
        <Grid
          container
          spacing={0}
          direction="row"
            justifyContent="space-evenly"
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
                  padding: "20px",
                }}
                onClick={()=>{
                  if(!(isDateDisabled && isDateFuture)){
                    props.setSelectedDate(dayjs(day).format("YYYY-MM-DD"));
                    //props?.setDateSelectedStatus(true);
                  }

                }}
                data-testid="calendar-tile"
                sx={isDateDisabled || isDateFuture?{background:`${timesheet_disabled_color}`,cursor:"not-allowed",pointerEvents:'none'}:{cursor:"pointer"}}
              >
                <div>
                  <Tooltip
                        title={statusFormFilled?"Time sheet Filled":""}
                    >
                  <Typography
                  >
                    <span
                    //style={isToday?{borderBottom:"2px solid black"}:{}}
                    style={statusFormFilled?{cursor:"pointer",background:`${timesheet_completed_color}`,padding:'5px 10px',borderRadius:'50%'}:{cursor:"pointer"}}
                    >
                      {day.getDate()}
                    </span>

                    {day.getDate() === 1
                      ? format(new Date(day), " MMM")
                      : null}
                  </Typography>
                  </Tooltip>
                </div>
              </Grid>
            );
          })}
        </Grid>
      ))}
    </>
  );
}

export default CalendarLayoutMonth;
