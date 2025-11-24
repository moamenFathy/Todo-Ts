import { createContext, useContext, useState } from "react";
import type { TodoType } from "../types/types";
import initialTodos from "../data/todos";

interface TodosContextProps {
  children: React.ReactNode;
}

interface TodosContextType {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

const getTodos = (): TodoType[] => {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : initialTodos;
};

export const TodosContext = createContext<TodosContextType | null>(null);

const TodosProvider = ({children}: TodosContextProps) => {
    const [todos, setTodos] = useState<TodoType[]>(getTodos);
  return (
    <TodosContext.Provider value={{todos, setTodos}}>
      {children}
    </TodosContext.Provider>
  )
}

export default TodosProvider;

export function useTodos() {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error("Must use the context inside the provider");
  }

  return context;
}