"use client";

import React, { useState } from "react";
import { Task } from "../../types";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<"PENDING" | "DONE">("PENDING");

  const [error, setError] = useState<string | null>(null);

  const validateTask = (): boolean => {
    if (!title.trim() || !/^[A-Za-z\s]+$/.test(title)) {
      setError("Title must contain only letters and spaces.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear any previous error messages
    if (validateTask()) {
      const newTask: Task = {
        id: Date.now(),
        title,
        status,
      };
      onAddTask(newTask);
      setTitle("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Task Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
      />
    </Box>
  );
};

export default TaskForm;
