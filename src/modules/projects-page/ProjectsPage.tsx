import { Box, Button, Drawer, IconButton } from "@mui/material";
import React, { useState } from "react";
import MyForm from "./projectForm";
import MyTable from "./projectTable";
import CloseIcon from "@mui/icons-material/Close";
import { setProjectSlice } from "./reducers/project";
import { useDispatch } from "react-redux";
import ProjectBar from "./ProjectDrawer";
import { borderRight } from "@mui/system";
import { intialState } from "./ProjectState";

function Projects() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
    <Box style={{width:"100%",display:"flex",justifyContent:"flex-end"}}>
      <Button
        style={{ margin: "20px" ,alignItems:"right"}}
        variant="contained"
        onClick={() => setIsDrawerOpen(true)}
      >
        Add Projects
      </Button>
      </Box>
      <Drawer
        PaperProps={{
          sx: {
            width: 500,
          },
        }}
        anchor="right"
        open={isDrawerOpen}
      >
        <Box style={{width:"100%",display:"flex",justifyContent:"flex-end"}}>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="logo"
            onClick={() => {
              setIsDrawerOpen(false);
              dispatch(
                setProjectSlice(intialState)
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
