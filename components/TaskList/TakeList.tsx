import React, { useState } from "react";
import { Task } from "../../types";
import { Box, Button, TextField, Typography } from "@mui/material";

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: number) => void;
  onUpdateTask: (id: number, title: string) => void;
  onChangeStatus: (id: number, status: Task["status"]) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDeleteTask,
  onUpdateTask,
  onChangeStatus,
}) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setEditedTitle(task.title);
  };

  const handleSaveClick = (taskId: number) => {
    if (editedTitle.trim()) {
      onUpdateTask(taskId, editedTitle);
      setEditingTaskId(null);
    }
  };

  const handleDeleteClick = (taskId: number) => {
    onDeleteTask(taskId);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "20px",
      }}
    >
      {tasks.map((task, index) => (
        <Box
          key={task.id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginBottom: 2,
          }}
        >
          <Typography variant="h6">{index + 1}.</Typography>
          {editingTaskId === task.id ? (
            <TextField
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              variant="outlined"
              size="small"
            />
          ) : task.status === "DONE" ? (
            <Typography variant="body1" sx={{ textDecoration: "line-through" }}>
              {task.title}
            </Typography>
          ) : (
            <Typography variant="body1" sx={{ textDecoration: "none" }}>
              {task.title}
            </Typography>
          )}
          {task.status === "PENDING" ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => onChangeStatus(task.id, "DONE")}
            >
              Mark as DONE
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onChangeStatus(task.id, "PENDING")}
            >
              Mark as PENDING
            </Button>
          )}

          {editingTaskId === task.id ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSaveClick(task.id)}
            >
              Save
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleEditClick(task)}
            >
              Edit
            </Button>
          )}
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDeleteClick(task.id)}
          >
            Delete
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default TaskList;
