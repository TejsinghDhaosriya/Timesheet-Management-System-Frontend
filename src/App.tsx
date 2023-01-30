import "./App.css";
import { Box, Button } from "@mui/material";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import ProjectsPage from "./modules/projects-page/ProjectsPage";
import TimesheetPage from "./modules/timesheet-page/TimesheetPage";
import { BrowserRouter } from "react-router-dom";
import { withTheme } from "./theme";

function App(props: any) {
  return (
    <BrowserRouter>
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Navbar {...props} />
        </Box>
        <Box sx={{marginTop:'60px'}}>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/timesheet" element={<TimesheetPage />} />
        </Routes>
        </Box>
      </>
    </BrowserRouter>
  );
}

export default withTheme(App);