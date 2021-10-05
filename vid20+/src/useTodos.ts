// import React from "react";
import { v4 as uuid } from "uuid";
import create from "zustand";

export interface ToDo {
    id: string;
    done: boolean;
    text: string;
}

// type ActionType =
//     | { type: "ADD"; text: string }
//     | { type: "REMOVE"; id: string };

const useTodos = create<{
    todos: ToDo[];
    addToDo: (text: string) => void;
    removeToDo: (id: string) => void;
}>((set) => ({
    todos: [{ done: false, text: "initial state", id: uuid() }],
    addToDo: (text: string) =>
        set((state) => ({
            ...state,
            todos: [...state.todos, { id: uuid(), text, done: false }],
        })),
    removeToDo: (id: string) =>
        set((state) => ({
            ...state,
            todos: state.todos.filter((t) => t.id !== id),
        })),
}));

// export function useTodos(initialTodos: ToDo[]): {
//     todos: ToDo[];
//     addToDo: (text: string) => void;
//     removeToDo: (id: string) => void;
// } {
//     const [todos, dispatch] = React.useReducer(
//         (state: ToDo[], action: ActionType) => {
//             switch (action.type) {
//                 case "ADD":
//                     return [
//                         ...state,
//                         { id: uuid(), text: action.text, done: false },
//                     ];
//                 case "REMOVE":
//                     return state.filter((t: ToDo) => t.id !== action.id);
//                 default:
//                     return state;
//             }
//         },
//         initialTodos
//     );

// const addToDo = React.useCallback(
//     (text: string) => dispatch({ type: "ADD", text }),
//     []
// );

// const removeToDo = React.useCallback(
//     (id: string) => dispatch({ type: "REMOVE", id }),
//     []
// );

// return { todos, addToDo, removeToDo };
// }

export default useTodos;
