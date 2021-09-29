import addNumbers, {
    addStrings,
    fetchData,
    format,
    getName,
    introduce,
    printFormat,
} from "./functions";

console.log(addNumbers(1, 2));
// console.log(addNumbers(1, "Pete"));

console.log(addStrings("Peter", "Drysdale"));
console.log(addStrings("Peter"));

console.log(format("Peter", 3));

printFormat("Peter", 3);

console.log(fetchData("https://www.google.com"));

console.log(introduce("Mr", "Peter", "Ezra"));

const user = { first: "Peter", last: "Drysdale" };
console.log(getName(user));
