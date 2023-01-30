import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface timesheetSlice {
  value: number;
}

const initialState = {
  timesheetData:[
    {
      date: "02/01/2023",
      timesheetInfo: {
        description: "Solved responsive issue",
        startTime: 0,
        endTime: 0,
        overTime: 0,
      },
      timeSheetSubmitted: true,
    },
    {
      date: "10/01/2023",
      timesheetInfo: {
        description: "Solved responsive issue on something",
        startTime: 0,
        endTime: 0,
        overTime: 0,
      },
      timeSheetSubmitted: true,
    },
    {
      date: "13/01/2023",
      timesheetInfo: {
        description: "Worked on Navbar, sidebar",
        startTime: new Date(),
        endTime: 0,
        overTime: 0,
      },
      timeSheetSubmitted: true,
    },
  ]
};

export const timesheetSlice = createSlice({
  name: "timesheet",
  initialState,
  reducers: {
    setTimesheetData: (state, action) => {   
      console.log(action,"action");   
      state.timesheetData.push(action.payload);
    },
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

export const {setTimesheetData} = timesheetSlice.actions;
export default timesheetSlice.reducer;
