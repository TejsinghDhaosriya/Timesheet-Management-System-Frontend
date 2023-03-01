import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import dayjs, { Dayjs } from "dayjs";
import {
  checkDateInSelectedDateArray2,
  formSubmittedStatusHelper,
} from "./helper";
import {
  CREATE_TIMESHEET,
  DELETE_TIMESHEET,
  UPDATE_TIMESHEET,
} from "./actions/timesheetTypes";
import { GET_PROJECTS } from "../projects-page/actions/projectTypes";
import KeyCloakService from "../../security/keycloakService";

const TimesheetForm = (props: any) => {
  const dispatch = useDispatch();
  //const getSelectedDateArray = useSelector<any>((state) => state);
  const getProjectInfo: any = useSelector<any>(
    (state) => state.timesheet.project_info
  );
  const getProjectInfoo = useSelector((state: any) => state.projects);
  
  const pId = KeyCloakService.CallUserProject();
  const user = KeyCloakService.CallUserId();
  const proj = getProjectInfoo.filter((proje: any) => proje.id === pId);

  useEffect((): any => {
    console.log(props, "check");
    console.log(proj,"check")
    dispatch({ type: GET_PROJECTS });
  }, []);

  let formSubmittedStatus = formSubmittedStatusHelper(
    props.selectedDateArray,
    props.dateSelected
  );
  
  const initialFormState = {
    project_name: {
      value: "Project Name",
      error: false,
    },
    project_manager: {
      value: getProjectInfo.project_manager,
      error: false,
      errorMessage: "Please select a manager",
    },
    description: {
      value: "",
      error: false,
      errorMessage: "You must enter a description",
    },
    date: {
      value: props.dateSelected,
    },
    totalHours: {
      value: "",
      error: false,
      errorMessage: "You must enter your total hours spent",
    },
  };
  const [initialState, setInitialState] = useState(initialFormState);
  const { dateSelected } = props;
  const [formValues, setFormValues] = useState<any>(initialState);
  const [editFormStatus, setEditFormStatus] = useState<any>(false);
  const [editDropdown, setEditDropdown] = useState(false);
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
    const { description, totalHours, project_manager } = formValues;
    let newFormValues = { ...formValues };
    //console.log("newFormValues",newFormValues);
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
    if (totalHours.value === "") {
      //console.log("overtime", totalHours);
      newFormValues = {
        ...newFormValues,
        totalHours: {
          ...newFormValues["totalHours"],
          error: true,
        },
      };
    }
    if (project_manager.value.length == 0) {
      newFormValues = {
        ...newFormValues,
        project_manager: {
          ...newFormValues["project_manager"],
          error: true,
          errorMessage: "Please select a manager",
        },
      };
    }
    if (project_manager.value.length > 2) {
      newFormValues = {
        ...newFormValues,
        project_manager: {
          ...newFormValues["project_manager"],
          error: true,
          errorMessage: "Only 2 managers are allowed",
        },
      };
    }
    if (
      description.value !== "" &&
      totalHours.value !== "" &&
      project_manager.value.length != 0 &&
      project_manager.value.length <= 2
    ) {
      //console.log("Form submit successfully");
      const timesheetData = {
        date: dayjs(dateSelected).format("YYYY-MM-DD"),
        description: newFormValues.description.value,
        totalHours: Number(newFormValues.totalHours.value),
        // timeSheetSubmitted: true,
        project_name: formValues.project_name.value,
        CreatedBy: user,
        // project_manager: formValues?.project_manager.value,
      };
      props.setSelectedDateArray([...props.selectedDateArray, timesheetData]);
      props.setFormFilledStatus(true);

      if (editFormStatus) {
        const id = checkDateInSelectedDateArray2(
          props.selectedDateArray,
          dateSelected
        );
        const tData = {
          id,
          timesheetData,
        };
        dispatch({ type: UPDATE_TIMESHEET, tData });
      } else {
        dispatch({ type: CREATE_TIMESHEET, timesheetData });
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
  useEffect(() => {
    // console.log("useffect called when formSTatus submiied chencged");
    if (!!formSubmittedStatus) {
      let editFormValues = {
        ...formValues,
        description: {
          ...formValues["description"],
          value: formSubmittedStatus?.description,
        },
        totalHours: {
          ...formValues["totalHours"],
          value: formSubmittedStatus?.totalHours,
        },
        project_name: {
          value: getProjectInfo.project_name,
        },
        project_manager: {
          value: getProjectInfo.project_manager,
        },
      };
      setFormValues(editFormValues);
    }
  }, [editFormStatus]);
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
        {!!formSubmittedStatus ? (
          <>
            <IconButton
              onClick={() => {
                //dispatch(deleteTimesheetData(props.dateSelected));
                const x = checkDateInSelectedDateArray2(
                  props.selectedDateArray,
                  props.dateSelected
                );
                dispatch({ type: DELETE_TIMESHEET, id: x });
                props.closeModal();
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setEditFormStatus(true);
                setEditDropdown(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </>
        ) : (
          <></>
        )}
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
          value={formValues.project_name.value}
          sx={{ mb: 2 }}
          label="Project Name"
          fullWidth
          name="project_name"
          disabled
        />
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
            // formSubmittedStatus.timeSheetSubmitted &&
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
        <TextField
          type="number"
          value={formValues.totalHours.value}
          sx={{ mb: 2 }}
          label="Total Hours"
          fullWidth
          required
          onChange={handleChange}
          error={formValues.totalHours.error}
          name="totalHours"
          disabled={
            !!formSubmittedStatus &&
            // formSubmittedStatus.timeSheetSubmitted &&
            !editFormStatus
          }
          id={"outlined-error-helper-text"}
          helperText={
            formValues.totalHours.error
              ? formValues.totalHours.errorMessage
              : ""
          }
        />
        <FormControl
          sx={{ mb: 2 }}
          disabled={!editDropdown}
          error={formValues.project_manager.error}
          fullWidth
        >
          <InputLabel id="demo-simple-select-error-label">
            Project Manager
          </InputLabel>
          <Select
            labelId="demo-simple-select-error-label"
            id="demo-simple-select-error"
            value={formValues.project_manager.value}
            label="Project Manager"
            onChange={handleChange}
            multiple
            name="project_manager"
          >
            {["Karan", "Arjun", "Rahul", "<some_name>"].map((name) => {
              return (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              );
            })}
          </Select>
          {formValues.project_manager.error ? (
            <FormHelperText>
              {formValues.project_manager.errorMessage}
            </FormHelperText>
          ) : (
            <></>
          )}
        </FormControl>
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
          {editFormStatus ? "Update" : "Create"}
        </Button>
      </Box>
    </Box>
  );
};

export default TimesheetForm;
