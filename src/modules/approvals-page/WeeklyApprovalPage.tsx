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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Paper,Button} from '@mui/material';
import { getApprovedHoursAndUnApprovedHours, getSelectedWeekIndex, getWeekDays } from "../timesheet-page/helper";
import { GET_APPROVALS_WEEK } from "./actions/approvalTypes";
import { format, getDate } from "date-fns";
import KeyCloakService from "../../security/keycloakService";
import FormModal from "../../components/FormModal";
import { GET_TIMESHEETS } from "../timesheet-page/actions/timesheetTypes";

const WeeklyApprovalPage = () => {
  const [selectedDate, setSelectedDate] = useState<any>();
  const [dateSelectedStatus, setDateSelectedStatus] = useState(false);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      fontWeight:'bolder',
      border:'1px solid black'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  // const StyledTableRow = styled(TableRow)(({ theme }) => ({
  //   '&:nth-of-type(odd)': {
  //     backgroundColor: theme.palette.action.hover,
  //   },
  //   // hide last border
  //   '&:last-child td, &:last-child th': {
  //     border: 0,
  //   },
  // }));
  

  const handleAccept = () => {
    //result.map((app: any, i: any) => (result[i].status = 1));
    //setStatus("set");
    //dispatch({ type: UPDATE_ALL_APPROVALS, result });
  };
  const handleReject = () => {
    //handleOpenn();
    //setModal(true);
  };


  const approvedTimesheetDates = useSelector((state: any) => state.approvals);
  const dispatch = useDispatch();
  const approvedAndUnApprovedHours = getApprovedHoursAndUnApprovedHours(approvedTimesheetDates); 
  const userId=KeyCloakService.CallUserId();
  const orgId = KeyCloakService.CallOrganizationId();

  useEffect(()=>{
      //console.log(selectedDate);
      if(!!selectedDate){
        const weeks = getWeekDays(new Date(selectedDate), 7);
      const selectedWeekIndex = getSelectedWeekIndex(new Date(selectedDate), weeks, 0);
      const selectedWeek = weeks[selectedWeekIndex];
      const startDate = format(new Date(selectedWeek[1]),'yyyy-MM-dd')||null;
      const endDate = format(new Date(selectedWeek[5]),'yyyy-MM-dd')||null;    
      //console.log(startDate,endDate)
        dispatch({
            type: GET_APPROVALS_WEEK,
            startDate: startDate,
            endDate: endDate,
            userId:userId,
            orgId:orgId
        });
      }
  },[selectedDate]);

  const ts = useSelector((state: any) => state.timesheet);

  useEffect((): any => {
    dispatch({
      type: GET_TIMESHEETS,
      timesheeet: { userId: userId, organizationId: orgId },
    });
  }, []);

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
          />
        </Box>
        <Box>
          <TableContainer component={Paper} sx={{mt:5}}>
            <Table sx={{ }} aria-label="customized table">
              <TableHead sx={{height:'10px',padding:0}}>
                <TableRow>
                  <StyledTableCell align="center">Approved Hours</StyledTableCell>
                  <StyledTableCell align="center">UnApproved Hours</StyledTableCell>
                  <StyledTableCell align="center">Non-Billable Hours</StyledTableCell>
                  <StyledTableCell align="center">Status &nbsp;(Approve / Reject)</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow>
                    <TableCell align="center">
                      {approvedAndUnApprovedHours.totalApprovedHours}
                    </TableCell>
                    <TableCell align="center">
                    {40-(approvedAndUnApprovedHours.totalApprovedHours+approvedAndUnApprovedHours.totalUnApprovedHours)}
                    </TableCell>
                    <TableCell align="center">
                      {approvedAndUnApprovedHours.totalUnApprovedHours}
                    </TableCell>
                    <StyledTableCell align="center">
                        <Button color="primary" onClick={() => handleAccept()}>
                            <DoneIcon />
                        </Button>
                        <Button color="primary" onClick={() => handleReject()}>
                            <CloseIcon />
                        </Button>
                    </StyledTableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default WeeklyApprovalPage;
