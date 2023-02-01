import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  project_info:{
    project_name:"<some project_name>",
    project_manager:["<some_name>","Karan"],
  },
  timesheetData:[
    {
      date: "02/01/2023",
      description: "Solved responsive issue",
      totalHours: 2,
      timeSheetSubmitted: true,
    },
    {
      date: "10/01/2023",
      description: "Solved responsive issue on something",
      totalHours: 3,
      timeSheetSubmitted: true,
    },
    {
      date: "13/01/2023",
      description: "Worked on Navbar, sidebar",
      totalHours: 10,
      timeSheetSubmitted: true,
    },
  ]
};

export const timesheetSlice = createSlice({
  name: "timesheet",
  initialState,
  reducers: {
    setTimesheetData:(state,action) =>{
      state.timesheetData = action.payload
    },
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
    updateTimesheetData: (state,action) =>{
      const {project_manager,project_name} = action.payload
      const filteredState = state.timesheetData.filter((tsInfo)=>{
        return tsInfo.date!==action.payload.date
      });
      const updatedState = [
        ...filteredState,
        action.payload
      ]
      return {
        ...state,
        project_info:{
          ...state.project_info,
          project_name:project_name,
          project_manager:project_manager
        },
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
