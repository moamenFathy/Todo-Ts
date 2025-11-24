import { Box, Card, CardContent, IconButton, Stack, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import type React from "react";
import type { TodoType } from "../types/types";
import CustomModal from "./CustomModal";
import { useState } from "react";
import { useTodos } from "../context/TodosProvider";

interface TodoProps {
  todo: TodoType;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

const TodoProps = ({
  todo: { id, title, description, isCompleted },
}: TodoProps) => {
  const { setTodos } = useTodos();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDoneTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (updatedTodo: TodoType) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
    );
  };

  return (
    <>
      <Card
        sx={{
          bgcolor: "#283593",
          color: "white",
          my: 4,
          transition: "all 0.3s ease-in-out",
          ":hover": {
            transform: "translateY(-4px)",
            boxShadow: 3,
          },
        }}
      >
        <Box>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Stack sx={{ overflow: "auto" }}>
              <Typography
                component="div"
                variant="h5"
                noWrap
                style={{ textDecoration: isCompleted ? "line-through" : "" }}
              >
                {title}
              </Typography>
              <Typography component="div" variant="subtitle1" noWrap>
                {description}
              </Typography>
            </Stack>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton
                color="success"
                aria-label="Mark todo as complete"
                sx={{
                  border: "3px solid green",
                  bgcolor: isCompleted ? "green" : "white",
                  color: isCompleted ? "white" : "",
                  ":hover": {
                    bgcolor: isCompleted ? "#43a047" : "#C5C5C5",
                  },
                }}
                onClick={() => handleDoneTodo(id)}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="Edit todo"
                sx={{
                  border: "3px solid #1976D2",
                  bgcolor: "white",
                  ":hover": {
                    bgcolor: "#C5C5C5",
                  },
                }}
                onClick={() => setEditModal(true)}
              >
                <EditOutlinedIcon />
              </IconButton>
              <IconButton
                color="error"
                aria-label="Delete todo"
                sx={{
                  border: "3px solid #D32F2F",
                  bgcolor: "white",
                  ":hover": {
                    bgcolor: "#C5C5C5",
                  },
                }}
                onClick={() => setDeleteModal(true)}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Box>
      </Card>
      <CustomModal
        open={editModal}
        modalTitle="Edit Modal"
        todo={{ id, title, description, isCompleted }}
        setModal={setEditModal}
        onEdit={handleEditTodo}
        isForm
      />
      <CustomModal
        open={deleteModal}
        modalTitle="Do you want to delete this todo"
        todo={{ id, title, description, isCompleted }}
        setModal={setDeleteModal}
        onDelete={handleDeleteTodo}
      />
    </>
  );
};

export default TodoProps