import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  timesheetData:[
    {
      date: "02/01/2023",
      timesheetInfo: {
        description: "Solved responsive issue",
        startTime: "Fri Jan 02 2023 05:00:00 GMT+0530 (India Standard Time)",
        endTime: "Fri Jan 02 2023 02:00:00 GMT+0530 (India Standard Time)",
        overTime: 2,
      },
      timeSheetSubmitted: true,
    },
    {
      date: "10/01/2023",
      timesheetInfo: {
        description: "Solved responsive issue on something",
        startTime: "Fri Jan 10 2023 02:00:00 GMT+0530 (India Standard Time)",
        endTime: "Fri Jan 10 2023 12:00:00 GMT+0530 (India Standard Time)",
        overTime: 3,
      },
      timeSheetSubmitted: true,
    },
    {
      date: "13/01/2023",
      timesheetInfo: {
        description: "Worked on Navbar, sidebar",
        startTime: "Fri Jan 13 2023 12:00:00 GMT+0530 (India Standard Time)",
        endTime: "Fri Jan 13 2023 02:00:00 GMT+0530 (India Standard Time)",
        overTime: 10,
      },
      timeSheetSubmitted: true,
    },
  ]
};

export const timesheetSlice = createSlice({
  name: "timesheet",
  initialState,
  reducers: {
    addTimesheetData: (state, action) => {     
      state.timesheetData.push(action.payload);
    },
    deleteTimesheetData: (state,action) =>{
      const filteredState = state.timesheetData.filter((tsInfo)=>{
        return tsInfo.date!==action.payload
      });
      return {
        ...state,
        timesheetData:filteredState
      };
    },
    updateTimesheetData: (state,action) =>{;
      const filteredState = state.timesheetData.filter((tsInfo)=>{
        return tsInfo.date!==action.payload.date
      });
      const updatedState = [
        ...filteredState,
        action.payload
      ]
      return {
        ...state,
        timesheetData:updatedState
      };
    }
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
    // incrementAsync: (state) => {},
    // decrementAsync: (state) => {},
    // incrementByAmountAsync: (state, action: PayloadAction<number>) => {},
    // incrementByAmountAsyncSuccess: (state) => {},
    // incrementByAmountAsyncFailure: (state) => {},
  },
});

export const {addTimesheetData,updateTimesheetData,deleteTimesheetData} = timesheetSlice.actions;
export default timesheetSlice.reducer;
