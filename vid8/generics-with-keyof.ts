// ----------------------------------------------------------------------
// exmaple 1: extracting data on keys

function pluck<DataType, KeyType extends keyof DataType>(
    items: DataType[],
    key: KeyType
): DataType[KeyType][] {
    return items.map((item) => item[key]);
}

// ----------------------------------------------------------------------
// testing exmaple 1

const dogs = [
    { name: "Mimi", age: 12 },
    { name: "LG", age: 13 },
];

console.log(pluck(dogs, "name"));
console.log(pluck(dogs, "age"));

// ----------------------------------------------------------------------
// exmaple 2: events mapping

interface BaseEvent {
    time: number;
    user: string;
}

interface EventMap {
    addToCart: BaseEvent & { quantity: number; productID: string };
    checkout: BaseEvent;
}

function sendEvent<Name extends keyof EventMap>(
    name: Name,
    data: EventMap[Name]
): void {
    console.log([name, data]);
}

// ----------------------------------------------------------------------
// testing exmaple 2

sendEvent("addToCart", {
    productID: "foo",
    user: "baz",
    quantity: 1,
    time: 10,
});

sendEvent("checkout", { time: 1, user: "Pete" });
