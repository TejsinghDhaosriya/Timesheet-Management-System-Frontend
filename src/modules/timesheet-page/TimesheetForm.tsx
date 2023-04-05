import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  checkApprovalInSelectedDateArray,
  checkDateInSelectedDateArray2,
  formSubmittedStatusHelper,
  getOnlyApprovalsList,
  updateCalendarByWeekOnApproveOrReject,
} from "./helper";
import {
  CREATE_TIMESHEET,
  DELETE_TIMESHEET,
  GET_TIMESHEETS,
  UPDATE_TIMESHEET,
} from "./actions/timesheetTypes";
import { GET_PROJECTS } from "../projects-page/actions/projectTypes";
import KeyCloakService from "../../security/keycloakService";
import { GET_APPROVALS, GET_APPROVALS_WEEK, UPDATE_APPROVAL } from "../approvals-page/actions/approvalTypes";
import RejectionModal from "./RejectionModal";
import Alert from '@mui/material/Alert';

const TimesheetForm = (props: any) => {
  const dispatch = useDispatch();
  const getProjectInfo: any = useSelector<any>(
    (state) => state.timesheet.project_info
  );
  const getProjectInfoo = useSelector((state: any) => state.projects);

  const pId = KeyCloakService.CallUserProject();
  const user = KeyCloakService.CallUserId();
  const orgId = KeyCloakService.CallOrganizationId();
  const proj = getProjectInfoo?.filter((proje: any) => proje.id === pId);
  const [showRejectionMore,setShowRejectionMore] = useState(false)

  let formSubmittedStatus = formSubmittedStatusHelper(
    props.selectedDateArray,
    props.dateSelected
  );

  const initialFormState = {
    project_name: {
      value: proj[0]?.name||"",
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
  const [editApproved,setEditApproved] = useState(false);
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
    if (description.value === "") {
      newFormValues = {
        ...newFormValues,
        description: {
          ...newFormValues["description"],
          error: true,
        },
      };
    }
    if (totalHours.value === "") {
      newFormValues = {
        ...newFormValues,
        totalHours: {
          ...newFormValues["totalHours"],
          error: true,
        },
      };
    }
    if (project_manager.value.length === 0) {
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
      project_manager.value.length !== 0 &&
      project_manager.value.length <= 2
    ) {
      const timesheetData = {
        date: dayjs(dateSelected).format("YYYY-MM-DD"),
        description: newFormValues.description.value,
        totalHours: Number(newFormValues.totalHours.value),
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
        dispatch({
          type: CREATE_TIMESHEET,
          timesheetData,
          user: user,
          orgId: orgId,
          pId: pId,
          
        });
      }
      resetAllFields();
      setEditFormStatus(false);
    }

    setFormValues(newFormValues);
  };

  const resetAllFields = () => {
    setFormValues(initialFormState);
  };
  useEffect(() => {
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
          //value: getProjectInfo.project_name,
          value: proj[0]?.name,
        },
        project_manager: {
          value: getProjectInfo.project_manager,
        },
      };
      setFormValues(editFormValues);
    }
  }, [editFormStatus]);

  // Timesheet module logic
  const [openRejectionModal,setOpenRejectionModal] = useState(false);
  const [reasonOfRejection,setReasonOfRejection] = useState('');
  const approvedTimesheetDateArray = useSelector((state: any) => state.approvals);
  const approvedTimesheetItem = checkApprovalInSelectedDateArray(approvedTimesheetDateArray,dayjs(props.dateSelected).format("YYYY-MM-DD"))
   const handleApproveTimeSheet = ()=>{
    dispatch({
      type: UPDATE_APPROVAL,
      approval: { ...approvedTimesheetItem, status: 1,reasonForRejection:null },
    });
    props.setApprovedStatus(true);
    const getStartAndEndDate = updateCalendarByWeekOnApproveOrReject(props.dateSelected);
    setTimeout(()=>{
      dispatch({
        type: GET_APPROVALS_WEEK,
        startDate: getStartAndEndDate.startDate,
        endDate: getStartAndEndDate.endDate,
        userId:user,
        orgId:orgId
    });
    },2000)
   }

   const handleRejectTimesheet = () =>{
    //openRejectionModal
    //setOpenRejectionModal(true);
    dispatch({
      type: UPDATE_APPROVAL,
      approval: { ...approvedTimesheetItem, status: 2, reasonForRejection: reasonOfRejection },
    });
    props.setApprovedStatus(true);
    const getStartAndEndDate = updateCalendarByWeekOnApproveOrReject(props.dateSelected);
    setTimeout(()=>{
      dispatch({
        type: GET_APPROVALS_WEEK,
        startDate: getStartAndEndDate.startDate,
        endDate: getStartAndEndDate.endDate,
        userId:user,
        orgId:orgId
    });
    },2000)
   }

  const userRoles: string[] | undefined = KeyCloakService.GetUserRoles();
  const isManager = userRoles?.some(userRole => userRole.includes('Manager'));

  // Timesheet module logic 
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
        <Typography sx={{fontSize:{xs:'18px',sm:'1.5rem'}}} data-testid="timesheet-form-header" variant="h5">Time Sheet Information</Typography>
        <Box sx={{position:{xs:'',lg:'absolute'},right:{sm:'70px'}}}>
          {!!formSubmittedStatus && props.module==='timesheet' && isManager? (
          <>
            <IconButton
              onClick={() => {
                const x = checkDateInSelectedDateArray2(
                  props.selectedDateArray,
                  props.dateSelected
                );
                dispatch({ type: DELETE_TIMESHEET, id: x });
                props.closeModal();
              }}
              data-testid="delete-btn"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setEditFormStatus(true);
                setEditDropdown(true);
              }}
              data-testid="edit-btn"
            >
              <EditIcon />
            </IconButton>
          </>
        ) : null}
        {props.module==='approvals' && <>
          <IconButton
          onClick={() => {
            //setEditFormStatus(true);
            //setEditDropdown(true);
            setEditApproved(true)
          }}
          data-testid="edit-btn"
        >
          <EditIcon />
        </IconButton></>}
        <IconButton data-testid="cancel-modal" onClick={props.closeModal}>
          <CancelIcon />
        </IconButton>
        </Box>
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
          inputProps={{ "data-testid": "projectName" }}
        />
        <TextField
          value={formValues.description.value}
          sx={{mb: 2 }}
          multiline
          minRows={6}
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
            !editFormStatus
          }
          inputProps={{ "data-testid": "description" }}
        />
        <TextField
          disabled
          sx={{ mb: 2 }}
          id="outlined-disabled"
          label="Date"
          defaultValue={formValues.date.value}
          fullWidth
          name="date"
          inputProps={{ "data-testid": "date" }}
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
            !editFormStatus
          }
          id={"outlined-error-helper-text"}
          helperText={
            formValues.totalHours.error
              ? formValues.totalHours.errorMessage
              : ""
          }
          inputProps={{ "data-testid": "totalHours" }}
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
            {["Rohit", "Siddarth", "Rajneesh"].map((name) => {
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

        {props.module ==='approvals' ?<>
<Button sx={{mr:2}} disabled={!editApproved} type="button" variant="outlined" color="secondary" onClick={handleApproveTimeSheet}>Approve</Button>
<Button disabled={!editApproved} type="button" variant="outlined" color="secondary" onClick={()=>setOpenRejectionModal(true)}>Reject</Button>     
</>:
              <Button
              type="submit"
              variant="outlined"
              color="secondary"
              disabled={
                !!formSubmittedStatus &&
                !editFormStatus
              }
              data-testid="submit-btn"
            >
            {editFormStatus ? "Update" : "Create"}
          </Button>
        }
        {approvedTimesheetItem?.status===2 && <><Alert severity="error" sx={{mt:2}}>Reason for rejection: { showRejectionMore ? approvedTimesheetItem.reasonForRejection:approvedTimesheetItem.reasonForRejection.substring(0,25)}<Typography component={"span"} sx={{ml:1,p:0,color:'#2196f3'}} onClick={() => setShowRejectionMore(!showRejectionMore)}>{showRejectionMore?"show less":"...show more"}</Typography></Alert></>} 
        {approvedTimesheetItem?.status===1 && <><Alert severity="success" sx={{mt:2}}>Approved</Alert></>}   
        {props.module ==='approvals'?<RejectionModal openRejectionModal={openRejectionModal} setOpenRejectionModal={setOpenRejectionModal} reasonOfRejection={reasonOfRejection} setReasonOfRejection={setReasonOfRejection} handleRejectTimesheet={handleRejectTimesheet} />:<></>}
        
      </Box>
    </Box>
  );
};

export default TimesheetForm;
