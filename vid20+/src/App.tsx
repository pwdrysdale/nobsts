import React from "react";
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

function App() {
    const onListClick = React.useCallback((item: string) => alert(item), []);

    return (
        <div>
            <Heading title="Introduction" />
            <Box>Hello there!</Box>
            <List
                items={["test", "Pete", "Mamma", "Ra ra boy"]}
                onClick={(item: string) => onListClick(item)}
            />
        </div>
    );
}

export default App;
