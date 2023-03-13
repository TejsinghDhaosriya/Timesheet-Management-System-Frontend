import { Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import { useContext } from "react";
import { getSelectedWeekIndex, getWeekDays } from "../helper";
import { CalendarContext } from "./CalendarContext";
import CalendarDayNWeekLayout from "./CalendarDayNWeekLayout";
import CalendarLayoutMonth from "./CalendarMonthLayout";

function CalendarMain(props: any) {
  const { stateCalendar } = useContext(CalendarContext);
  const { selectedDate, layout } = stateCalendar;

  const { open } = props;
  const weeks = getWeekDays(selectedDate, 7);
  const selectedWeekIndex = getSelectedWeekIndex(selectedDate, weeks, 0);
  const selectedWeek = weeks[selectedWeekIndex];

  return (
    <Grid>
      <Grid
        container
        //spacing={1}
        direction="row"
        justifyContent={"center"}
        alignItems={"center"}
        wrap={"nowrap"}
        sx={{ height: "50px",border: "1px solid #dadce0",margin:0,textAlign:"center" }}
      >
        {weeks[0].map((weekDay: Date, index: number) => {
          return (
            <Grid item xs key={`calendar-column-header-label-${index}`}>
              <div>
                <Typography>
                  {format(weekDay, "EEEE")}
                </Typography>
              </div>
            </Grid>
          );
        })}
      </Grid>
      {layout === "week" && (
        <CalendarDayNWeekLayout
          {...props}
          selectedWeekIndex={selectedWeekIndex}
          selectedWeek={selectedWeek}
        />
      )}
      {layout === "month" && (
        <CalendarLayoutMonth
          {...props}
          weeks={weeks}
        />
      )}
    </Grid>
  );
}

export default CalendarMain;
