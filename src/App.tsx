import TodoList from "./components/TodoList"
import TodosProvider from "./context/TodosProvider";

const App = () => {
  return (
    <TodosProvider>
      <div className="index">
        <TodoList />
      </div>
    </TodosProvider>
  );
};

export default App;