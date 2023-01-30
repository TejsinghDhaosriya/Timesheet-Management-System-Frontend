import React, { useEffect, useState } from "react";
import { Box, Modal, Button, Typography, IconButton } from "@mui/material";
import TimesheetForm from "../modules/timesheet-page/TimesheetForm";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
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
  const { dateSelectedStatus, dateSelected, setDateSelectedStatus, formattedDate,setSelectedDate } = props;
  const [openModal, setOpenModal] = useState(dateSelectedStatus);
  const [formFilledStatus, setFormFilledStatus] = useState(false);
  const formSubmittedStatus = props.selectedDateArray.find((dateSelect:any)=>{
    return (dateSelect.timeSheetSubmitted===true && dateSelect.date===dateSelected);
  });
  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
    setSelectedDate("");
    setDateSelectedStatus(false);
  };
  useEffect(() => {
    //console.log('useffect running ... ')
    const dateFormatted = `${dateSelected.slice(4,6)}${dateSelected.slice(0,3)}${dateSelected.slice(6)}`;
    if (openModal) {
      handleClose();
    } else {
      if (dateSelectedStatus && (new Date(dateFormatted).getTime()<new Date().getTime()) ) {
        handleOpen();
      }
    }
    
  }, [dateSelected,dateSelectedStatus]);

  useEffect(()=>{
    if(formFilledStatus){
      setTimeout(()=>{
        setFormFilledStatus(false);
        handleClose()
      },3000)
    }
  },[formFilledStatus])
  return (
    <Modal
      open={openModal}
      //onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 500 }}>
        {!formFilledStatus ? (
          <TimesheetForm
            {...props}
            setFormFilledStatus={(value: boolean) => setFormFilledStatus(value)}
            closeModal={handleClose}
          />
        ) : (
          <Typography variant="h6" sx={{display:"flex",justifyContent:'space-around',alignItems:'center'}}>
            Time sheet form filled successfully <ThumbUpAltIcon fontSize="large" color="success"/>
          </Typography>
        )}
      </Box>
    </Modal>
  );
};
export default FormModal;
