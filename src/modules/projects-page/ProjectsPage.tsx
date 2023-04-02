import { Box, Button, Drawer, IconButton } from "@mui/material";
import { useState } from "react";
import MyForm from "./projectForm";
import MyTable from "./projectTable";
import CloseIcon from "@mui/icons-material/Close";
import { setProjectSlice } from "./reducers/project";
import { useDispatch } from "react-redux";
import { intialState } from "./ProjectState";
import { DRAWER_WIDTH } from "../../utils/constants";

function Projects() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <Box sx={{marginLeft:{xs:0,sm:`calc(${DRAWER_WIDTH}px)`,md:`calc(${DRAWER_WIDTH}px)`}}}>
    <Box sx={{width:"100%",display:"flex",justifyContent:"flex-end"}}>
      <Button
        style={{ margin: "20px" ,alignItems:"right"}}
        variant="contained"
        onClick={() => setIsDrawerOpen(true)}
        data-testid="add-projects-btn"
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
        <Box style={{width:"100%",display:"flex",justifyContent:"flex-end",padding:"0px"}}>
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
    </Box>
  );
}

export default Projects;
