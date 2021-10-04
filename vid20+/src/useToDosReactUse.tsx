import React from "react";
import { v4 as uuid } from "uuid";

import { createGlobalState } from "react-use";

export interface ToDo {
    id: string;
    done: boolean;
    text: string;
}

const useGlobalTodos = createGlobalState<ToDo[]>([]);

export function useToDos(initialTodos: ToDo[]): {
    todos: ToDo[];
    addToDo: (text: string) => void;
    removeToDo: (id: string) => void;
} {
    const [todos, setTodos] = useGlobalTodos();

    React.useEffect(() => {
        setTodos(initialTodos);
    }, [initialTodos, setTodos]);

    const addToDo = React.useCallback(
        (text: string) => {
            setTodos([...todos, { id: uuid(), text, done: false }]);
        },
        [todos, setTodos]
    );

    const removeToDo = React.useCallback(
        (id: string) => setTodos(todos.filter((todo) => todo.id !== id)),
        [todos, setTodos]
    );

    return { todos, addToDo, removeToDo };

    // const [todos, dispatch] = React.useReducer(
    //     (state: ToDo[], action: ActionType) => {
    //         switch (action.type) {
    //             case "ADD":
    //                 return [
    //                     ...state,
    //                     { id: uuid(), text: action.text, done: false },
    //                 ];
    //             case "REMOVE":
    //                 return state.filter(
    //                     (t: ToDo): boolean => t.id !== action.id
    //                 );
    //             default:
    //                 return state;
    //         }
    //     },
    //     initialTodos
    // );

    // const addToDo: (text: string) => void = React.useCallback(
    //     (text: string): void => dispatch({ type: "ADD", text }),
    //     []
    // );

    // const removeToDo: (id: string) => void = React.useCallback(
    //     (id: string): void => dispatch({ type: "REMOVE", id }),
    //     []
    // );

    // return { todos, addToDo, removeToDo };
    //}

    // export const TodosProvider: React.FunctionComponent<{ initialTodos: ToDo[] }> =
    //     ({ initialTodos, children }) => (
    //         <TodoContext.Provider value={useTodosManager(initialTodos)}>
    //             {children}
    //         </TodoContext.Provider>
    //     );

    // export const useTodos: () => ToDo[] = (): ToDo[] => {
    //     const ctx: UseTodosManagerResult = React.useContext(TodoContext);
    //     return ctx.todos;
    // };

    // export const useAddTodos: () => (text: string) => void =
    //     (): UseTodosManagerResult["addToDo"] => {
    //         const ctx: UseTodosManagerResult = React.useContext(TodoContext);
    //         return ctx.addToDo;
    //     };

    // export const useRemoveTodo: () => (id: string) => void =
    //     (): UseTodosManagerResult["removeToDo"] => {
    //         const ctx: UseTodosManagerResult = React.useContext(TodoContext);
    //         return ctx.removeToDo;
}
