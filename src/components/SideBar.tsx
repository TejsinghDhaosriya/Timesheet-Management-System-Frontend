import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  Drawer,
  IconButton,Box
} from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Person4Icon from '@mui/icons-material/Person4';
import HelpIcon from "@mui/icons-material/Help";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CancelIcon from '@mui/icons-material/Cancel';
import { DRAWER_WIDTH } from "../utils/constants";
import KeyCloakService from "../security/keycloakService";

let drawerList = [
  { key: "users", text: "Users", icon: <Person4Icon/> },
  { key: "projects", text: "Projects", icon: <AccountTreeIcon /> },
  { key: "timesheet", text: "Timesheets", icon: <PunchClockIcon /> },
  { key: "myapprovals", text: "My Approvals", icon: <AssignmentIcon /> },
  { key: "help", text: "Help", icon: <HelpIcon /> },
];
// if (KeyCloakService?.GetUserRoles()?.toString() === "Manager") {
//   drawerList = [
//     { key: "home", text: "Home", icon: <HomeIcon /> },
//     { key: "projects", text: "Projects", icon: <AccountTreeIcon /> },
//     { key: "timesheet", text: "Timesheets", icon: <PunchClockIcon /> },
//     { key: "myapprovals", text: "My Approvals", icon: <AssignmentIcon /> },
//     { key: "help", text: "Help", icon: <HelpIcon /> },
//   ];
// }

interface SideBarProps {
  mobileOpen:boolean,
  setMobileOpen:(value:boolean)=>void
}

function SideBar(props: SideBarProps) {
  const [isSelected, setIsSelected] = useState("timesheet");
  const {mobileOpen,setMobileOpen} = props;
  const list = {
    textAlign: "center",
  };
  const ListItemStyled = styled(ListItem)(({ theme }) => ({
    borderRadius: "14px",
    padding: "16px",
    height: "60px",
    width: "60px",
    marginBottom: "10px",
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
    },
  }));
  const ListItemIconStyled = styled(ListItemIcon)({
    fontSize: "24px",
    color: "#D2D2D2",
  });
  const listItemSelectedIcon: any = {
    color: "red",
  };
  const handleIsSelected = (e: any, key: string) => {
    setIsSelected(key);
  };
  const DrawerStyled = styled(Drawer)({
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
    overflowY: "hidden",
    width: `${DRAWER_WIDTH}px)`,
  });

  const drawerContentWithMenuButton = () => {
    return (
      <>
        <div
          style={{
            padding: "20px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              marginBottom: "3em",
              fontWeight: "bolder",
            }}
          >
            TMS
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              //onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <List sx={{ list }}>
            {drawerList.map((item, index) => {
              return (
                <Tooltip
                  title={item.text}
                  aria-label={item.text}
                  placement="right"
                  key={item.key}
                >
                  <Link to={`/${item.key}`}>
                    <ListItemStyled
                      selected={isSelected === item.key ? true : false}
                      onClick={(e) => handleIsSelected(e, item.key)}
                    >
                      <ListItemIconStyled>{item.icon}</ListItemIconStyled>
                    </ListItemStyled>
                  </Link>
                </Tooltip>
              );
            })}
          </List>
        </div>
      </>
    );
  };
  const drawerContentWithCloseButton = () => {
    return (
      <>
        <div
          style={{
            padding: "6px 20px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display:"flex",
              alignItems:"center",
              marginBottom: "3rem",
              fontWeight: "bolder",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              //onClick={handleDrawerToggle}
              onClick={()=>{setMobileOpen(false)}}
              sx={{ display: { sm: "none" } }}
              >
              <CancelIcon />
            </IconButton>
              TMS
          </div>
          <List sx={{ list }}>
            {drawerList.map((item, index) => {
              return (
                <Tooltip
                  title={item.text}
                  aria-label={item.text}
                  placement="right"
                  key={item.key}
                >
                  <Link to={`/${item.key}`}>
                    <ListItemStyled
                      selected={isSelected === item.key ? true : false}
                      onClick={(e) => {handleIsSelected(e, item.key);setMobileOpen(false)}}
                    >
                      <ListItemIconStyled>{item.icon}</ListItemIconStyled>
                    </ListItemStyled>
                  </Link>
                </Tooltip>
              );
            })}
          </List>
        </div>
      </>
    );
  };

  return (
    <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }}}
        aria-label="sidebar"
      >
      <Drawer
      hideBackdrop
        variant="temporary"
        open={mobileOpen}
        onClose={()=>{setMobileOpen(!mobileOpen)}}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          width:120
        }}
      >
        {drawerContentWithCloseButton()}
      </Drawer>

      <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
          }}
          open
        >
          {drawerContentWithMenuButton()}
        </Drawer>
    </Box>
  );
}

export default SideBar;
