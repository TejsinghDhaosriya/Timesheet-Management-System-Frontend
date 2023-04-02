import React, { useContext, useMemo } from "react";
import { CalendarContext } from "./CalendarContext";
import { Toolbar, Tooltip, Typography, IconButton } from "@mui/material";
// import MenuIcon from "@material-ui/icons/Menu"
import TodayIcon from "@mui/icons-material/Today";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import format from "date-fns/format";
import {
  getSelectedWeekIndex,
  getWeekDays,
  PreviousLabel,
  NextLabel,
} from "../helper";

function CalendarNavbar(props: any) {
  const {
    // open,
    // handleDrawerOpen,
    // handleDrawerClose,
    goToToday,
    next,
    previous,
    module
  } = props;

  const { stateCalendar, setStateCalendar } = useContext(CalendarContext);
  const { selectedDate, layout } = stateCalendar;

  const setLayout = (props: any) => {
    const { option } = props;
    setStateCalendar({ ...stateCalendar, layout: option });
  };

  const weeks = getWeekDays(selectedDate, 7);
  const selectedWeekIndex = getSelectedWeekIndex(selectedDate, weeks, 0);
  const selectedWeek = weeks[selectedWeekIndex];

  const firstDayOfWeekMonth = format(selectedWeek[0], "MMM");
  const lastDayOfWeekMonth = format(selectedWeek[6], "MMM");
  const firstDayOfWeekYear = format(selectedWeek[0], "yyyy");
  const lastDayOfWeekYear = format(selectedWeek[6], "yyyy");

  const showMonthsAndYears =
    layout === "week" &&
    firstDayOfWeekMonth !== lastDayOfWeekMonth &&
    firstDayOfWeekYear !== lastDayOfWeekYear
      ? `${firstDayOfWeekMonth} ${firstDayOfWeekYear} - ${lastDayOfWeekMonth} ${lastDayOfWeekYear}`
      : false;
  const showMonthsAndYear =
    !showMonthsAndYears &&
    layout === "week" &&
    firstDayOfWeekMonth !== lastDayOfWeekMonth
      ? `${firstDayOfWeekMonth} - ${lastDayOfWeekMonth} ${firstDayOfWeekYear}`
      : false;
  const showMonthAndYear = !showMonthsAndYear
    ? format(selectedDate, "MMMM yyyy")
    : false;

  return (
    <div
      style={{
        flexGrow: 1,
        width: "100%",
        //borderBottom: "1px solid #E0E0E0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* <Toolbar> */}
      <Tooltip title={`${format(new Date(), "dd MMMM")}`}>
        <IconButton
          color="inherit"
          aria-label="Today"
          //onClick={goToToday}
          edge="start"
        >
          <TodayIcon />
        </IconButton>
      </Tooltip>

      <Tooltip
        title={PreviousLabel(layout)}
      >
        <IconButton data-testid="prev-btn" onClick={previous}>
          <ChevronLeftIcon />
        </IconButton>
      </Tooltip>

      <Tooltip
        title={NextLabel(layout)}
      >
        <IconButton data-testid="next-btn" onClick={next}>
          <ChevronRightIcon />
        </IconButton>
      </Tooltip>

      <Typography data-testid="month-name" style={{ fontWeight: "bolder" }}>
        {showMonthsAndYears || showMonthsAndYear || showMonthAndYear}
      </Typography>

      {/* <Tooltip
        title={"Day"}
      >
        <IconButton
          color="inherit"
          aria-label="Day View"
          onClick={(e: any) => setLayout({ e, option: "day" })}
          edge="start"
        >
          <CalendarViewDayIcon />
        </IconButton>
      </Tooltip> */}

      <Tooltip
        title={"Week"}
      >
        <IconButton
          color="inherit"
          aria-label="Week View"
          onClick={(e: any) => setLayout({ e, option: "week" })}
          edge="start"
          data-testid="week-view"
        >
          <ViewWeekIcon />
        </IconButton>
      </Tooltip>

      <Tooltip
        title={"Month"}
        sx={module==="approvals"?{display:"none"}:{}}
      >
        <IconButton
          color="inherit"
          aria-label="Month View"
          onClick={(e: any) => setLayout({ e, option: "month" })}
          edge="start"
          data-testid="month-view"
        >
          <ViewModuleIcon />
        </IconButton>
      </Tooltip>
      {/* </Toolbar> */}
    </div>
  );
}

export default CalendarNavbar;
