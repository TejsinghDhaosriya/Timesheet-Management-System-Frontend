import { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import TimesheetForm from "../modules/timesheet-page/TimesheetForm";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  maxHeight:'100%'
};

const FormModal = (props: any) => {
  const {
    dateSelectedStatus,
    dateSelected,
    setDateSelectedStatus,
    formattedDate,
    setSelectedDate,
  } = props;
  const [openModal, setOpenModal] = useState(false);
  const [formFilledStatus, setFormFilledStatus] = useState(false);
  const [approvedStatus, setApprovedStatus] = useState(false);
  const formSubmittedStatus = props.selectedDateArray?.find(
    (dateSelect: any) => {
      return (
        dateSelect.timeSheetSubmitted === true &&
        dateSelect.date === dateSelected
      );
    }
  );
  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
    setSelectedDate("");
    setDateSelectedStatus(false);
  };
  useEffect(() => {
    if (openModal) {
      handleClose();
    } else {
      if (dateSelected && dateSelectedStatus) {
        handleOpen();
      }
    }
  }, [dateSelected,dateSelectedStatus]);

  useEffect(() => {
    if (formFilledStatus) {
      setTimeout(() => {
        setFormFilledStatus(false);
        handleClose();
      }, 1000);

    }

    if (approvedStatus) {
      setTimeout(() => {
        setApprovedStatus(false);
        handleClose();
      }, 1000);

    }
  }, [formFilledStatus,approvedStatus]);
  return (
    <Modal
      data-testid="timesheet-modal"
      open={openModal}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style,maxHeight:{xs:'90%',md:"100%"},overflowY:{xs:'scroll',md:"none",lg:'none'} }}>
        <TimesheetForm
          {...props}
          setFormFilledStatus={(value: boolean) => setFormFilledStatus(value)}
          setApprovedStatus={(value: boolean) => setApprovedStatus(value)}
          closeModal={handleClose}
        />
      </Box>
    </Modal>
  );
};
export default FormModal;
