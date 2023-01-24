import {
  Box,
  Button,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface Project {
  id: number;
  name: string;
  companyName: string;
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  const [newProjectId, setNewProjectId] = useState<number>(0);

  const [newProjectName, setNewProjectName] = useState<string>("");

  const [newProjectCompany, setNewProjectCompany] = useState<string>("");

  const addProject = () => {
    setProjects([
      ...projects,
      {
        id: newProjectId,
        name: newProjectName,
        companyName: newProjectCompany,
      },
    ]);
    setNewProjectId(newProjectId + 1);
    setNewProjectName("");
    setNewProjectCompany("");
  };
  const getProject = () => {
    return projects;
  };
  const updateProject = (updateProject: Project) => {
    setProjects(
      projects.map((project) => {
        if (project.id === updateProject.id) {
          return {
            id: updateProject.id,
            name: newProjectName,
            companyName: newProjectCompany,
          };
        }
        return project;
      })
    );
  };

  const deleteProject = (projId: number) => {
    setProjects(projects.filter((project) => project.id !== projId));
  };

  return (
    <Box>
      <Typography variant="h3" textAlign="center"  color="inherit"> Projects</Typography>
      <Box textAlign="center"  >
        <label>Project Name</label>
        <br/>
        <input
          type="text"
          id="new-project-name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
        />
      </Box>
      <Box textAlign="center"  >
        <label>Company Name</label>
        <br/>
        <input
          type="text"
          id="new-project-company"
          value={newProjectCompany}
          onChange={(e) => setNewProjectCompany(e.target.value)}
        />
      </Box>
      <Box textAlign="center">
      <Button  onClick={addProject}>
        <AddIcon />
      </Button>
      </Box>
      
      <Card sx={{ minWidth: 275 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Id</TableCell>
                <TableCell align="right">Project</TableCell>
                <TableCell align="right">Company</TableCell>
                <TableCell align="right">Update</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((row) => (
                <TableRow>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.companyName}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => updateProject(row)}>
                      <EditIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => deleteProject(row.id)}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}

export default Projects;
