import { createTheme } from "@mui/material/styles";
import { purple, yellow, red } from "@mui/material/colors";
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: purple[500],
    },
  },
});
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: yellow[500],
    },
  },
});
