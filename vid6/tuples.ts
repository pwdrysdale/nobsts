type ThreeDCoordinate = [x: number, y: number, z: number];

function add3DCoordinate(
    c1: ThreeDCoordinate,
    c2: ThreeDCoordinate
): ThreeDCoordinate {
    return [c1[0] + c2[0], c1[1] + c2[1], c1[2] + c2[2]];
}

console.log(add3DCoordinate([0, 0, 0], [10, 20, 31]));

function simpleStringState(
    initial: string
): [() => string, (v: string) => void] {
    let str: string = initial;
    return [
        () => str,
        (v: string) => {
            str = v;
        },
    ];
}

const [str1getter, str1setter] = simpleStringState("hello");

console.log(str1getter());
str1setter("pete");
console.log(str1getter());

const [str2getter, str2setter] = simpleStringState("Peter");

console.log(str2getter());
str2setter("Drysdale");
console.log(str2getter());
