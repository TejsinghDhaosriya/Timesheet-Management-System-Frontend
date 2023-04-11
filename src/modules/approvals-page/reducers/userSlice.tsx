import { createSlice } from "@reduxjs/toolkit";

const usersInfo = createSlice({
  name: "usersInfo",
  initialState: {"userList":[],"managerList":[]},
  reducers: {
    setUsersInfo: (state, action) => {
      state.userList = action.payload;
      return state;
    },
    setManagersInfo: (state, action) => {
      state.managerList = action.payload;
      return state;
    }
  },
});

export const {setUsersInfo,setManagersInfo } = usersInfo.actions;
export default usersInfo.reducer;
