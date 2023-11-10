import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import TodoListItemComponent from "./TodoListItemComponent";

const TodoListComponent = () => {
  // Объявляем список заметок из store.
  const todos = useSelector((state) => state.todos.todos);

  return (
    <Box sx={{ flexGrow: 1, p:1 }}>
      <List dense={true}>
        {todos.length > 0 ? (
          <div>
            {todos.map((todo) => (
              <TodoListItemComponent todo={todo}/>
            ))}
          </div>
        ) : (
          <div>Нет записей</div>
        )}
      </List>
    </Box>
  );
};

export default TodoListComponent;
