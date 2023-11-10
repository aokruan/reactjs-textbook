import { useDispatch, useSelector } from "react-redux";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { StickyNote2 } from "@mui/icons-material";
import { red, yellow } from "@mui/material/colors";
import {
  editTodoActionCreator,
  removeTodoActionCreator,
} from "../store/todoReducer";

const TodoListItemComponent = ({ todo }) => {
  // Объявляем намерение использовать dispatch.
  const dispatch = useDispatch();

  const updateTodo = (id, title) => {
    const todo = {
      id: id,
      title: title,
      date: new Date().toLocaleDateString(),
    };
    dispatch(editTodoActionCreator(todo));
  };

  const removeTodo = (todo) => {
    dispatch(removeTodoActionCreator(todo));
  };

  return (
    <ListItem
      onClick={() => updateTodo(todo.id, prompt())}
      key={todo.id}
      secondaryAction={
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon
            onClick={(e) => {
              e.stopPropagation();
              removeTodo(todo);
            }}
            sx={{ color: red[500] }}
          />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <StickyNote2 sx={{ color: yellow[500] }} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={todo.title} secondary={todo.date} />
    </ListItem>
  );
};

export default TodoListItemComponent;
