import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import SideBar from "./SideBar";
import { DRAWER_WIDTH } from "../utils/constants";

function Navbar(props: any) {
  const { darkMode, setDarkMode } = props;

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    backgroundColor: "transparent",
    color: theme.palette.text.primary,
    boxShadow: "none",
    marginTop: 24,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
  }));
  return (
    <>
      <SideBar />
      <AppBarStyled>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{
              marginLeft: "1em",
            }}
          >
            Time Sheet Management
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setDarkMode(!darkMode);
            }}
          >
            Toggle Theme
          </Button>
        </Toolbar>
      </AppBarStyled>
    </>
  );
}

export default Navbar;
