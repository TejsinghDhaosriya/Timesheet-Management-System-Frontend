import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import SideBar from "./SideBar";



function Navbar() {
  return (
    <AppBar >
      <Toolbar>
        <SideBar/>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
          Time Sheet Management
        </Typography>
        <Button color="inherit">User</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
