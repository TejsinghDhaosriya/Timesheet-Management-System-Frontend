import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { getToken } from "../../security/GetToken";
import { getUser } from "./APIs/UserApi";
import { UserInterface } from "./interface/UserInterface";
import { getProject } from "./APIs/ProjectApi";
import Project from "../projects-page/ProjectInterface";
import { assignProject, getProjectAssigned, unAssignProject } from "./APIs/AssignProject";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 4,
  px: 4,
  pb: 3,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function UserTables() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<UserInterface[]>([]);
  const [userName, setUserName] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [previousProjectId, setPreviousProjectId] = React.useState([]);
  const [projectId, setProjectId] = React.useState(0);
  const [selectProject, setSelectProject] = React.useState<string | null>("");
  const [project, setProject] = React.useState<Project[]>([]);
  const [projectAssigned, setProjectAssigned] = React.useState(false);
  const [unassignClicked, setUnAssignClicked] = React.useState(false);
  const [alreadyProjectAssign, setAlreadyProjectAssign] = React.useState(false);
  const [userSearch, setUserSearch] = React.useState<string | null>("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false);setProjectAssigned(false);setAlreadyProjectAssign(false);setUnAssignClicked(false)};

  const GetAllUser = async () => {
    try {
      const token = await getToken();
      const response = await getUser(token);
      if (response) {
        setData(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const GetAllProject = async () => {
    try {
      const response = await getProject();
      if (response) {
        setProject(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const GetAssignedProject = async (userId: string) => {
    try {
      const response = await getProjectAssigned(userId);
      if (response.data.currentProjectId != 0 )
      {
        setAlreadyProjectAssign(true);
      }
    } catch (error) {}
  };

  const GetUnAssignedProject = async (userId: string) => {
    try {
      const response = await getProjectAssigned(userId);
      if (response.data.currentProjectId != 0 )
      {
        setProjectId(response.data.currentProjectId);
        setPreviousProjectId(response.data.previousProjectIds);
      }
    } catch (error) {}
  };

  const AssignProject = async () => {
    const projectId = Number(selectProject?.slice(0, 1));
    const getStatusCode = await assignProject(userId, projectId);
    if (getStatusCode === 200) {
      setProjectAssigned(true);
    }
    setTimeout(() => {
      handleClose();
    }, 1000);
    // handleClose();
  };

  const UnAssignProject = async () => {
    const projectId = Number(selectProject?.slice(0, 1));
    console.log("project Id", projectId);
    const getStatusCode = await unAssignProject(userId, projectId, previousProjectId);
    // if (getStatusCode === 200) {
    //   setProjectAssigned(false);
    // }
    handleClose();

  }

  const onClickAssign = (item: any) => {
    setUserName(item.username);
    setUserId(item.id);
    GetAssignedProject(item.id);
    handleOpen();
  };

  const onClickUnAssign = (item: any) => {
    setUnAssignClicked(true);
    setUserName(item.username);
    setUserId(item.id);
    const unassignedProjectId = GetUnAssignedProject(item.id);
    handleOpen();
  };

  React.useEffect(() => {
    if(unassignClicked)
    {
      const selectedProject = project.filter((project_info)=>{
      console.log("Project Info", project_info, projectId);
      return project_info.id === projectId;
  })
  console.log("selectedpROJECT", selectedProject);
  const idWithProjectName = `${selectedProject[0].id}${selectedProject[0].name}`
  setSelectProject(idWithProjectName);
    }
  },[projectId])

const filteredUser = (userSearch: string) => {
  const filterUser = data.filter((user_info)=>{
    return user_info.username.startsWith(userSearch)
})
setData(filterUser);
}
React.useEffect(() => {
  if(userSearch === "")
  {
    GetAllUser();
  }
}, [userSearch]);

React.useEffect(() => {
  GetAllProject();
}, []);
  return (
    <TableContainer component={Paper}>
      <Stack spacing={2} sx={{ width: 300, ml: 'auto' }}>
        <Autocomplete
          onInputChange={(event: any, newValue: string) => {
             setUserSearch(newValue);
            filteredUser(newValue);
          }}
          onChange={(event: any, newValue: string) => {
             setUserSearch(newValue);
            filteredUser(newValue);
          }}
          freeSolo
          id="free-solo-2-demo"
          style={{ marginTop: "1rem" }}
          disableClearable
          options={data.map((option) => option.username)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search User"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </Stack>
      <br />

      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#707070", fontWeight: "bold" }}>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="right">UserName</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">First Name</StyledTableCell>
            <StyledTableCell align="right">Last Name</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="right">{row.username}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">{row.firstName}</StyledTableCell>
              <StyledTableCell align="right">{row.lastName}</StyledTableCell>
              <StyledTableCell align="center">
                <Tooltip title="Assign Project">
                  <IconButton onClick={() => onClickAssign(row)}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="UnAssign Project">
                  <IconButton onClick={() => onClickUnAssign(row)}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Tooltip>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: "40%", height: "30%" }}>
          {projectAssigned ? (
           
           <><Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography sx={{ mr: 1, fontWeight: "bold", fontSize: "1rem" }}>
                Project Assigned Successfully !{" "}
              </Typography>
              <ThumbUpIcon color="success" />
            </Box></>
           
          ) : (
            <>
              {alreadyProjectAssign===true && unassignClicked===false? <><Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography sx={{ mr: 1, fontWeight: "bold", fontSize: "1rem" }}>
                Already Project Assigned !{" "}
              </Typography>
            </Box></>:<><TextField
                disabled
                sx={{ mb: 2 }}
                id="outlined-disabled"
                label="User Name"
                value={userName}
                fullWidth
                name="username"
                inputProps={{ "data-testid": "date" }}
              />
              <Select
                displayEmpty
                disabled={unassignClicked}
                sx={{ marginBottom: "10px", ml: 1 }}
                value={selectProject}
                onChange={(event: any) => setSelectProject(event.target.value)}
                renderValue={(selected: any) => {
                  if (selected.length === 0) {
                    return <span>Please Select a Project</span>;
                  }
                  else {
                    return <span>{selected.slice(1).toUpperCase()}</span>;
                  }
                }}
              >
                {project.length > 0 &&
                  project.map((project_info_item: any) => {
                    return (
                      <MenuItem
                        key={project_info_item.name}
                        value={`${project_info_item.id}${project_info_item.name}`}
                      >
                        {project_info_item.name.toUpperCase()}
                      </MenuItem>
                    );
                  })}
              </Select>
              <br />
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={1}
              >
                {unassignClicked? <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  data-testid="submit-btn"
                  onClick={UnAssignProject}
                >
                  UnAssign Project
                </Button> : <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  data-testid="submit-btn"
                  onClick={AssignProject}
                >
                  Assign Project
                </Button>}
                <Button
                  type="submit"
                  variant="outlined"
                  color="secondary"
                  data-testid="submit-btn"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Stack></>}
            </>
          )}
        </Box>
      </Modal>
    </TableContainer>
  );
}
