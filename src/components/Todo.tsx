import { Box, Card, CardContent, IconButton, Stack, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import type React from 'react';
import type { TodoType } from '../Types/types';
import CustomModal from './CustomModal';
import { useState } from 'react';

interface Todo {
  todo: TodoType;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

const Todo = ({ todo: {id, title, description, isCompleted}, setTodos }: Todo) => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDoneTodo = (id: string) => {
    setTodos((prev) => 
      prev.map((todo) => 
        todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo
      )
    )
  }

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => 
      prev.filter((todo) => 
        todo.id !== id
      )
    )
  }

  const handleEditTodo = (updatedTodo: TodoType) => {
    setTodos((prev) => 
      prev.map((t) =>
         t.id === updatedTodo.id ? updatedTodo : t )
    )
  }


  return (
    <>
      <Card sx={{ 
        color: "#09223B", 
        my: 1, 
        transition: "all 0.3s ease-in-out",
        ":hover": {
          transform: "translateY(-4px)",
          boxShadow: 3
        }
      }}>
        <Box>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Stack>
              <Typography component="div" variant="h5" noWrap style={{ textDecoration: isCompleted ? "line-through" : ""}}>
                {title}
              </Typography>
              <Typography component="div" variant="subtitle1" noWrap>
                {description}
              </Typography>
            </Stack>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton
                color="success"
                sx={{
                  border: "4px solid green",
                  bgcolor: isCompleted ? "green" : "",
                  color: isCompleted ? "white" : "",
                  ":hover": { bgcolor: isCompleted ? "#43a047" : "" },
                }}
                onClick={() => handleDoneTodo(id)}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                color="primary"
                sx={{ border: "4px solid #1976D2" }}
                onClick={() => setEditModal(true)}
              >
                <CreateIcon />
              </IconButton>
              <IconButton
                color="error"
                sx={{ border: "4px solid #D32F2F" }}
                onClick={() => setDeleteModal(true)}
              >
                <DeleteIcon />
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
}

export default Todo