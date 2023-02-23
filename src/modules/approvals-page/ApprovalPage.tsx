import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import TimesheetManager from "../timesheet-page/TimesheetManager";
import { GET_APPROVALS, GET_APPROVALS_WEEK } from "./actions/approvalTypes";
import WeekTable from "./ApprovalTable";
import Tablee from "./Table";

function ApprovalPage() {
  const [select, setSelect] = useState(GET_APPROVALS);

  const handleSortChange = (event: any) => {
    setSelect(event.target.value);
  };

  return (
    <Box>
      <Typography variant="h2" textAlign="center" color="#D5D5D5">
        {" "}
        Approvals
      </Typography>
      <FormControl>
        <Select value={select} onChange={handleSortChange}>
          <MenuItem value={"GET_APPROVALS"}>Day</MenuItem>
          <MenuItem value={"GET_APPROVALS_WEEK"}>WeekRange</MenuItem>
          <MenuItem value={"USER_APPROVALS"}>User Approvals</MenuItem>
        </Select>
      </FormControl>
      {select=="GET_APPROVALS" && <Tablee />}
      {select=="GET_APPROVALS_WEEK" && <WeekTable />}
      {select=="USER_APPROVALS" && <TimesheetManager />}
    </Box>
  );
}

export default ApprovalPage;
