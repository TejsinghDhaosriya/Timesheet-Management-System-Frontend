import { CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import KeyCloakService from "../security/keycloakService";

function UserCard() {
  const username = KeyCloakService.GetUserName();
  return (
    <Box>
      <CardContent>
        <Typography data-testid="greet-user" variant="h5" component="div">
          Welcome <b style={{textTransform:"capitalize"}}>{username}!</b>
        </Typography>
        {/* <Typography variant="h6">
          My Role:{KeyCloakService.GetUserRoles()?.join("")}
        </Typography> */}
      </CardContent>
    </Box>
  );
}

export default UserCard;
