import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import TimesheetData from "../timesheetInterface";

const initialState: TimesheetData = {
  project_info: {
    project_name: "<some project_name>",
    project_manager: ["<some_name>", "Karan"],
  },
  timesheet: [
    {
      id: "",
      date: "",
      description: "",
      totalHours: 0,
      timeSheetSubmitted: false,
    },
  ],
  isLoading: false,
  error: false,
};

export const timesheetSlice = createSlice({
  name: "timesheet",
  initialState,
  reducers: {
    setLoadingStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    setTimesheetData: (state, action) => {
      state.isLoading = false;
      state.timesheet = action.payload;
      return state;
    },

    setLoadingEnd: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    addTimesheetData: (state, action) => {
      state.timesheet.push(action.payload);
      return state;
    },
    deleteTimesheetData: (state, action) => {
      state.timesheet = state.timesheet.filter(
        (ts) => ts.id !== action.payload
      );
      return state;
    },
    updateTimesheetData: (state, action) => {
      state.timesheet = state.timesheet.map((i) =>
        i.id == action.payload.id ? action.payload.timesheetData : i
      );
      return state;
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

export const {
  setTimesheetData,
  setLoadingStart,
  setLoadingEnd,
  addTimesheetData,
  updateTimesheetData,
  deleteTimesheetData,
} = timesheetSlice.actions;
export default timesheetSlice.reducer;
