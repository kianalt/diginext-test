// app/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Stack,
  Typography,
  Modal,
  TextField,
  IconButton,
  Container,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

// Component
import Home from "../components/Home/Home";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
    },
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
  },
});

const MainPage: React.FC = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: "120vh",
          height: "100%",
          color: "text.primary",
          overflowX: "hidden",
          padding: "0",
          margin: "0",
          width: "100%",
        }}
      >
        <Box sx={{ pt: "100px" }}>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              background:
                "linear-gradient(45deg, #F7D8E9 48%, #E082C9 67%, #562B63 70%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 800,
              mb: 10,
            }}
          >
            Todo List App
          </Typography>
        </Box>
        <Container maxWidth="xl">
          <Stack
            flexDirection="row-reverse"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TextField
                  label="Search Tasks by Title"
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={() => setSearchTerm("")}>
                        <SearchIcon />
                      </IconButton>
                    ),
                  }}
                  sx={{ marginRight: 2, width: "300px" }}
                />
              </Box>
            </Box>
          </Stack>{" "}
        </Container>
        <Home searchTerm={searchTerm} />
      </Box>
    </ThemeProvider>
  );
};

export default MainPage;
