import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  lastDayOfWeek,
  addDays,
  eachDayOfInterval,
  differenceInDays,
  getYear,
  getMonth,
  getDate,
  getTime,
} from "date-fns";
import dayjs from "dayjs";

export const formSubmittedStatusHelper = (
  selectedDateArray: any,
  dateSelected: string
) => {
  return selectedDateArray.find((dateSelect: any) => {
    return (
      dayjs(dateSelect.date).format("YYYY-MM-DD") ===
      dayjs(dateSelected).format("YYYY-MM-DD")
    );
  });
};

export function checkDateInSelectedDateArray(
  selectedDateArray: any,
  dateString: string
) {
  const isDatePresent = selectedDateArray.filter((selDate: any) => {
    return dayjs(selDate.date).format("YYYY-MM-DD") === dateString;
  });
  return isDatePresent.length === 1;
}

export function checkDateInSelectedDateArray2(
  selectedDateArray: any,
  dateString: string
) {
  const ti = selectedDateArray.find(
    (item: any) =>
      dayjs(item.date).format("YYYY-MM-DD") ===
      dayjs(dateString).format("YYYY-MM-DD")
  );
  return ti.id;
}

export function getWeekDays(selectedDate: any, size: number) {
  function getMonthWeeks(date: Date, { forceSixWeeks = false } = {}) {
    const monthFirstDate = startOfMonth(date);
    const monthLastDate = endOfMonth(date);

    const start = forceSixWeeks ? startOfWeek(monthFirstDate) : monthFirstDate;
    let end = forceSixWeeks
      ? lastDayOfWeek(addDays(monthLastDate, 2))
      : monthLastDate;

    // check for 6 lines (weeks)
    const totalOfDays = differenceInDays(end, start);
    if (totalOfDays !== 41) {
      end = lastDayOfWeek(addDays(end, 2));
    }

    //console.log(eachDayOfInterval({ start, end }));
    return eachDayOfInterval({ start:start, end:end });
  }

  const days = getMonthWeeks(selectedDate, { forceSixWeeks: true }).map(
    (date: Date, index: number) => date
  );

  const weekly = (_month: any, _size: number) =>
    _month.reduce(
      (a: any[], b: any[], index: number, group: any[]) =>
        !(index % _size) ? a.concat([group.slice(index, index + _size)]) : a,
      []
    );

  return weekly(days, size);
}

export function getSelectedWeekIndex(
  selectedDate: Date,
  weeks: any,
  startTime: number
) {
  const _year = getYear(selectedDate);
  const _month = getMonth(selectedDate);
  const _day = getDate(selectedDate);

  return weeks.reduce(
    (position: number, week: any, index: number) =>
      week.find(
        (day: Date) =>
          getTime(day) ===
          getTime(new Date(_year, _month, _day, startTime, 0, 0))
      )
        ? (position = index)
        : position,
    0
  );
}

export const PreviousLabel = (layout: string) => {
  switch (layout) {
      case "day":
          return "previousDay"
      case "week":
          return "previousWeek"
      case "month":
          return "previousMonth"
      default:
          return "previous"
  }
}

export const NextLabel = (layout: string) => {
  switch (layout) {
      case "day":
          return "nextDay"
      case "week":
          return "nextWeek"
      case "month":
          return "nextMonth"
      default:
          return "next"
  }
}

export function isWeekend(date: Date) {
  const day = date.getDay();
  return day === 6 || day === 0; // Saturday or Sunday
}
export function isTileDisabled({ view, date }: any) {
  const todayDate = new Date().getTime();
  const clickedDate = new Date(date).getTime();
  if (view === "month" && isWeekend(date)) {
    return true; // Disable the tile for weekends in month view
  } else if (clickedDate > todayDate) {
    return true;
  }
  return false;
}

export function isFutureDate(date: any) {
  const todayDate = new Date().getTime();
  const clickedDate = new Date(date).getTime();
  if (clickedDate > todayDate) {
    return true;
  }
  return false;
}