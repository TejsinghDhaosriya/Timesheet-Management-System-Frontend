import { Box, Button, Drawer, IconButton } from "@mui/material";
import { useState } from "react";
import { DRAWER_WIDTH } from "../../utils/constants";
import UserTables from "./UserTable";

function Users() {
    return (
        <Box sx={{marginLeft:{xs:0,sm:`calc(${DRAWER_WIDTH}px)`,md:`calc(${DRAWER_WIDTH}px)`}}}>
        <Box sx={{width:"100%",display:"flex",justifyContent:"flex-end"}}>
          <UserTables/>
          </Box>
          </Box>
    )
}

export default Users