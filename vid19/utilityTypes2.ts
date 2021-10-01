type Name = {
    first: string;
    last: string;
};

function addFullName(name: Name): Name & { fullName: string } {
    return { ...name, fullName: `${name.first} ${name.last}` };
}

function permuteRows<T extends (...args: any[]) => any>(
    iteratorFunction: T,
    data: Parameters<T>[0][]
): ReturnType<T>[] {
    return data.map(iteratorFunction);
}

console.log(
    permuteRows(addFullName, [
        { first: "Peter", last: "Drysdale" },
        { first: "Tiffany", last: "Drysdale" },
    ])
);

class PersonWithFullName {
    constructor(public name: Name) {}

    get fullName() {
        return `${this.name.first} ${this.name.last}`;
    }
}

function createObjects<T extends new (...args: any[]) => any>(
    ObjectType: T,
    data: ConstructorParameters<T>[0][]
): InstanceType<T>[] {
    return data.map((item) => new ObjectType(item));
}

console.log(
    createObjects(PersonWithFullName, [
        { first: "Jack", last: "Herrington" },
        { first: "LG", last: "Doggy" },
    ]).map((obj) => obj.fullName)
);
