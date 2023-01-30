import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { DELETE_PROJECT_BY_ID, GET_PROJECTS } from "./actions/projectTypes";
import { setProjectSlice } from "./reducers/project";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

export default function MyTable() {
  const project = useSelector((state: any) => state.projects);
  const dispatch = useDispatch();
  React.useEffect((): any => {
    dispatch({ type: GET_PROJECTS });
  }, []);

  return (
    <TableContainer component={Paper} sx={{}} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
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
          {project.map((row: any) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right" component="th" scope="row">           
                {row.projectName}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.start_date}</TableCell>
              <TableCell align="right">{row.end_date}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.manager_id}</TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => {
                    dispatch(setProjectSlice(row));
                  }}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <IconButton
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
  );
}
