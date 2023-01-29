import { Box, Button, Drawer, IconButton } from "@mui/material";
import React, { useState } from "react";
import MyForm from "../../components/projectForm";
import MyTable from "../../components/projectTable";
import CloseIcon from "@mui/icons-material/Close";
import { setProjectSlice } from "../../reducers/project";
import { useDispatch } from "react-redux";

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
        Manage Projects
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
                  id: 0,
                  projectName: "",
                  companyName: "",
                })
              );
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box>
          <MyForm />
          <MyTable />
        </Box>
      </Drawer>
    </>
  );
}

export default Projects;
