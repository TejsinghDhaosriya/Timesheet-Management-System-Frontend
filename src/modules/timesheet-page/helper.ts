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
