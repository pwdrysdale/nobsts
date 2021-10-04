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

const useNumber = (initialValue: number) =>
    React.useState<number>(initialValue);

type UserNumberValue = ReturnType<typeof useNumber>[0];
type UserNumberSetValue = ReturnType<typeof useNumber>[1];

const Incrementer: React.FunctionComponent<{
    value: UserNumberValue;
    setValue: UserNumberSetValue;
}> = ({ value, setValue }) => {
    return (
        <Button
            onClick={() => setValue(value + 1)}
            title={`Add - ${value}`}
        ></Button>
    );
};

const Button: React.FunctionComponent<
    React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > & { title?: string }
> = ({ title, children, style, ...rest }) => (
    <button
        {...rest}
        style={{
            ...style,
            backgroundColor: "blue",
            color: "white",
            fontSize: "large",
        }}
    >
        {title ?? children}
    </button>
);

function App() {
    // vid 20
    const onListClick = React.useCallback((item: string) => alert(item), []);

    // vid 21
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

    // vid 22
    const [value, setValue] = useNumber(0);

    return (
        <div>
            <Heading title="Introduction" />
            <Box>Hello there!</Box>
            <List
                items={["test", "Pete", "Mamma", "Ra ra boy"]}
                onClick={(item: string) => onListClick(item)}
            />
            <Box>{JSON.stringify(payload)}</Box>
            <Incrementer value={value} setValue={setValue} />
            <Heading title="To Do's" />
            {todos.map((todo) => (
                <div key={todo.id}>
                    {todo.text}
                    <Button
                        onClick={() =>
                            dispatch({ type: "REMOVE", id: todo.id })
                        }
                    >
                        Remove
                    </Button>
                </div>
            ))}
            <div>
                <input type="text" ref={newToDoRef} />
                <Button onClick={onAddToDo}>Add To Do</Button>
            </div>
        </div>
    );
}

export default App;
