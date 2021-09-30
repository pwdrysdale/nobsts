// ----------------------------------------------------------------
// example 1: make fields readonly

interface Cat {
    readonly name: string;
    breed: string;
}

// ----------------------------------------------------------------
// example 1a: use a utlitiy type to make it all readonly

type ReadOnlyCat = Readonly<Cat>;

function makeCat(name: string, breed: string): Cat {
    return { name, breed };
}

const usul = makeCat("Usul", "Tabby");

// without the read only flag in the interface this is valid, with it, not so much
// usul.name = "Piter"

// ----------------------------------------------------------------
// example 2: set the returns to readonly

function makeCoordinate(
    x: number,
    y: number,
    z: number
): readonly [number, number, number] {
    return [x, y, z];
}

const c1 = makeCoordinate(10, 20, 30);
// c1[0] = 50;

// ----------------------------------------------------------------
// example 3: actually make a const a const

const reallyConst = [1, 2, 3] as const;
// reallyConst[0] = 50
