import "./App.css";
import { Box, Button } from "@mui/material";
import { withTheme } from "./theme";

function App(props:any) {
  const {darkMode,setDarkMode} = (props);

  return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Time Management System</h1>
        <Button
          variant="contained"
          onClick={() => {
            setDarkMode(!darkMode);
          }}
        >
          Toggle Theme
        </Button>
      </Box>
  );
}

export default withTheme(App);
