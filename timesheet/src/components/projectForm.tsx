import Input from "@mui/material/Input";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import Divider from "@mui/material/Divider";
import { CREATE_PROJECT, UPDATE_PROJECT_BY_ID } from "../actions/projectTypes";
import { setProjectSlice } from "../reducers/project";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";

const MyForm = () => {
  const project = useSelector((state: any) => state.project);
  const dispatch = useDispatch();
  const handleChange = (prop: any) => (event: any) => {
    dispatch(setProjectSlice({ ...project, [prop]: event.target.value }));
  };
  const handleSubmit = () => {
    project.id === 0
      ? dispatch({ type: CREATE_PROJECT, project: { ...project } })
      : dispatch({ type: UPDATE_PROJECT_BY_ID, project });

    dispatch(
      setProjectSlice({
        id: 0,
        projectName: "",
        companyName: "",
      })
    );
  };
  return (
    <>
      <>
        <Input style={{ margin: "10px" }} value={project.id} placeholder="Id" fullWidth disabled/>

        <TextField
          style={{ margin: "10px" }}
          onChange={handleChange("projectName")}
          placeholder="Enter Project"
          value={project.projectName}
          fullWidth
        />
        <TextField
          style={{ margin: "10px" }}
          onChange={handleChange("companyName")}
          placeholder="Enter Company"
          value={project.companyName}
          fullWidth
        />
        <Box>
        <Button
          style={{ margin: "10px" }}
          onClick={() => handleSubmit()}
          fullWidth
          variant="contained"
        >
          Submit
        </Button>
        <Button
          style={{ margin: "10px" }}
          onClick={() => dispatch(
            setProjectSlice({
              id: 0,
              projectName: "",
              companyName: "",
            })
          )}
          fullWidth
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

// import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect } from "react"
// import { useAppDispatch, useAppSelector } from "../../app/hooks"
// import { fetchProjects } from "./projectSlice"

// export const ProjectView =()=>{
//     const project=useAppSelector(state=>state.project)
//     const dispatch=useAppDispatch()
//     useEffect(()=>{
//         dispatch(fetchProjects())
//     },[])

//     return(
//         <div>
//             <h2>List of Projects</h2>
//       {project.loading && <div>Loading...</div>}
//       {!project.loading && project.error ? <div>Error: {project.error}</div> : null}
//       {!project.loading && project.projects.length ? (
//         <ul>
//           {project.projects.map((user: { id: Key | null | undefined; projectName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; companyName: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined }) => (
//             <li key={user.id}>{user.projectName}{user.companyName}</li>
//           ))}
//         </ul>
//       ) : null}
//         </div>
//     )
// }
