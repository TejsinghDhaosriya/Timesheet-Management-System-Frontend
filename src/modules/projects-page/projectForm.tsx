import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_PROJECT, UPDATE_PROJECT_BY_ID } from "./actions/projectTypes";
import { setProjectSlice } from "./reducers/project";
import { Box } from "@mui/system";
import { MenuItem, Select, TextField, Typography } from "@mui/material";
import { intialState } from "./ProjectState";
import KeyCloakService from "../../security/keycloakService";

const MyForm = () => {
  const project = useSelector((state: any) => state.project);
  const dispatch = useDispatch();

  const handleChange = (prop: any) => (event: any) => {
    if (event.target.name === "statusId") {
      const x = parseInt(event.target.value);
      dispatch(setProjectSlice({ ...project, [prop]: x }));
    } else {
      dispatch(setProjectSlice({ ...project, [prop]: event.target.value }));
    }
  };
  const orgId = KeyCloakService.CallOrganizationId();
  const handleSubmit = () => {
    project.id === 0
      ? dispatch({
          type: CREATE_PROJECT,
          project: { ...project },
          orgId: orgId,
        })
      : dispatch({ type: UPDATE_PROJECT_BY_ID, project });

    dispatch(setProjectSlice(intialState));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "left",
          mb: "1rem",
        }}
      >
        <Typography variant="h5">Project</Typography>
        <TextField
          style={{ margin: "10px", width: "100%" }}
          onChange={handleChange("name")}
          placeholder="Enter Project"
          value={project.name}
        />
        <Typography variant="h5">Description</Typography>
        <TextField
          style={{ margin: "10px", width: "100%" }}
          onChange={handleChange("description")}
          placeholder="Enter Description"
          value={project.description}
        />

        <Typography variant="h5">Start Date</Typography>
        <TextField
          required
          type="date"
          style={{ margin: "10px", width: "100%" }}
          onChange={handleChange("startDate")}
          placeholder="Enter Start Date"
          value={project.startDate}
        />
        <Typography variant="h5">End Date</Typography>
        <TextField
          type="date"
          style={{ margin: "10px", width: "100%" }}
          onChange={handleChange("endDate")}
          placeholder="Enter End Date"
          value={project.endDate}
        />

        <Typography variant="h5">Status</Typography>
        <Select
          label="status"
          placeholder="Status"
          onChange={handleChange("status")}
          name="statusId"
          value={project.status}
          sx={{
            width: "100%",
            height: 50,
          }}
        >
          <MenuItem value="0">Pending</MenuItem>
          <MenuItem value="1">Paused</MenuItem>
          <MenuItem value="2">Started</MenuItem>
          <MenuItem value="3">Failed</MenuItem>
          <MenuItem value="4">Success</MenuItem>
          <MenuItem value="5">Cancelled</MenuItem>
        </Select>

        <Typography variant="h5">Manager</Typography>
        <Select
          placeholder="Manager"
          defaultValue="select"
          onChange={handleChange("managerId")}
          name="Manager"
          value={project.managerId}
          sx={{
            width: "100%",
            height: 50,
          }}
        >
          <MenuItem value="0df67465-e8b8-423b-9076-122538a6d253">
            Manager 1
          </MenuItem>
          <MenuItem value="1">Manager 2</MenuItem>
          <MenuItem value="2">Manager 3</MenuItem>
        </Select>
        <br />

        <Box>
          <Button
            style={{ margin: "10px" }}
            onClick={() => handleSubmit()}
            variant="contained"
          >
            {project.id === 0 ? "Add" : "Update"}
          </Button>
          <Button
            style={{ margin: "10px" }}
            onClick={() => dispatch(setProjectSlice(intialState))}
            variant="contained"
          >
            Reset
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default MyForm;
