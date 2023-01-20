import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import Counter from "./redux-store/features/counter/Counter";
import { darkTheme,lightTheme } from "./theme-styles/theme";


function App() {
  const [theme, setTheme] = useState(false);

  return (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <CssBaseline />
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
            setTheme(!theme);
          }}
        >
          Toggle Theme
        </Button>
        <Counter />
      </Box>
    </ThemeProvider>
  );
}

export default App;
