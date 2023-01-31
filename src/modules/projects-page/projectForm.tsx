import Input from "@mui/material/Input";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import Divider from "@mui/material/Divider";
import { CREATE_PROJECT, UPDATE_PROJECT_BY_ID } from "./actions/projectTypes";
import { setProjectSlice } from "./reducers/project";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";

const MyForm = () => {
  const project = useSelector((state: any) => state.project);
  const dispatch = useDispatch();
  const handleChange = (prop: any) => (event: any) => {
    dispatch(setProjectSlice({ ...project, [prop]: event.target.value }));
  };

 const initialState=[{
  id:0,
  projectName:'',
  description:'',
  start_date:'',
  end_date:'',
  status :'',
  manager_id:'',
  is_active:''
}]

  const handleSubmit = () => {
    project.id === 0
      ? dispatch({ type: CREATE_PROJECT, project: { ...project } })
      : dispatch({ type: UPDATE_PROJECT_BY_ID, project });

    dispatch(
      setProjectSlice({
        id:0,
        projectName:'',
        description:'',
        start_date:'',
        end_date:'',
        status :'',
        manager_id:'',
        is_active:''
    })
    );
  };
  return (
    <>
      <>
        {/* <Input style={{ margin: "10px" }} value={project.id} placeholder="Id" fullWidth disabled/> */}

        <TextField
          style={{ margin: "10px"}}
          onChange={handleChange("projectName")}
          placeholder="Enter Project"
          value={project.projectName}
          
        />
        <TextField
          style={{ margin: "10px" }}
          onChange={handleChange("description")}
          placeholder="Enter Description"
          value={project.description}
        />
        <br />
        <TextField
          style={{ margin: "10px" }}
          onChange={handleChange("start_date")}
          placeholder="Enter Start Date"
          value={project.start_date}
        />
        <TextField
          style={{ margin: "10px" }}
          onChange={handleChange("end_date")}
          placeholder="Enter End Date"
          value={project.end_date}
        />
        <br/>
        <TextField
          style={{ margin: "10px" }}
          onChange={handleChange("status")}
          placeholder="Enter Status"
          value={project.status}
        />
        <TextField
          style={{ margin: "10px" }}
          onChange={handleChange("manager_id")}
          placeholder="Enter Manager Name"
          value={project.manager_id}
        />
        <br/>

        <Box>
        <Button
          style={{ margin: "10px" }}
          onClick={() => handleSubmit()}
          
          variant="contained"
        >
          Add
        </Button>
        <Button
          style={{ margin: "10px" }}
          onClick={() => dispatch(
            setProjectSlice({
              id:0,
              projectName:'',
              description:'',
              start_date:'',
              end_date:'',
              status :'',
              manager_id:'',
              is_active:''
          })
          )}
        
          variant="contained"
        >
          Reset
        </Button>
        </Box>
      </>
    </>
  );
};
export default MyForm;


