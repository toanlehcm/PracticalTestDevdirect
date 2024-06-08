import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

interface IHeaderProps {
  handleSave: () => void;
}
export default function Header({ handleSave }: IHeaderProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button sx={{ color: "#fff" }} onClick={handleSave}>
            Save
          </Button>

          <Button
            sx={{
              a: {
                color: "#fff",
                textDecoration: "none",
              },
            }}
          >
            <a href="/consumer" target="_blank" rel="">
              View
            </a>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
