import { useState } from "react";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { List, ListItem, ListItemIcon, Drawer } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HelpIcon from "@mui/icons-material/Help";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import HomeIcon from "@mui/icons-material/Home";
import { DRAWER_WIDTH } from "../utils/constants";
import KeyCloakService from "../security/keycloakService";

let drawerList = [
  { key: "home", text: "Home", icon: <HomeIcon /> },
  { key: "projects", text: "Projects", icon: <AccountTreeIcon /> },
  { key: "timesheet", text: "Timesheets", icon: <PunchClockIcon /> },
  { key: "help", text: "Help", icon: <HelpIcon /> },
];
if (KeyCloakService?.GetUserRoles()?.toString() === "Manager") {
  drawerList = [
    { key: "home", text: "Home", icon: <HomeIcon /> },
    { key: "projects", text: "Projects", icon: <AccountTreeIcon /> },
    { key: "timesheet", text: "Timesheets", icon: <PunchClockIcon /> },
    { key: "myapprovals", text: "My Approvals", icon: <AssignmentIcon /> },
    { key: "help", text: "Help", icon: <HelpIcon /> },
  ];
}

interface SideBarProps {}

function SideBar(Props: SideBarProps) {
  const [isSelected, setIsSelected] = useState("home");

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
  return (
    <>
      <DrawerStyled
        hideBackdrop={true}
        anchor="left"
        open={true}
        variant="permanent"
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
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
      </DrawerStyled>
    </>
  );
}

export default SideBar;
