// ------------------------------------
// Intro - basic types

// throws error in js, not ts
// let userName = "Pete";
// let hasLoggedIn = true;

// hasLoggedIn += " Drysdale";

// console.log(hasLoggedIn);

// ts

// basic types, will be typechecked
let userName: string = "Pete";
let hasLoggedIn: boolean = true;

userName += " Drysdale";

console.log(hasLoggedIn);

let myNumber: number = 9;

const myRegex: RegExp = /foo/;

const names: string[] = userName.split(" ");
const myValues: Array<number | RegExp> = [1, 3, 4, /Pete/];

// objects
interface Person {
    first: string;
    last: string;
}

const myPerson: Person = {
    first: "Peter",
    last: "Drysdale",
};

// note that Record is a utility type (see later content)
const ids: Record<number, string> = {
    10: "a",
    20: "b",
};
ids[30] = "c";

if (ids[30] === "d") {
}

for (let i = 0; i < 10; i++) {
    console.log(i);
}

[1, 2, 3].forEach((v) => console.log(v));
[4, 5, 6].map((v) => {
    return `v * 10`;
});
