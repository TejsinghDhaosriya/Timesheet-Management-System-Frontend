import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import CancelIcon from "@mui/icons-material/Cancel";

const TimesheetForm = (props: any) => {
  const initialFormState = {
    description: {
      value: "",
      error: false,
      errorMessage: "You must enter a description",
    },
    date: {
      value: props.dateSelected,
    },
    startTime: {
      value: new Date(),
      error: false,
      errorMessage: "You must enter your start time",
    },
    endTime: {
      value: new Date(),
      error: false,
      errorMessage: "You must enter your end time cannot be same as start time",
    },
    overTime: {
      value: "",
      error: false,
      errorMessage: "You must enter your overtime hours",
    },
  };
  const { openStatus, dateSelected, setDateSelected } = props;
  const [formValues, setFormValues] = useState<any>(initialFormState);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
        error: false,
      },
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { description, startTime, endTime, overTime } = formValues;
    let newFormValues = { ...formValues };

    if (description.value === "") {
      console.log("description", description);
      newFormValues = {
        ...newFormValues,
        description: {
          ...newFormValues["description"],
          error: true,
        },
      };
    }
    if (overTime.value === "") {
      console.log("overtime", overTime);
      newFormValues = {
        ...newFormValues,
        overTime: {
          ...newFormValues["overTime"],
          error: true,
        },
      };
    }
    if (JSON.stringify(startTime.value) === JSON.stringify(endTime.value)) {
      newFormValues = {
        ...newFormValues,
        endTime: {
          ...newFormValues["endTime"],
          error: true,
          value: "",
          errorMessage: "Please Change End Time",
        },
        startTime: {
          ...newFormValues["startTime"],
          error: true,
          value: "",
        },
      };

      setFormValues(newFormValues);
    }
    if (
      description.value !== "" &&
      overTime.value !== "" &&
      startTime.value !== "" &&
      endTime.value !== ""
    ) {
      //console.log("Form submit successfully");
      const timesheetData = {
        date: dateSelected,
        timesheetInfo: {
          description: newFormValues.description.value,
          startTime: newFormValues.startTime.value,
          endTime: newFormValues.endTime.value,
          overTime: newFormValues.overTime.value,
        },
        timeSheetSubmitted:true
      };
      props.setSelectedDateArray([...props.selectedDateArray,timesheetData]);
      resetAllFields();
      props.setFormFilledStatus(true);
    }
  };

  const resetAllFields = () => {
    setFormValues(initialFormState);
  };

  return (
    <Box sx={{}}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "1rem",
        }}
      >
        <Typography variant="h5">Time Sheet Information</Typography>
        <IconButton onClick={props.closeModal}>
          <CancelIcon />
        </IconButton>
      </Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          value={formValues.description.value}
          sx={{ mb: 2 }}
          label="Description"
          fullWidth
          required
          error={formValues.description.error}
          name="description"
          id={"outlined-error-helper-text"}
          helperText={
            formValues.description.error
              ? formValues.description.errorMessage
              : ""
          }
          onChange={handleChange}
        />
        <TextField
          disabled
          sx={{ mb: 2 }}
          id="outlined-disabled"
          label="Date"
          defaultValue={formValues.date.value}
          fullWidth
          name="date"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            value={formValues.startTime.value}
            label="Start Time"
            onChange={(value) => {
              setFormValues({
                ...formValues,
                startTime: {
                  ...formValues["startTime"],
                  value,
                  error: false,
                },
              });
            }}
            renderInput={(params) => (
              <TextField
                id={"outlined-error-helper-text"}
                helperText={
                  formValues.startTime.error
                    ? formValues.startTime.errorMessage
                    : ""
                }
                error={formValues.startTime.error}
                sx={{ mb: 2 }}
                {...params}
              />
            )}
          />
          <TimePicker
            value={formValues.endTime.value}
            label="End Time"
            onChange={(value) => {
              setFormValues({
                ...formValues,
                endTime: {
                  ...formValues["endTime"],
                  value,
                  error: false,
                },
              });
            }}
            renderInput={(params) => (
              <TextField
                id={"outlined-error-helper-text"}
                helperText={
                  formValues.endTime.error
                    ? formValues.endTime.errorMessage
                    : ""
                }
                error={formValues.endTime.error}
                sx={{ mb: 2 }}
                {...params}
              />
            )}
          />
        </LocalizationProvider>
        <TextField
          value={formValues.overTime.value}
          sx={{ mb: 2 }}
          label="Overtime Hours"
          fullWidth
          required
          onChange={handleChange}
          error={formValues.overTime.error}
          name="overTime"
        />
        <Button
          type="submit"
          variant="outlined"
          color="secondary"
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default TimesheetForm;
