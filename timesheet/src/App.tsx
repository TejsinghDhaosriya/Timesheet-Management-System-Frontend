import "./App.css";
import { Box, Button } from "@mui/material";
import { withTheme } from "./theme";
import Navbar from "./components/Navbar";

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
        <Navbar />
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
