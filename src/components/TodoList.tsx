import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import TodoProps from "./Todo";
import { useEffect, useMemo, useState } from "react";
import { useTodos } from "../context/TodosProvider";

const TodoList = () => {
  const { todos, setTodos } = useTodos();
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (title: string) => {
    setTodos((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: title.trim(),
        description: "",
        isCompleted: false,
      },
    ]);
    setTitle("");
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "all":
        return todos;
      case "completed":
        return todos.filter((todo) => todo.isCompleted);
      case "notCompleted":
        return todos.filter((todo) => !todo.isCompleted);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <Card sx={{ width: 550 }}>
      <CardContent>
        <Typography gutterBottom align="center" variant="h3" component="div">
          Todo
        </Typography>
        <ToggleButtonGroup
          color="primary"
          exclusive
          value={filter}
          onChange={(_, newFilter) => newFilter && setFilter(newFilter)}
          style={{ display: "flex", justifyContent: "center", marginBlock: 20 }}
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="completed">Completed</ToggleButton>
          <ToggleButton value="notCompleted">Not Completed</ToggleButton>
        </ToggleButtonGroup>
        {filteredTodos.map((todo) => (
          <TodoProps key={todo.id} todo={todo} setTodos={setTodos} />
        ))}
      </CardContent>
      <CardActions sx={{ display: "flex", padding: "16px" }}>
        <TextField
          sx={{ width: "70%" }}
          label="Add Your Todo"
          variant="filled"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleAdd(title) : null)}
        />
        <Button
          sx={{ width: "30%", height: "-webkit-fill-available" }}
          variant="contained"
          disabled={!title || title.length > 10}
          onClick={() => handleAdd(title)}
        >
          Add
        </Button>
      </CardActions>
      {title.length > 10 && (
        <Typography variant="h6" color="error" sx={{ textAlign: "center" }}>
          Title must be at least 10 characters long
        </Typography>
      )}
    </Card>
  );
};

export default TodoList;
