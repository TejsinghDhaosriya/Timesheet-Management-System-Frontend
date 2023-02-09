import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_APPROVALS,
  GET_APPROVALS,
  UPDATE_APPROVAL,
} from "./actions/approvalTypes";
import { setApproval } from "./reducers/approval";
import { updateApproval } from "./reducers/approvals";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

interface Approval {
  id: number;
  userName: string;
  totalHours: number;
  date: string;
  description: string;
  status: "pending" | "accepted" | "rejected";
  reason: string;
}
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

export default function ApprovalTable() {
  const approv = useSelector((state: any) => state.approvals);
  const dispatch = useDispatch();
  useEffect((): any => {
    dispatch({ type: GET_APPROVALS });
  }, []);

  const [selectedApproval, setSelectedApproval] = useState<
    Approval | undefined
  >(undefined);

  const handleDelete = (id: number) => {
    console.log(id);
    dispatch({ type: DELETE_APPROVALS, id: id });
  };

  const handleOpen = (approval: Approval) => {
    setSelectedApproval(approval);
  };
  const handleClose = () => {
    setSelectedApproval(undefined);
  };
  // const[text,setText]=useState("");
  // const handleChange=(event:any)=>{
  //       setText(event.target.value)
  // }
  const handleChangeStatusAccept = (approval: Approval) => {
    const newStatus = approval.status === "pending" ? "accepted" : " ";
    dispatch({
      type: UPDATE_APPROVAL,
      approval: { ...approval, status: newStatus },
    });
  };

  const [status, setStatus] = useState("pending");
  const [reason, setReason] = useState("");
  const [modal, setModal] = useState(false);
  const [state,setState]=useState<Approval>();
  const [open, setOpen] = React.useState(false);
  const handleOpenn = () => setOpen(true);
  const handleClosee = () => setOpen(false);

  const handleChangeStatusReject = (approval: Approval) => {
    setState(approval);
    console.log(approval)
    handleOpenn();
    setStatus("rejected");
    setModal(true);

    // const newStatus = approval.status === "pending" ? "rejected" : " ";
    // // dispatch(
    // //   updateApproval({
    // //     ...approval,
    // //     status: newStatus,
    // //     rejectionReason: newStatus === "rejected" ? prompt("Enter Reason") : "",
    // //   })
    // // );
    // dispatch({type:UPDATE_APPROVAL,approval:{...approval,status:newStatus,reason:text}})
  };

  const handleSave = () => {
    const approval=state;
    console.log(approval)
    dispatch({
      type: UPDATE_APPROVAL,
      approval: { ...approval, status: status, reason: reason },
    });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#D5D5D5", fontWeight: "bold" }}>
              <TableCell>Id</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total Hours</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Delete</TableCell>
              {/* <TableCell>Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {approv.map((approval: any) => (
              <TableRow key={approval.id}>
                <TableCell>{approval.id}</TableCell>
                <TableCell>{approval.userName}</TableCell>
                <TableCell>{approval.description}</TableCell>
                <TableCell>{approval.date}</TableCell>
                <TableCell>{approval.totalHours}</TableCell>
                <TableCell>
                  {approval.status === "rejected" ? approval.reason : "----"}
                </TableCell>
                <TableCell>
                  {approval.status=='pending'?
                  (<Box>
                    <Button
                        color="primary"
                        onClick={() => handleChangeStatusAccept(approval)}
                      >
                        <DoneIcon />
                      </Button>
                      <Button
                        color="primary"
                        onClick={() => handleChangeStatusReject(approval)}
                      >
                        <CloseIcon />
                        
                      </Button>
                      {modal &&(<Modal
                        open={open}
                        onClose={handleClosee}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <TextField
                            rows="5"
                            value={reason}
                            onChange={e => setReason(e.target.value)}
                          />
                          <Button
                            onClick={() => {
                              handleSave()
                              handleClosee()
                            }}
                          >
                            Submit
                          </Button>
                        </Box>
                      </Modal>)}
                      {/* {modal && (
                        <Box>
                          <Typography> Reason</Typography>
                                <TextField rows='5' value={reason} onChange={e=>setReason(e.target.value)} />
                                <Button onClick={()=>{handleSave(approval)
                                  setModal(false)
                                }}>Submit</Button>
                        </Box>
                      )} */}
                  </Box>)
                  :
                  (<Box color="blue">{approval.status}</Box>)
                  }
                </TableCell>
                <TableCell>
                  <Button
                    color="inherit"
                    onClick={() => handleDelete(approval.id)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Dialog open={!!selectedApproval} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Enter Reason</DialogTitle>
        <DialogContent>
         <TextField label="Text Input" value={text} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
}
