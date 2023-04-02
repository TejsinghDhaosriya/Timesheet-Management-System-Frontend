import { createSlice } from "@reduxjs/toolkit";
import { intialState } from "../ProjectState";

const project = createSlice({
  name: "project",
  initialState: intialState,
  reducers: {
    setProjectSlice: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});
export const { setProjectSlice } = project.actions;
export default project.reducer;
