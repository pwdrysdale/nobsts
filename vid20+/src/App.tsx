import React from "react";
import { v4 as uuid } from "uuid";

import { useTodos } from "./useTodos";
import "./App.css";

const Heading = ({ title }: { title: string }) => {
    return <h2>{title}</h2>;
};

const Box: React.FunctionComponent = ({ children }) => {
    return (
        <div style={{ padding: "1rem", fontWeight: "bold" }}>{children}</div>
    );
};

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
    const { addToDo, removeToDo, todos } = useTodos([
        { id: uuid(), text: "This is a sample todo", done: false },
    ]);

    const newToDoRef = React.useRef<HTMLInputElement>(null);

    const onAddToDo = React.useCallback(() => {
        if (newToDoRef.current) {
            addToDo(newToDoRef.current.value);
            newToDoRef.current.value = "";
        }
    }, [addToDo]);

    // vid 22
    const [value, setValue] = useNumber(0);

    return (
        <div>
            <Heading title="Introduction" />
            <Box>Hello there!</Box>

            <Incrementer value={value} setValue={setValue} />
            <Heading title="To Do's" />
            {todos.map((todo) => (
                <div key={todo.id}>
                    {todo.text}
                    <Button onClick={() => removeToDo(todo.id)}>Remove</Button>
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
