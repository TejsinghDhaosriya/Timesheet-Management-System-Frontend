export const formSubmittedStatusHelper = (selectedDateArray:any,dateSelected:string)=>{
    return selectedDateArray.find((dateSelect:any)=>{
        return (dateSelect.timeSheetSubmitted===true && dateSelect.date===dateSelected);
    });
}