import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  addTimesheetData,
  deleteTimesheetData,
  updateTimesheetData,
} from "./timesheetSlice";
import dayjs, { Dayjs } from "dayjs";
import { formSubmittedStatusHelper } from "./helper";

const TimesheetForm = (props: any) => {
  const dispatch = useDispatch();
  const getSelectedDateArray = useSelector<any>((state) => state);
  let formSubmittedStatus = formSubmittedStatusHelper(
    props.selectedDateArray,
    props.dateSelected
  );
  // const dateFormatted = `${props.dateSelected.slice(4,6)}${props.dateSelected.slice(0,3)}${props.dateSelected.slice(6)}`;
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
      value: null,
      error: false,
      errorMessage: "You must enter your start time",
    },
    endTime: {
      value: null,
      error: false,
      errorMessage: "You must enter your end time cannot be same as start time",
    },
    overTime: {
      value: "",
      error: false,
      errorMessage: "You must enter your overtime hours",
    },
  };

  const [initialState, setInitialState] = useState(initialFormState);
  const { dateSelected } = props;
  const [formValues, setFormValues] = useState<any>(initialState);
  const [editFormStatus, setEditFormStatus] = useState<any>(false);

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
    let newFormValues = {...formValues};
    //console.log(newFormValues);
    // let editFromValues = {
    //   ...formValues,
    //     description:{
    //       ...newFormValues["description"],
    //       value:formSubmittedStatus?.timesheetInfo.description
    //     },
    //     startTime:{
    //       ...newFormValues["startTime"],
    //       value:formSubmittedStatus?.timesheetInfo.startTime
    //     },
    //     endTime:{
    //       ...newFormValues["endTime"],
    //       value:formSubmittedStatus?.timesheetInfo.endTime
    //     },
    //     overTime:{
    //       ...newFormValues["overTime"],
    //       value:formSubmittedStatus?.timesheetInfo.overTime
    //     },
    //   }
    // newFormValues= editFormStatus ? editFromValues: { ...formValues };
    if (description.value === "") {
      //console.log("description", description);
      newFormValues = {
        ...newFormValues,
        description: {
          ...newFormValues["description"],
          error: true,
        },
      };
    }
    if (overTime.value === "") {
      //console.log("overtime", overTime);
      newFormValues = {
        ...newFormValues,
        overTime: {
          ...newFormValues["overTime"],
          error: true,
        },
      };
    }
    if (startTime.value === null) {
      //console.log("startTime", startTime);
      newFormValues = {
        ...newFormValues,
        startTime: {
          ...newFormValues["startTime"],
          error: true,
          value: "",
          errorMessage: "Please Enter Start Time ",
        },
      };
    }
    if (endTime.value === null) {
      newFormValues = {
        ...newFormValues,
        endTime: {
          ...newFormValues["endTime"],
          error: true,
          value: "",
          errorMessage: "Please Enter End Time ",
        },
      };
    }
    // if ((JSON.stringify(startTime.value) === JSON.stringify(endTime.value))
    // // || ( new Date(startTime.value).getTime() > new Date(endTime.value).getTime() )
    // )
    // {
    //   newFormValues = {
    //     ...newFormValues,
    //     endTime: {
    //       ...newFormValues["endTime"],
    //       error: true,
    //       value: "",
    //       errorMessage: "End Time Incorrect",
    //     },
    //     startTime: {
    //       ...newFormValues["startTime"],
    //       error: false,
    //       value: "",
    //     },
    //   };
    // }
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
        timeSheetSubmitted: true,
      };
      props.setSelectedDateArray([...props.selectedDateArray, timesheetData]);
      props.setFormFilledStatus(true);

      if(editFormStatus){
        dispatch(updateTimesheetData(timesheetData))
      }else{
        dispatch(addTimesheetData(timesheetData));
      }
      //console.log(timesheetData);
      resetAllFields();
      setEditFormStatus(false);
    }

    setFormValues(newFormValues);
  };

  const resetAllFields = () => {
    setFormValues(initialFormState);
  };
  useEffect(()=>{
    // console.log("useffect called when formSTatus submiied chencged");
      if(!!formSubmittedStatus && formSubmittedStatus.timeSheetSubmitted){
        let editFormValues = {
          ...formValues,
            description:{
              ...formValues["description"],
              value:formSubmittedStatus?.timesheetInfo.description
            },
            startTime:{
              ...formValues["startTime"],
              value:formSubmittedStatus?.timesheetInfo.startTime
            },
            endTime:{
              ...formValues["endTime"],
              value:formSubmittedStatus?.timesheetInfo.endTime
            },
            overTime:{
              ...formValues["overTime"],
              value:formSubmittedStatus?.timesheetInfo.overTime
            },
          }
        setFormValues(editFormValues);
      }
  },[editFormStatus])
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
        {!!formSubmittedStatus ? (
          <>
            <IconButton
              onClick={() => {
                setEditFormStatus(true);
                //getDetailsOfTimeSheetSelected();
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                dispatch(deleteTimesheetData(props.dateSelected));
                props.closeModal();
              }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        ) : (
          <></>
        )}
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
          disabled={
            !!formSubmittedStatus &&
            formSubmittedStatus.timeSheetSubmitted &&
            !editFormStatus
          }
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
            disabled={
              !!formSubmittedStatus &&
              formSubmittedStatus.timeSheetSubmitted &&
              !editFormStatus
            }
            value={formValues.startTime.value}
            label="Start Time"
            onChange={(
              value: Dayjs | null,
              keyboardInputValue?: string | undefined
            ) => {
              const dateFormatted = `${props.dateSelected.slice(
                4,
                6
              )}${props.dateSelected.slice(0, 3)}${props.dateSelected.slice(
                6
              )}`;
              setFormValues({
                ...formValues,
                startTime: {
                  ...formValues["startTime"],
                  //value:new Date(dayjs(value).toDate()),
                  value: new Date(
                    `${dayjs(dateFormatted)
                      .toDate()
                      .toString()
                      .slice(0, 15)} ${value?.format("hh:mm:ss a")} GMT+0530`
                  ).toString(),
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
            disabled={
              !!formSubmittedStatus &&
              formSubmittedStatus.timeSheetSubmitted &&
              !editFormStatus
            }
            value={ formValues.endTime.value}
            label="End Time"
            onChange={(value) => {
              const dateFormatted = `${props.dateSelected.slice(
                4,
                6
              )}${props.dateSelected.slice(0, 3)}${props.dateSelected.slice(
                6
              )}`;
              setFormValues({
                ...formValues,
                endTime: {
                  ...formValues["endTime"],
                  value: new Date(
                    `${dayjs(dateFormatted)
                      .toDate()
                      .toString()
                      .slice(0, 15)} ${value?.format("hh:mm:ss a")} GMT+0530`
                  ).toString(),
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
          value={formValues.overTime.value }
          sx={{ mb: 2 }}
          label="Overtime Hours"
          fullWidth
          required
          onChange={handleChange}
          error={formValues.overTime.error}
          name="overTime"
          disabled={
            !!formSubmittedStatus &&
            formSubmittedStatus.timeSheetSubmitted &&
            !editFormStatus
          }
        />
        <Button
          type="submit"
          variant="outlined"
          color="secondary"
          disabled={
            !!formSubmittedStatus &&
            formSubmittedStatus.timeSheetSubmitted &&
            !editFormStatus
          }
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default TimesheetForm;
