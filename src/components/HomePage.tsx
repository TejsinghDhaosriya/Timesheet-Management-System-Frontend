import { CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import KeyCloakService from "../security/keycloakService";

function HomePage() {
  return (
    <Box>
      <CardContent >
      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
        Welcome
      </Typography>
      <Typography variant="h3" component="div">
      {KeyCloakService.GetUserName()}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Role
      </Typography>
      <Typography variant="h4">
      {KeyCloakService.GetUserRoles()?.join("")}
      </Typography>
    </CardContent>
    </Box>
  );
}

export default HomePage;
