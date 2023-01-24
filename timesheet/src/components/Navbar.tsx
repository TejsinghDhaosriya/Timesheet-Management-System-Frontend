import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import SideBar from "./SideBar";



function Navbar(props:any) {
  const {darkMode,setDarkMode} = props;
  return (
    <AppBar>
      <Toolbar>
        <SideBar/>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
          Time Sheet Management
        </Typography>
        <Button variant="contained" color="primary" onClick={()=>{setDarkMode(!darkMode)}}>Toggle Theme</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
