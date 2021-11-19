import React, { useEffect } from "react";
import { Typography, AppBar, Box, Toolbar, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function Header() {
  var token = localStorage.getItem("token");
  const history = useHistory();

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  }, [token]);

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mern Crud
          </Typography>

          <Button variant="contained" color="secondary" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
