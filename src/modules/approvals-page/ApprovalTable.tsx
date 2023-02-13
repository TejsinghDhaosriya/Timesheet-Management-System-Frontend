import { Box, IconButton, Modal, Paper, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_APPROVALS,
  GET_APPROVALS,
  GET_APPROVALS_WEEK,
  UPDATE_APPROVAL,
} from "./actions/approvalTypes";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { Approval, Timesheet } from "./TimesheetInterface";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function WeekTable() {
  const approv = useSelector((state: any) => state.approvals);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState(0);
  const [reason, setReason] = useState("");
  const [modal, setModal] = useState(false);
  const [state, setState] = useState<Approval>();
  const [open, setOpen] = useState(false);
  const handleOpenn = () => setOpen(true);
  const handleClosee = () => setOpen(false);

  const handleStartDateChange = (event: any) => {
    setStartDate(event?.target.value);
  };
  const handleEndDateChange = (event: any) => {
    setEndDate(event?.target.value);
  };

  useEffect((): any => {
    dispatch({
      type: GET_APPROVALS_WEEK,
      userId: 12,
      organizationId: 1,
      startDate: startDate,
      endDate: endDate,
    });
  }, [startDate, endDate,status,reason,]);

  const handleDelete = (id: number) => {
    console.log(id)
    dispatch({ type: DELETE_APPROVALS, id: id })
  };

  const handleChangeStatusAccept = (row: Approval) => {
    setStatus(1); //setting accepted
    dispatch({
      type: UPDATE_APPROVAL,
      approval: { ...row, status: status },
    });
  };
  const handleChangeStatusReject = (row: Approval) => {
    setState(row)
    handleOpenn()
    setStatus(2) //setting reject
    setModal(true)
  };
  const handleEditStatus = (row: Approval) => {
    setStatus(0);
    dispatch({
      type: UPDATE_APPROVAL,
      approval: { ...row, status: status },
    });
  };

  const handleSave = () => {
    const currrow = state;
    dispatch({
      type: UPDATE_APPROVAL,
      approval: { ...currrow, status: status, reasonForRejection: reason },
    });
  };

  const statusMap: any = {
    0: "pending",
    1: "accepted",
    2: "rejected",
  };

  return (
    <>
      <TextField
        required
        type="date"
        name="startDate"
        onChange={handleStartDateChange}
        placeholder="Enter Start Date"
        value={startDate}
      />
      <TextField
        required
        type="date"
        name="endDate"
        onChange={handleEndDateChange}
        placeholder="Enter End Date"
        value={endDate}
      />

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#D5D5D5", fontWeight: "bold" }}>
              <TableCell>Timesheet Id</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total Hours</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {approv.map((approval: Timesheet) =>
              approval.approvals.map((row: Approval) => (
                <TableRow key={approval.id}>
                  <TableCell>{row.timesheetId}</TableCell>
                  <TableCell>{approval.date}</TableCell>
                  <TableCell>{approval.totalHours}</TableCell>
                  <TableCell>
                    {statusMap[row.status] === "rejected"
                      ? row.reasonForRejection
                      : "-------"}
                  </TableCell>
                  <TableCell>
                    {statusMap[row.status] == "pending" ? (
                      <Box>
                        <Button
                          color="primary"
                          onClick={() => handleChangeStatusAccept(row)}
                        >
                          <DoneIcon />
                        </Button>
                        <Button
                          color="primary"
                          onClick={() => handleChangeStatusReject(row)}
                        >
                          <CloseIcon />
                        </Button>
                        {modal && (
                          <Modal
                            open={open}
                            onClose={handleClosee}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <TextField
                                rows="5"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                              />
                              <Button
                                onClick={() => {
                                  handleSave();
                                  handleClosee();
                                }}
                              >
                                Submit
                              </Button>
                            </Box>
                          </Modal>
                        )}
                      </Box>
                    ) : (
                      <Box color="red">{statusMap[row.status]}</Box>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditStatus(row)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Button
                      color="inherit"
                      onClick={() => handleDelete(row.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
