import { createSlice } from "@reduxjs/toolkit";
import Project from "../ProjectInterface";
import { intialState } from "../ProjectState";

const projects = createSlice({
  name: "projects",
  initialState: [intialState],
  reducers: {
    getProjectsSlice: (state, action) => {
      state = action.payload;
      return state;
    },
    addProjectSlice: (state, action) => {
      state.push(action.payload);
      return state;
    },
    editProjectSlice: (state: Project[], action) => {
      state = state.map((i: { id: Project["id"] }) =>
        i.id === action.payload.id ? action.payload : i
      );
      return state;
    },
    deleteProjectSlice: (state: Project[], action) => {
      state = state.filter(
        (i: { id: Project["id"] }) => i.id !== action.payload
      );
      return state;
    },
  },
});
export const {
  getProjectsSlice,
  addProjectSlice,
  editProjectSlice,
  deleteProjectSlice,
} = projects.actions;
export default projects.reducer;
