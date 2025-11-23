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
import Todo from "./Todo";
import { useEffect, useMemo, useState } from "react";
import type { TodoType } from "../Types/types";
import initialTodos from "../data/todos";

const getTodos = () => {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : initialTodos;
};

const TodoList = () => {
  const [todos, setTodos] = useState<TodoType[]>(getTodos);
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
        title: title,
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
    <Card style={{ width: 550 }}>
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
          <ToggleButton value="all" onClick={() => setFilter("all")}>
            All
          </ToggleButton>
          <ToggleButton
            value="completed"
            onClick={() => setFilter("completed")}
          >
            Completed
          </ToggleButton>
          <ToggleButton
            value="notCompleted"
            onClick={() => setFilter("notCompleted")}
          >
            Not Completed
          </ToggleButton>
        </ToggleButtonGroup>
        {filteredTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} setTodos={setTodos} />
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
  );
};

export default TodoList;
