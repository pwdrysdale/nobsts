function addNumbers(a: number, b: number): number {
    return a + b;
}

export const addStrings = (
    str1: string,
    str2: string = "with no last name"
): string => `${str1} ${str2}`;

export const format = (title: string, param: string | number): string => {
    return `${title} ${param}`;
};

export const printFormat = (title: string, param: string | number): void => {
    console.log(format(title, param));
};

export const fetchData = (url: string): Promise<string> =>
    Promise.resolve(`Data from ${url}`);

export function introduce(salutation: string, ...names: string[]): string {
    return `${salutation} ${names.join(" ")}`;
}

export function getName(user: { first: string; last: string }): string {
    // if user is undefined it gives the string. the coalessing operator (fallback)
    // https://mariusschulz.com/blog/nullish-coalescing-the-operator-in-typescript
    return `${user?.first ?? "first"} ${user?.last ?? "last"}`;
}

export default addNumbers;
