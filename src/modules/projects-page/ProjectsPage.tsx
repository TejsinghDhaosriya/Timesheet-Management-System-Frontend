import { Box, Button, Drawer, IconButton } from "@mui/material";
import React, { useState } from "react";
import MyForm from "./projectForm";
import MyTable from "./projectTable";
import CloseIcon from "@mui/icons-material/Close";
import { setProjectSlice } from "./reducers/project";
import { useDispatch } from "react-redux";
import ProjectBar from "./ProjectDrawer";

function Projects() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <Button
        style={{ margin: "10px" }}
        variant="contained"
        onClick={() => setIsDrawerOpen(true)}
      >
        Add Projects
      </Button>
      <Drawer anchor="right" open={isDrawerOpen}>
        <Box>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="logo"
            onClick={() => {
              setIsDrawerOpen(false);
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
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box>
          <MyForm />
        </Box>
      </Drawer>
      <MyTable />
    </>
  );
}

export default Projects;
