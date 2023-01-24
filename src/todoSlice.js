import {
  createSelector,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit';


export const initialState = {
  filter: 'all',
  items: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    changeFilter(state, action) {
      state.filter = action.payload;
    },
    addTodo: {
      prepare: (title) => ({
        payload: {
          id: nanoid(),
          title,
          completed: false,
        },
      }),
      reducer(state, action) {
        state.items.push(action.payload);
      },
    },
    updateTodo(state, action) {
      const todo = state.items.find((todo) => todo.id === action.payload.id);
      todo.title = action.payload.title;
    },
    toggleTodo(state, action) {
      const todo = state.items.find((todo) => todo.id === action.payload);
      todo.completed = !todo.completed;
    },
    removeTodo(state, action) {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
    toggleAll(state, action) {
      state.items = state.items.map((todo) => ({
        ...todo,
        completed: action.payload,
      }));
    },
    clearCompleted(state) {
      state.items = state.items.filter((todo) => !todo.completed);
    },
  },
});

export const {
  addTodo,
  changeFilter,
  clearCompleted,
  removeTodo,
  toggleAll,
  toggleTodo,
  updateTodo,
} = todoSlice.actions;

export const selectFilter = (state) => state.todo.filter;

const selectItems = (state) => state.todo.items;

export const selectCount = createSelector(selectItems, (todos) => {
  const activeCount = todos.reduce(
    (accum, todo) => (todo.completed ? accum : accum + 1),
    0
  );
  const completedCount = todos.length - activeCount;

  return { activeCount, completedCount, allCount: todos.length };
});

export const selectTodoList = createSelector(
  selectFilter,
  selectItems,
  (filter, todos) => {
    return todos.filter((todo) => {
      switch (filter) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return true;
      }
    });
  }
);

export default todoSlice.reducer;
