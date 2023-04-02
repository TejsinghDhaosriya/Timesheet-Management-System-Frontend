import { Drawer, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import MyForm from './projectForm';
import { setProjectSlice } from './reducers/project';
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

function ProjectDrawer(props:any) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const drawfunction=()=>{
    dispatch(setProjectSlice(props));
    setIsDrawerOpen(!isDrawerOpen);
  }
  return (
    <Box>
    <IconButton
        onClick={() =>{drawfunction()}}
      >
        <EditIcon />
      </IconButton>
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
              status :0,
              manager_id:"",
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
  </Box>
  )
}

export default ProjectDrawer