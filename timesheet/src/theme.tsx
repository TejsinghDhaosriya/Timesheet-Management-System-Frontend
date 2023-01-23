import React,{useState} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {purple,yellow} from '@mui/material/colors/';
import CssBaseline from "@mui/material/CssBaseline";
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

const Theme = (props:any) => {
  const { children, darkMode } = props;
  const defaultTheme = darkMode ? darkTheme : lightTheme;
  return <ThemeProvider theme={defaultTheme}>
    <CssBaseline/>
    {children}
    </ThemeProvider>;
};

export const withTheme = (Component:any) => {
  return (props:any) => {
    const [darkMode, setDarkMode] = useState(false);
    return (
      <Theme darkMode={darkMode}>
        <Component {...props} darkMode={darkMode} setDarkMode={setDarkMode} />
      </Theme>
    );
  };
};