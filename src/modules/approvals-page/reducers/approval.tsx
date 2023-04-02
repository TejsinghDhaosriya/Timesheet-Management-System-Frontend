import { createSlice } from "@reduxjs/toolkit";
import { Timesheet } from "../TimesheetInterface";

const intialState: Timesheet = {
  id: 0,
  description: "",
  date: "",
  totalHours: 0,
  createdBy: 0,
  organizationId: 0,
  approvals: [
    {
      id: 0,
      timesheetId: 0,
      status: 0,
      reasonForRejection: "",
      approvalDate: "",
      managerId: 0,
      organizationId: 0,
      createdAt: "",
      modifiedAt: "",
    },
  ],
};

const approval = createSlice({
  name: "approval",
  initialState: intialState,
  reducers: {
    setApproval: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setApproval } = approval.actions;
export default approval.reducer;
