import Input from "@mui/material/Input";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import Divider from "@mui/material/Divider";
import { CREATE_PROJECT, UPDATE_PROJECT_BY_ID } from "./actions/projectTypes";
import { setProjectSlice } from "./reducers/project";
import { Box } from "@mui/system";
import { FormControl, MenuItem, Select, TextField, Typography } from "@mui/material";
import { intialState } from "./ProjectState";

const MyForm = () => {
  const project = useSelector((state: any) => state.project);
  const dispatch = useDispatch();

  const handleChange = (prop: any) => (event: any) => {
    if (event.target.name === "statusId" || event.target.name === "Manager") {
      const x = parseInt(event.target.value);
      dispatch(setProjectSlice({ ...project, [prop]: x }));
    } else {
      dispatch(setProjectSlice({ ...project, [prop]: event.target.value }));
    }
  };

  const handleSubmit = () => {
    console.log(project);
    project.id === 0
      ? dispatch({ type: CREATE_PROJECT, project: { ...project } })
      : dispatch({ type: UPDATE_PROJECT_BY_ID, project });

    dispatch(
      setProjectSlice(intialState)
    );
  };

  return (
    <>
      <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "left",
          mb: "1rem",
          
          
        }}>
        {/* <Input style={{ margin: "10px" }} value={project.id} placeholder="Id" fullWidth disabled/> */}
        <Typography variant="h5">Project</Typography>
        <TextField
          style={{ margin: "10px",width:"100%" }}
          onChange={handleChange("name")}
          placeholder="Enter Project"
          value={project.name}
        />
        <Typography variant="h5">Description</Typography>
        <TextField
          style={{ margin: "10px" ,width:"100%"}}
          onChange={handleChange("description")}
          placeholder="Enter Description"
          value={project.description}
        />
        
        <Typography variant="h5">Start Date</Typography>
        <TextField
          required
          type="date"
          style={{ margin: "10px" ,width:"100%" }}
          onChange={handleChange("startDate")}
          placeholder="Enter Start Date"
          value={project.startDate}
        /> 
        <Typography variant="h5">End Date</Typography>
        <TextField
          type="date"
          style={{ margin: "10px",width:"100%" }}
          onChange={handleChange("endDate")}
          placeholder="Enter End Date"
          value={project.endDate}
        />
        {/* <TextField
          label="Status"
          name="statusId"
          type='number'
          style={{ margin: "10px" }}
          onChange={handleChange("status")}
          placeholder="Enter Status"
          value={project.status}
        /> */}
        <Typography variant="h5">Status</Typography>
        <Select
          label="status"
          placeholder="Status"
          onChange={handleChange("status")}
          name="statusId"
          value={project.status}
          sx={{
            width:"100%",
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

        {/* <TextField
          label="Manager"
          name="Manager"
          type="number"
          style={{ margin: "10px" }}
          onChange={handleChange("managerId")}
          value={project.managerId}
        /> */}

        <Typography variant="h5">Manager</Typography>
        <Select
          placeholder="Manager"
          defaultValue="select"
          onChange={handleChange("managerId")}
          name="Manager"
          value={project.managerId}
          sx={{
            width:"100%",
            height: 50,
          }}
        >
          <MenuItem value="0">Manager 1</MenuItem>
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
          {project.id===0?"Add":"Update"}
          </Button>
          <Button
            style={{ margin: "10px" }}
            onClick={() =>
              dispatch(
                setProjectSlice(intialState)
              )
            }
            variant="contained"
          >
            Reset
          </Button>
        </Box>
      </ Box>
    </>
  );
};
export default MyForm;
