import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkApprovalInSelectedDateArray,
  getApprovedHoursAndUnApprovedHours,
  getSelectedWeekIndex,
  getWeekDays,
} from "../timesheet-page/helper";
import {
  GET_APPROVALS,
  GET_APPROVALS_WEEK,
  UPDATE_ALL_APPROVALS,
  UPDATE_APPROVAL,
} from "./actions/approvalTypes";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { Button, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import RejectionModal from "../timesheet-page/RejectionModal";
import { format } from "date-fns";
import KeyCloakService from "../../security/keycloakService";


const WeeklyApprovalTable = ({ userId, selectedDate }: any) => {
  //const userId=KeyCloakService.CallUserId();
  const orgId = KeyCloakService.CallOrganizationId();
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      fontWeight: "bolder",
      border: "1px solid black",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const [openRejectionModal, setOpenRejectionModal] = useState(false);
  const [reasonOfRejection, setReasonOfRejection] = useState("");
  const approvedTimesheetDateArray = useSelector(
    (state: any) => state.approvals
  );
  const dispatch = useDispatch();
  const approvedAndUnApprovedHours = getApprovedHoursAndUnApprovedHours(
    approvedTimesheetDateArray
  );
  const approvalItemsArray = approvedTimesheetDateArray.map(
    (approvedDateItem: any) => {
      return approvedDateItem.approvals[0];
    }
  );
  const updateCalendarOnApproveOrReject = () => {
    const weeks = getWeekDays(new Date(selectedDate), 7);
    const selectedWeekIndex = getSelectedWeekIndex(
      new Date(selectedDate),
      weeks,
      0
    );
    const selectedWeek = weeks[selectedWeekIndex];
    const startDate = format(new Date(selectedWeek[1]), "yyyy-MM-dd") || null;
    const endDate = format(new Date(selectedWeek[5]), "yyyy-MM-dd") || null;
    dispatch({
      type: GET_APPROVALS_WEEK,
      startDate: startDate,
      endDate: endDate,
      userId: userId,
      orgId: orgId,
    });
  };
  const handleApproveTimeSheet = () => {
    if (
      approvedTimesheetDateArray.length > 0 &&
      approvedTimesheetDateArray[0].id !== 0
    ) {
      dispatch({
        type: UPDATE_ALL_APPROVALS,
        approvals: approvalItemsArray.map((approvedTimesheetItem: any) => {
          return {
            id: approvedTimesheetItem.timesheetId,
            status: 1,
            reasonForRejection: null,
          };
        }),
      });
      setTimeout(() => {
        updateCalendarOnApproveOrReject();
      }, 2000);
    }
  };

  const handleReject = () => {
    setOpenRejectionModal(true);
  };
  const handleRejectTimesheet = () => {
    if (
      approvedTimesheetDateArray.length > 0 &&
      approvedTimesheetDateArray[0].id !== 0
    ) {
      setOpenRejectionModal(false);
      dispatch({
        type: UPDATE_ALL_APPROVALS,
        approvals: approvalItemsArray.map((approvedTimesheetItem: any) => {
          return {
            ...approvedTimesheetItem,
            status: 2,
            reasonForRejection: reasonOfRejection,
          };
        }),
      });
      setTimeout(() => {
        updateCalendarOnApproveOrReject();
      }, 2000);
    }
  };

  return (
      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <Table sx={{}} aria-label="customized table">
          <TableHead sx={{ height: "50px", padding: 0 }}>
            <TableRow>
              <StyledTableCell align="center">Approved Hours</StyledTableCell>
              <StyledTableCell align="center">UnApproved Hours</StyledTableCell>
              <StyledTableCell align="center">
                Non-Billable Hours
              </StyledTableCell>
              <StyledTableCell align="center">
                Status &nbsp;(Approve / Reject)
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          <TableRow>
              <TableCell align="center">
                {approvedAndUnApprovedHours.totalApprovedHours}
              </TableCell>
              <TableCell align="center">
                {40 -
                  (approvedAndUnApprovedHours.totalApprovedHours +
                    approvedAndUnApprovedHours.totalUnApprovedHours)}
              </TableCell>
              <TableCell align="center">
                {approvedAndUnApprovedHours.totalUnApprovedHours}
              </TableCell>
              <StyledTableCell align="center">
                <Button color="primary" onClick={handleApproveTimeSheet}>
                  <DoneIcon />
                </Button>
                <Button color="primary" onClick={() => handleReject()}>
                  <CloseIcon />
                </Button>
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
        <RejectionModal
          openRejectionModal={openRejectionModal}
          setOpenRejectionModal={setOpenRejectionModal}
          reasonOfRejection={reasonOfRejection}
          setReasonOfRejection={setReasonOfRejection}
          handleRejectTimesheet={handleRejectTimesheet}
        />
      </TableContainer>
  );
};

export default WeeklyApprovalTable;
