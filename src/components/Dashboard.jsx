import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { v4 as uuid } from "uuid";
import TodoListComponent from "./TodoListComponent";

import { useDispatch, useSelector } from "react-redux";
import { deleteCustomerAction } from "../store/customerReducer";
import { fetchCustomers } from "../asyncActions/customers";
import { Button, TextField } from "@mui/material";
import { addTodoActionCreator } from "../store/todoReducer";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const defaultTheme = createTheme();

export default function Dashboard() {
  const [title, setTitle] = React.useState("Новая запись");

  // Объявляем намерение использовать dispatch.
  const dispatch = useDispatch();

  // Ссылаемся на поля в store.
  const cash = useSelector((state) => state.cash.cash);
  const customers = useSelector((state) => state.customers.customers);

  const addTodo = (title) => {
    const todo = {
      id: uuid(),
      title,
      date: new Date().toLocaleDateString(),
    };
    dispatch(addTodoActionCreator(todo));
  };

  function changeText(event) {
    setTitle(event.target.value);
    console.log("State: " + title);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    sx={{ m: 2 }}
                    id="standard-basic"
                    label="Название"
                    variant="standard"
                    onChange={changeText}
                  />
                  <Grid container item xs={12} md={12} lg={12}>
                  <Button
                    sx={{ m: 2 }}
                    variant="contained"
                    size="small"
                    onClick={() => addTodo(title)}
                  >
                    Добавить запись
                  </Button>
                  <Button
                    sx={{ m: 2 }}
                    variant="contained"
                    size="small"
                    onClick={() => dispatch(fetchCustomers())}
                  >Загрузить пользователей
                  </Button>
                  </Grid>
                  <TodoListComponent />
                </Paper>
              </Grid>              
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
