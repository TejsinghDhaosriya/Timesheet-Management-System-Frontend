import { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import TimesheetForm from "../modules/timesheet-page/TimesheetForm";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const FormModal = (props: any) => {
  const {
    dateSelectedStatus,
    dateSelected,
    setDateSelectedStatus,
    formattedDate,
    setSelectedDate,
  } = props;
  const [openModal, setOpenModal] = useState(true);
  const [formFilledStatus, setFormFilledStatus] = useState(false);
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
    //setDateSelectedStatus(false);
  };
  useEffect(() => {
    if (openModal) {
      handleClose();
    } else {
      if (dateSelected) {
        handleOpen();
      }
    }
  }, [dateSelected]);

  useEffect(() => {
    if (formFilledStatus) {
      setTimeout(() => {
        setFormFilledStatus(false);
        handleClose();
      }, 1000);
    }
  }, [formFilledStatus]);
  return (
    <Modal
      data-testid="timesheet-modal"
      open={openModal}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width:"80%" }}>
        <TimesheetForm
          {...props}
          setFormFilledStatus={(value: boolean) => setFormFilledStatus(value)}
          closeModal={handleClose}
        />
      </Box>
    </Modal>
  );
};
export default FormModal;
