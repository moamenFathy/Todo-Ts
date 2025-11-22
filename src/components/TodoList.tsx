import { Card, CardContent, Typography, CardActions, Button, TextField } from '@mui/material';
import Todo from './Todo';
import { useEffect, useState } from 'react';
import type { TodoType } from '../Types/types';
import initialTodos from '../data/todos';

const getTodos = () => {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : initialTodos;
};

const TodoList = () => {
  const [todos, setTodos] = useState<TodoType[]>(getTodos);
  const [title, setTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (title: string) => {
    setTodos((prev) => 
    [...prev, {id: crypto.randomUUID(), title: title, description: "", isCompleted: false}]
    )
    setTitle("");
  }

  return (
    <>
      <Card sx={{ maxWidth: 445 }}>
        <CardContent>
          <Typography gutterBottom align="center" variant="h3" component="div">
            Todo
          </Typography>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              setTodos={setTodos}
            />
          ))}
        </CardContent>
        <CardActions sx={{ display: "flex", padding: "16px" }}>
          <TextField
            value={title}
            sx={{ width: "70%" }}
            label="Add Your Todo"
            variant="filled"
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? handleAdd(title) : null)}
          />
          <Button
            sx={{ width: "30%", height: "-webkit-fill-available" }}
            variant="contained"
            disabled={!title}
            onClick={() => handleAdd(title)}
          >
            Add
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default TodoList