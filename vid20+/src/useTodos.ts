import React from "react";
import { v4 as uuid } from "uuid";

export interface ToDo {
    id: string;
    done: boolean;
    text: string;
}

type ActionType =
    | { type: "ADD"; text: string }
    | { type: "REMOVE"; id: string };

export function useTodos(initialTodos: ToDo[]): {
    todos: ToDo[];
    addToDo: (text: string) => void;
    removeToDo: (id: string) => void;
} {
    const [todos, dispatch] = React.useReducer(
        (state: ToDo[], action: ActionType) => {
            switch (action.type) {
                case "ADD":
                    return [
                        ...state,
                        { id: uuid(), text: action.text, done: false },
                    ];
                case "REMOVE":
                    return state.filter((t: ToDo) => t.id !== action.id);
                default:
                    return state;
            }
        },
        initialTodos
    );

    const addToDo = React.useCallback(
        (text: string) => dispatch({ type: "ADD", text }),
        []
    );

    const removeToDo = React.useCallback(
        (id: string) => dispatch({ type: "REMOVE", id }),
        []
    );

    return { todos, addToDo, removeToDo };
}
