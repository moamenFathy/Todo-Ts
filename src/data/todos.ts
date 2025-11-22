const initialTodos = [
  {
    id: crypto.randomUUID(),
    title: "First Todo",
    description: "hi",
    isCompleted: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Second Todo",
    description: "no hi",
    isCompleted: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Third Todo",
    description: "hiii",
    isCompleted: true,
  },
];

export default initialTodos;