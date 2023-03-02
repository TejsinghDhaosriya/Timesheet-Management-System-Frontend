import { Box, Modal, Paper, TextField, Typography } from "@mui/material";
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
  GET_APPROVALS_WEEK,
  UPDATE_ALL_APPROVALS,
} from "./actions/approvalTypes";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

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
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpenn = () => setOpen(true);
  const handleClosee = () => setOpen(false);

  const handleStartDateChange = (event: any) => {
    setStartDate(event?.target.value);
  };
  const handleEndDateChange = (event: any) => {
    setEndDate(event?.target.value);
  };

  const totalHourss = approv.reduce(
    (sum: any, entry: any) => sum + entry.totalHours,
    0
  );

  const result: { id: any; status: any; reasonForRejection: any }[] = [];

  for (let i = 0; i < approv.length; i++) {
    const res = approv[i].approvals.filter((k: any) => k.status === 0);
    for (let j = 0; j < res.length; j++) {
      const { id, status, reasonForRejection } = res[j];
      result.push({ id, status, reasonForRejection });
    }
  }

  const handleAccept = () => {
    result.map((app: any, i: any) => (result[i].status = 1));
    setStatus("set");
    dispatch({ type: UPDATE_ALL_APPROVALS, result });
  };
  const handleReject = () => {
    handleOpenn();
    setModal(true);
  };
  const handleSave = () => {
    result.map(
      (app: any, i: any) => (
        (result[i].status = 2), (result[i].reasonForRejection = reason)
      )
    );
    dispatch({ type: UPDATE_ALL_APPROVALS, result });
  };

  useEffect((): any => {
    dispatch({
      type: GET_APPROVALS_WEEK,
      startDate: startDate,
      endDate: endDate,
    });
  }, [dispatch, startDate, endDate]);

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
            <TableRow>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Total Hours</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{startDate}</TableCell>
              <TableCell>{endDate}</TableCell>
              <TableCell>{totalHourss}</TableCell>
              <TableCell>
                {status !== "set" ? (
                  <Box>
                    <Button color="primary" onClick={() => handleAccept()}>
                      <DoneIcon />
                    </Button>
                    <Button color="primary" onClick={() => handleReject()}>
                      <CloseIcon />
                    </Button>
                    {
                      <Modal
                        open={open}
                        onClose={handleClosee}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography>
                            Confirm Rejection With Reason!!!
                          </Typography>
                          <TextField
                            rows="5"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                          />
                          <Button
                            onClick={() => {
                              handleSave();
                              handleClosee();
                              setReason("");
                            }}
                          >
                            Submit
                          </Button>
                        </Box>
                      </Modal>
                    }
                  </Box>
                ) : (
                  <Box>"Already Set"</Box>
                )}
              </TableCell>
            </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
