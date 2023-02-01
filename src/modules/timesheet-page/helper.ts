export const formSubmittedStatusHelper = (selectedDateArray:any,dateSelected:string)=>{
    return selectedDateArray.find((dateSelect:any)=>{
        return (dateSelect.timeSheetSubmitted===true && dateSelect.date===dateSelected);
    });
}


export function checkDateInSelectedDateArray(selectedDateArray:any,dateString: string) {
    const isDatePresent = selectedDateArray.filter((selDate:any) => {
      return selDate.date === dateString;
    });
    return isDatePresent.length === 1;
  }