import React, { useState } from "react";
import CalendarContainer from "./Calendar-Container";
import CalendarNavbar from "./Calendar-Navbar";
import { CalendarContext } from "./CalendarContext";
import { addMonths, addWeeks, addDays, subMonths, subWeeks, subDays } from "date-fns"

const Calendar = (props:any) => {

  const [open, setOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const layout = 'month';

  const [stateCalendar, setStateCalendar] = useState({
    selectedDate,
    layout,
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const next = () => {
    let newDate
    switch (stateCalendar.layout) {
        case "week":
            newDate = addWeeks(stateCalendar.selectedDate, 1)
            break

        case "day":
            newDate = addDays(stateCalendar.selectedDate, 1)
            break

        default:
            // month
            newDate = addMonths(stateCalendar.selectedDate, 1)
            break
    }
    setStateCalendar({ ...stateCalendar, selectedDate: newDate })
}

const previous = () => {
    let newDate;
    switch (stateCalendar.layout) {
        case "week":
            newDate = subWeeks(stateCalendar.selectedDate, 1)
            break

        case "day":
            newDate = subDays(stateCalendar.selectedDate, 1)
            break

        default:
            // month
            newDate = subMonths(stateCalendar.selectedDate, 1)
            break
    }
    setStateCalendar({ ...stateCalendar, selectedDate: newDate })
}

  return (
    <CalendarContext.Provider value={{ stateCalendar, setStateCalendar }}>
      <CalendarNavbar 
      //goToToday={goToToday}
      next={next}
      previous={previous}
      open={open}
      handleDrawerOpen={handleDrawerOpen}
      handleDrawerClose={handleDrawerClose}
      //handleLayoutChange={handleLayoutChange}
      />
      <CalendarContainer
        selectedDate={selectedDate}
        open={open}
        layout={layout}
        {...props}
      />
    </CalendarContext.Provider>
  );
};

export default Calendar;
