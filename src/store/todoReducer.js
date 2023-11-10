// Значение store. Оно является значение по умолчанию.
// В этом примере - это пустой список записей.
const defaultState = {
  todos: [],
};

// Список ключей, по которым ориентируется reducer
// при выборе действия для обработки логики.
// Они называются - Action'ы.
const ADD_TODO = "ADD_TODO";
const EDIT_TODO = "EDIT_TODO";
const REMOVE_TODO = "REMOVE_TODO";

// Это - reducer. Выполняет основную логику над данными.
// Принимает какое-то состояние, или устанавливает по умолчанию из store.
// А так же передаёт action, по которому ориентируется при обработке данных.
export const todoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };

    // В этом редюсере, при обработке действия "EDIT_TODO",
    // мы используем метод map для прохождения по массиву todos и обновления
    // той todo записи, которая имеет тот же id, что и action.payload.id.
    // Обратите внимание, что я использую action.payload.id вместо state.id,
    // потому что state не имеет свойства id.
    // Свойство id содержится в action.payload, который передается в ваш
    // action creator editTodoActionCreator.
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };

    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export const addTodoActionCreator = (payload) => ({ type: ADD_TODO, payload });

export const editTodoActionCreator = (payload) => ({
  type: EDIT_TODO,
  payload,
});

export const removeTodoActionCreator = (payload) => ({
  type: REMOVE_TODO,
  payload,
});
