import React from "react";
import { v4 as uuid } from "uuid";

import {
    TodosProvider,
    useTodos,
    useAddTodos,
    useRemoveTodo,
    ToDo,
} from "./useTodos";
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

function UL<T>({
    items,
    render,
    itemClick,
}: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
> & {
    items: T[];
    render: (item: T) => React.ReactNode;
    itemClick: (item: T) => void;
}) {
    return (
        <ul>
            {items.map((item, index) => (
                <li key={index} onClick={() => itemClick(item)}>
                    {render(item)}
                </li>
            ))}
        </ul>
    );
}

function App() {
    const todos = useTodos();
    const addToDo = useAddTodos();
    const removeTodo = useRemoveTodo();

    const newToDoRef = React.useRef<HTMLInputElement>(null);

    const onAddToDo = React.useCallback(() => {
        if (newToDoRef.current) {
            addToDo(newToDoRef.current.value);
            newToDoRef.current.value = "";
        }
    }, [addToDo]);

    const [value, setValue] = useNumber(0);

    return (
        <div>
            <Heading title="Introduction" />
            <Box>Hello there!</Box>

            <Incrementer value={value} setValue={setValue} />
            <Heading title="To Do's" />
            <UL
                items={todos}
                itemClick={(item: ToDo): void => {
                    alert(item.id);
                }}
                render={(item: ToDo): React.ReactNode => (
                    <div>
                        {item.text}
                        <Button onClick={() => removeTodo(item.id)}>
                            Remove
                        </Button>
                    </div>
                )}
            />

            <div>
                <input type="text" ref={newToDoRef} />
                <Button onClick={onAddToDo}>Add To Do</Button>
            </div>
        </div>
    );
}

const JustToDos = () => {
    const todos = useTodos();
    return (
        <UL
            items={todos}
            itemClick={(): void => {}}
            render={(item: ToDo): React.ReactNode => <div>{item.text}</div>}
        />
    );
};

const AppWrapper = () => {
    return (
        <TodosProvider
            initialTodos={[
                { id: uuid(), text: "This is a sample todo", done: false },
            ]}
        >
            <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
                <App />
                <JustToDos />
            </div>
        </TodosProvider>
    );
};

export default AppWrapper;
