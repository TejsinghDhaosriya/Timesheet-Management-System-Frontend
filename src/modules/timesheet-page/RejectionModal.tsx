import React from "react";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const RejectionModal = (props: any) => {
  const {
    openRejectionModal,
    setOpenRejectionModal,
    reasonOfRejection,
    setReasonOfRejection,
    handleRejectTimesheet,
  } = props;
  return (
    <Modal
      open={openRejectionModal}
      //onClose={()=>{setOpenRejectionModal(false)}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton
          sx={{ position: "absolute", right: 0, top: 0 }}
          data-testid="cancel-modal"
          onClick={() => {
            setOpenRejectionModal(false);
          }}
        >
          <CancelIcon />
        </IconButton>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>Confirm Rejection With Reason</Typography>
          <Box sx={{ display: "flex" }}>
            <TextField
              //rows="5"
              value={reasonOfRejection}
              onChange={(e) => setReasonOfRejection(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                if (reasonOfRejection !== "") {
                  handleRejectTimesheet();
                  setReasonOfRejection("");
                }
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default RejectionModal;
