import React from "react";
import { v4 as uuid } from "uuid";
import "./App.css";

const Heading = ({ title }: { title: string }) => {
    return <h2>{title}</h2>;
};

const Box: React.FunctionComponent = ({ children }) => {
    return (
        <div style={{ padding: "1rem", fontWeight: "bold" }}>{children}</div>
    );
};

const List: React.FunctionComponent<{
    items: string[];
    onClick?: (item: string) => void;
}> = ({ items, onClick }) => {
    return (
        <ul>
            {items.map((item: string, index: number) => (
                <li key={index} onClick={() => onClick?.(item)}>
                    {item}
                </li>
            ))}
        </ul>
    );
};

interface PayloadType {
    text: string;
}

interface ToDo {
    id: string;
    done: boolean;
    text: string;
}

type ActionType =
    | { type: "ADD"; text: string }
    | { type: "REMOVE"; id: string };

function App() {
    const [payload, setPayload] = React.useState<null | PayloadType>(null);

    React.useEffect(() => {
        fetch("/data.json")
            .then((res) => res.json())
            .then((data) => setPayload(data as PayloadType));
    }, []);

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
        []
    );

    const newToDoRef = React.useRef<HTMLInputElement>(null);

    const onAddToDo = React.useCallback(() => {
        if (newToDoRef.current) {
            dispatch({
                type: "ADD",
                text: newToDoRef.current.value,
            });
            newToDoRef.current.value = "";
        }
    }, []);

    const onListClick = React.useCallback((item: string) => alert(item), []);

    return (
        <div>
            <Heading title="Introduction" />
            <Box>Hello there!</Box>
            <List
                items={["test", "Pete", "Mamma", "Ra ra boy"]}
                onClick={(item: string) => onListClick(item)}
            />
            <Box>{JSON.stringify(payload)}</Box>
            <Heading title="To Do's" />
            {todos.map((todo) => (
                <div key={todo.id}>
                    {todo.text}
                    <button
                        onClick={() =>
                            dispatch({ type: "REMOVE", id: todo.id })
                        }
                    >
                        Remove
                    </button>
                </div>
            ))}
            <div>
                <input type="text" ref={newToDoRef} />
                <button onClick={onAddToDo}>Add To Do</button>
            </div>
        </div>
    );
}

export default App;
