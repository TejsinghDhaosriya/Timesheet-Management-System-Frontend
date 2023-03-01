import "./App.css";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import ProjectsPage from "./modules/projects-page/ProjectsPage";
import TimesheetPage from "./modules/timesheet-page/TimesheetPage";
import { withTheme } from "./theme";
import { DRAWER_WIDTH } from "./utils/constants";
import ApprovalPage from "./modules/approvals-page/ApprovalPage";
import HomePage from "./components/HomePage";

function App(props: any) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "2em",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Navbar {...props} />
        </Box>
        <Box sx={{ marginTop: "6em", marginLeft: `${DRAWER_WIDTH}px` }}>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/timesheet" element={<TimesheetPage />} />
            <Route path="/myapprovals" element={<ApprovalPage />} />
            {/* {KeyCloakService.GetUserRoles()?.join("")!="Employee" && 
          <Route path="/myapprovals" element={<ApprovalPage/>} />} */}
          </Routes>
        </Box>
      </Box>
    </>
  );
}

export default withTheme(App);
