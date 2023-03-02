import { CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import KeyCloakService from "../security/keycloakService";

function HomePage() {
  return (
    <Box>
      <CardContent>
        <Typography variant="h5" component="div">
          Welcome {KeyCloakService.GetUserName()}
        </Typography>
        <Typography variant="h6">
          My Role:{KeyCloakService.GetUserRoles()?.join("")}
        </Typography>
      </CardContent>
    </Box>
  );
}

export default HomePage;
