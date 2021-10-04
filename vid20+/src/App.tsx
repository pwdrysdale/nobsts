import React from "react";
// import { v4 as uuid } from "uuid";
import { Provider, useSelector, useDispatch } from "react-redux";

import store, { selectTodos, addTodo, removeTodo, Todo } from "./store";
// import { ToDo, useTodos } from "./useTodos";
import "./App.css";

const Heading = ({ title }: { title: string }) => {
    return <h2>{title}</h2>;
};

const Box: React.FunctionComponent = ({ children }) => {
    return (
        <div style={{ padding: "1rem", fontWeight: "bold" }}>{children}</div>
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
    const todos = useSelector(selectTodos);
    const dispatch = useDispatch();

    // const { addToDo, removeToDo, todos } = useTodos([
    //     { id: uuid(), text: "This is a sample todo", done: false },
    // ]);

    const newToDoRef = React.useRef<HTMLInputElement>(null);

    const onAddToDo = React.useCallback(() => {
        if (newToDoRef.current) {
            dispatch(addTodo(newToDoRef.current.value));
            newToDoRef.current.value = "";
        }
    }, [dispatch]);

    return (
        <div>
            <Heading title="Introduction" />
            <Box>Hello there!</Box>

            <Heading title="To Do's" />
            <UL
                items={todos}
                itemClick={(item: Todo): void => {
                    alert(item.id);
                }}
                render={(item: Todo): React.ReactNode => (
                    <div>
                        {item.text}
                        <Button onClick={() => dispatch(removeTodo(item.id))}>
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

const JustTodos = () => {
    const todos = useSelector(selectTodos);

    return (
        <UL
            items={todos}
            render={(items: Todo) => <li>{items.text}</li>}
            itemClick={() => {}}
        />
    );
};

const AppWrapper = () => {
    return (
        <Provider store={store}>
            <App />
            <JustTodos />
        </Provider>
    );
};

export default AppWrapper;
