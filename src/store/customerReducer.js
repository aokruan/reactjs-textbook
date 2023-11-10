// Состояние по умолчанию.
const defaultState = {
  customers: [],
};

// Создам action для определения типа действия.
const ADD_CUSTOMER = "ADD_CUSTOMER";
const ADD_MANY_CUSTOMERS = "ADD_MANY_CUSTOMERS";
const DELETE_CUSTOMER = "DELETE_CUSTOMER";

// Создаём обработку action через reducer.
export const customerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_CUSTOMER:
      return { ...state, customers: [...state.customers, action.payload] };
    case ADD_MANY_CUSTOMERS:
      return { ...state, customers: [...state.customers, ...action.payload] };
    case DELETE_CUSTOMER:
        // В этом коде мы используем filter для создания нового массива customers, 
        // который исключает клиента с указанным id. 
        // Это гарантирует, что клиент будет удален из массива, а не добавлен к нему.
      return {
        ...state,
        customers: state.customers.filter((customer) => customer.id !== action.payload),
      };
    default:
      return state;
  }
};

// Создаём ActionCreator для быстрого и удобного возвращения объектов.
export const addCustomerAction = (payload) => ({ type: ADD_CUSTOMER, payload });
export const addManyCustomersAction = (payload) => ({ type: ADD_MANY_CUSTOMERS, payload });
export const deleteCustomerAction = (payload) => ({
  type: DELETE_CUSTOMER,
  payload,
});
