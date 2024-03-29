import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_PROJECT_BY_ID, GET_PROJECTS } from "./actions/projectTypes";
import { setProjectSlice } from "./reducers/project";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Drawer, IconButton } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import MyForm from "./projectForm";
import CloseIcon from "@mui/icons-material/Close";
import Project from "./ProjectInterface";
import { intialState } from "./ProjectState";
import dayjs from "dayjs";

export default function MyTable() {
  const project = useSelector((state: any) => state.projects);
  const dispatch = useDispatch();
  useEffect((): any => {
    dispatch({ type: GET_PROJECTS });
  }, [dispatch]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState<
    | "Pending"
    | "Started"
    | "Failed"
    | "Paused"
    | "Success"
    | "Cancelled"
    | "All"
  >("All");
  const handleSortChange = (event: any) => {
    setSortBy(
      event.target.value as
        | "Pending"
        | "Started"
        | "Failed"
        | "Paused"
        | "Success"
        | "Cancelled"
        | "All"
    );
  };

  const numberMap: any = {
    0: "Pending",
    1: "Paused",
    2: "Started",
    3: "Failed",
    4: "Success",
    5: "Cancelled",
  };

  const managerMap: any = {
    "0df67465-e8b8-423b-9076-122538a6d253": "Manager 1",
    1: "Manager 2",
    2: "Manager 3",
    3: "Manager 4",
    4: "Manager 5",
  };
  const sortedData =
    sortBy === "All"
      ? project
      : project.filter((row: any) => numberMap[row.status] === sortBy);

  const manager_info = useSelector((state:any)=>state.userInfo.managerList);

  const getProjectsManager=(projectDetails:any,managerInfoList:any)=>{
    const updatedManagerDetails = managerInfoList.filter((managerInfoListItem:any)=>{
      return  managerInfoListItem.managerId === projectDetails.managerId
    })
    return `${updatedManagerDetails[0]?.name}`.toUpperCase();
  }

  // useEffect(()=>{
  //   getProjectsManager(project,manager_info);
  // },[])

  return (
    <>
        <FormControl>
          <Select sx={{marginBottom:'10px'}} value={sortBy} onChange={handleSortChange}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Started">Started</MenuItem>
            <MenuItem value="Failed">Failed</MenuItem>
            <MenuItem value="Paused">Paused</MenuItem>
            <MenuItem value="Success">Success</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#D5D5D5", fontWeight: "bold" }}>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Project</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Start Date</TableCell>
              <TableCell align="right">End Date</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Manager</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row: Project) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                data-testid="project-details-row"
              >
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right" component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{dayjs(row.startDate).format("DD,MMMM YYYY")}</TableCell>
                <TableCell align="right">{dayjs(row.endDate).format("DD,MMMM YYYY")}</TableCell>
                <TableCell align="right">{numberMap[row.status]}</TableCell>
                <TableCell align="right">{getProjectsManager(row,manager_info)}</TableCell>
                <TableCell align="right">
                  <IconButton
                    sx={{ backgroundColor: "#D5D5D5" }}
                    onClick={() => {
                      dispatch(setProjectSlice(row));
                      setIsDrawerOpen(!isDrawerOpen);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <Drawer
                    PaperProps={{
                      sx: {
                        width: 500,
                      },
                    }}
                    anchor="right"
                    open={isDrawerOpen}
                  >
                    <Box
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <IconButton
                        size="small"
                        edge="end"
                        color="inherit"
                        aria-label="logo"
                        onClick={() => {
                          setIsDrawerOpen(false);
                          dispatch(setProjectSlice(intialState));
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                    <Box>
                      <MyForm />
                    </Box>
                  </Drawer>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    sx={{ backgroundColor: "#D5D5D5" }}
                    onClick={() =>
                      dispatch({ type: DELETE_PROJECT_BY_ID, id: row.id })
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
