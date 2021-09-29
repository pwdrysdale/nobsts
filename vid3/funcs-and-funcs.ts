export function printToFile(text: string, callback: () => void): void {
    console.log(text);
    callback();
}

export type MutationFunction = (v: number) => number;

export function arrayMutate(
    numbers: number[],
    mutate: MutationFunction
): number[] {
    return numbers.map(mutate);
}

const myNewMutationFunction: MutationFunction = (v: number): number => v * v;

console.log(arrayMutate([2, 34, 45], (v) => v * 10));
console.log(arrayMutate([2, 34, 45], myNewMutationFunction));

export type AdderFunction = (v: number) => number;

export function createAdder(num: number): AdderFunction {
    return (val: number) => num + val;
}

const addOne = createAdder(1);
console.log(addOne(50));
console.log(createAdder(5)(50));
