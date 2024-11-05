import React, { useEffect, useState } from "react";

// components

import TaskList from "../TaskList/TakeList";
import AddTask from "../AddTask/AddTask";
import { Task } from "../../types";
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
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

interface HomeProps {
  searchTerm: string;
}

const Home: React.FC<HomeProps> = ({ searchTerm }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      return Array.isArray(savedTasks) ? savedTasks : [];
    } catch (error) {
      console.error("Error loading tasks from localStorage", error);
      return [];
    }
  });

  const filteredTasks = searchTerm
    ? tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : tasks;

  const addTask = (task: Task) => setTasks((prevTasks) => [...prevTasks, task]);

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage", error);
    }
  }, [tasks]);

  const onUpdateTask = (taskId: number, newTitle: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
  };

  const onDeleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const onChangeStatus = (taskId: number, status: Task["status"]) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (taskId ? { ...task, status: status } : task))
    );
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          bgcolor: "background.paper",
          width: "400px",
          outline: "none",

          borderRadius: 2,
        }}
      >
        <AddTask addTask={addTask} />
      </Box>
      {tasks.length > 0 && (
        <>
          <TaskList
            tasks={filteredTasks}
            onDeleteTask={onDeleteTask}
            onUpdateTask={onUpdateTask}
            onChangeStatus={onChangeStatus}
          />
        </>
      )}
    </Container>
  );
};

export default Home;
