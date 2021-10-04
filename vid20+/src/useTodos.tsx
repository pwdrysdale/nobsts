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

type UseTodosManagerResult = ReturnType<typeof useTodosManager>;

const TodoContext = React.createContext<UseTodosManagerResult>({
    todos: [],
    addToDo: () => {},
    removeToDo: () => {},
});

function useTodosManager(initialTodos: ToDo[]): {
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

export const TodosProvider: React.FunctionComponent<{ initialTodos: ToDo[] }> =
    ({ initialTodos, children }) => (
        <TodoContext.Provider value={useTodosManager(initialTodos)}>
            {children}
        </TodoContext.Provider>
    );

export const useTodos = (): ToDo[] => {
    const ctx = React.useContext(TodoContext);
    return ctx.todos;
};

export const useAddTodos = (): UseTodosManagerResult["addToDo"] => {
    const ctx = React.useContext(TodoContext);
    return ctx.addToDo;
};

export const useRemoveTodo = (): UseTodosManagerResult["removeToDo"] => {
    const ctx = React.useContext(TodoContext);
    return ctx.removeToDo;
};
