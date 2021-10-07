import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";

const todoMachine = createMachine<
    { todos: ToDo[] },
    | { type: "START_WORKING" }
    | { type: "END_WORKING" }
    | { type: "SET_TODOS"; todos: ToDo[] }
    | { type: "ADD_TODO"; text: string }
    | { type: "REMOVE_TODO"; id: string }
>(
    {
        id: "todoMachine",
        initial: "editing",
        context: {
            todos: [],
        },
        states: {
            editing: {
                on: {
                    START_WORKING: {
                        target: "working",
                        cond: "haveUndoneTodos",
                    },
                    ADD_TODO: {
                        actions: assign({
                            todos: ({ todos }, { text }) => [
                                ...todos,
                                { id: uuid(), text, done: false },
                            ],
                        }),
                    },
                    REMOVE_TODO: {
                        actions: assign({
                            todos: ({ todos }, { id }) =>
                                todos.filter((t: ToDo) => t.id !== id),
                        }),
                    },
                    SET_TODOS: {
                        actions: assign({
                            todos: (_, { todos }) => todos,
                        }),
                    },
                },
            },
            working: {
                exit: assign({
                    todos: ({ todos }) => {
                        const newTodos = [...todos];
                        const undoneTodo = newTodos.find(({ done }) => !done);

                        if (undoneTodo) {
                            undoneTodo.done = true;
                        }
                        return newTodos;
                    },
                }),
                on: {
                    END_WORKING: { target: "editing" },
                },
            },
        },
    },
    {
        guards: {
            haveUndoneTodos: ({ todos }) => todos.some(({ done }) => !done),
        },
    }
);

export interface ToDo {
    id: string;
    done: boolean;
    text: string;
}

export function useTodos(initialTodos: ToDo[]): {
    isEditing: boolean;
    todos: ToDo[];
    addToDo: (text: string) => void;
    removeToDo: (id: string) => void;
    startWorking: () => void;
    endWorking: () => void;
} {
    const [state, send] = useMachine(todoMachine);

    useEffect(() => {
        send({ type: "SET_TODOS", todos: initialTodos });
    }, [initialTodos, send]);

    // const [todos, dispatch] = React.useReducer(
    //     (state: ToDo[], action: ActionType) => {
    //         switch (action.type) {
    //             case "ADD":
    //                 return [
    //                     ...state,
    //                     { id: uuid(), text: action.text, done: false },
    //                 ];
    //             case "REMOVE":
    //                 return state.filter((t: ToDo) => t.id !== action.id);
    //             default:
    //                 return state;
    //         }
    //     },
    //     initialTodos
    // );

    const addToDo = React.useCallback(
        (text: string) => send({ type: "ADD_TODO", text }),
        [send]
    );

    const removeToDo = React.useCallback(
        (id: string) => send({ type: "REMOVE_TODO", id }),
        [send]
    );

    const startWorking = React.useCallback(() => {
        send("START_WORKING");
    }, [send]);

    const endWorking = React.useCallback(() => {
        send("END_WORKING");
    }, [send]);

    return {
        isEditing: state.matches("editing"),
        todos: state.context.todos,
        addToDo,
        removeToDo,
        startWorking,
        endWorking,
    };
}
