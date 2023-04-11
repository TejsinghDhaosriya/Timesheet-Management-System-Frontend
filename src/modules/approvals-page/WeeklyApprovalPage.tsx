import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  approval_completed_color,
  approval_pending_color,
  approval_rejected_color,
  timesheet_completed_color,
  timesheet_disabled_color,
} from "../../utils/constants";
import Calendar from "../timesheet-page/calendar/Calendar";
import { styled } from '@mui/material/styles';
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { useDispatch, useSelector } from "react-redux";

import { getApprovedHoursAndUnApprovedHours, getSelectedWeekIndex, getWeekDays } from "../timesheet-page/helper";
import { GET_APPROVALS, GET_APPROVALS_WEEK } from "./actions/approvalTypes";
import { format, getDate } from "date-fns";
import KeyCloakService from "../../security/keycloakService";
import FormModal from "../../components/FormModal";
import { GET_TIMESHEETS } from "../timesheet-page/actions/timesheetTypes";
import WeeklyApprovalTable from "./WeeklyApprovalTable";

const WeeklyApprovalPage = (props:any) => {
  const [selectedDate, setSelectedDate] = useState<any>();
  const [dateSelectedStatus, setDateSelectedStatus] = useState(false);

  const approvedTimesheetDates = useSelector((state: any) => state.approvals);
  const dispatch = useDispatch();
  const {userId} = props;
  //const userId = KeyCloakService.CallUserId();
  const orgId = KeyCloakService.CallOrganizationId();

  useEffect(()=>{
      if(!!selectedDate){
      const weeks = getWeekDays(new Date(selectedDate), 7);
      const selectedWeekIndex = getSelectedWeekIndex(new Date(selectedDate), weeks, 0);
      const selectedWeek = weeks[selectedWeekIndex];
      const startDate = format(new Date(selectedWeek[1]),'yyyy-MM-dd')||null;
      const endDate = format(new Date(selectedWeek[5]),'yyyy-MM-dd')||null;    
        dispatch({
            type: GET_APPROVALS_WEEK,
            startDate: startDate,
            endDate: endDate,
            userId:userId,
            orgId:orgId
        });

        dispatch({
          type: GET_TIMESHEETS,
          timesheeet: { userId: userId, organizationId: orgId },
        });
      }
  },[selectedDate,userId]);

  const ts = useSelector((state: any) => state.timesheet);


  const getSelectedDateArray = ts.timesheet;

  const [selectedDateArray, setSelectedDateArray] =
    useState<any>(getSelectedDateArray);

  useEffect(() => {
    setSelectedDateArray(getSelectedDateArray);
  }, [getSelectedDateArray]);
  return (
    <Box>
      <Box
          sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" },justifyContent:'flex-end' }}
        >
          <Box>
            <span
              style={{
                padding: "1px 10px",
                margin: 10,
                background: `${approval_completed_color}`,
                border: "1px solid",
              }}
            >
              {" "}
            </span>
            <span>Time sheet Approved</span>
          </Box>
          <Box>
            <span
              style={{
                padding: "1px 10px",
                margin: 10,
                background: `${approval_rejected_color}`,
                border: "1px solid",
              }}
            >
              {" "}
            </span>
            <span>Time sheet Rejected</span>
          </Box>
          <Box>
            <span
              style={{
                padding: "1px 10px",
                margin: 10,
                background: `${approval_pending_color}`,
                border: "1px solid",
              }}
            >
              {" "}
            </span>
            <span>Time sheet Pending</span>
          </Box>
        </Box>
      <Box sx={{ display: "flex",flexDirection:"column",gap:'10px' }} className="weekly-approval-table">
        <Box>
          <Calendar
            layout="week"
            disableMonthLayout={true}
            setSelectedDate={setSelectedDate}
            module="approvals"
            setDateSelectedStatus={setDateSelectedStatus}
          />
          <FormModal
            dateSelectedStatus={dateSelectedStatus}
            dateSelected={selectedDate}
            setDateSelectedStatus={(value: boolean) => setDateSelectedStatus(value)}
            setSelectedDateArray={setSelectedDateArray}
            selectedDateArray={selectedDateArray}
            setSelectedDate={(value: string) => {setSelectedDate(value);}}
            layout="week"
            module="approvals"
            userId={userId}
          />
        </Box>
        <Box>
          <WeeklyApprovalTable selectedDate={selectedDate} userId={userId} />
        </Box>
      </Box>
    </Box>
  );
};

export default WeeklyApprovalPage;
