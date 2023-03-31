import { createSlice } from "@reduxjs/toolkit";

const usersInfo = createSlice({
  name: "usersInfo",
  initialState: [],
  reducers: {
    setUsersInfo: (state, action) => {
      state = action.payload;
      return state;
    }
  },
});

export const {setUsersInfo } = usersInfo.actions;
export default usersInfo.reducer;
