import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export interface Todo {
    id: string;
    done: boolean;
    text: string;
}

interface TodosSliceState {
    todos: Todo[];
}

const initialState: TodosSliceState = {
    todos: [],
};

export const todosSlice = createSlice({
    name: "Todos",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            state.todos = [
                ...state.todos,
                { id: uuid(), done: false, text: action.payload },
            ];
        },
        removeTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(
                (todo: Todo) => todo.id !== action.payload
            );
        },
    },
});

export const { addTodo, removeTodo } = todosSlice.actions;

const store = configureStore({
    reducer: {
        todos: todosSlice.reducer,
    },
});

type RootState = ReturnType<typeof store.getState>;

export const selectTodos = (state: RootState) => state.todos.todos;

export default store;
