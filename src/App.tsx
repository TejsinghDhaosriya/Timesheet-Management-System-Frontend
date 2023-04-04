import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import { Routes, Route,Navigate } from "react-router-dom";
import ProjectsPage from "./modules/projects-page/ProjectsPage";
import TimesheetPage from "./modules/timesheet-page/TimesheetPage";
import { withTheme } from "./theme";
import { DRAWER_WIDTH } from "./utils/constants";
import ApprovalPage from "./modules/approvals-page/ApprovalPage";
import HomePage from "./components/HomePage";
import KeyCloakService from "./security/keycloakService";
import { RouteBasedOnRole } from "./components/RouteBasedOnRole";

function App(props: any) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: {xs:"0.5rem",md:"2rem"},
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
        <Box sx={{marginLeft:"10px",marginTop:'40px' }}>
          <Routes>
            <Route path="/projects" element={<RouteBasedOnRole roles={["Manager","Employee"]}><ProjectsPage /></RouteBasedOnRole>} />
            <Route path="/timesheet" element={<TimesheetPage />} />
            <Route path="/myapprovals" element={<RouteBasedOnRole roles={["Manager"]}><ApprovalPage /></RouteBasedOnRole>} />
            <Route path='*' element={<Navigate to='/timesheet' />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}

export default withTheme(App);
