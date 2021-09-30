class Doggy {
    constructor(public readonly name: string, public age: number) {}
}

// note that the type comes out of the class for free
const elgee: Doggy = new Doggy("LG", 13);
// elgee.name = "Foo";
console.log("Get a name from a standard class: ", elgee.name);
elgee.age = 14;
console.log("Check that the age has changed: ", elgee.age);

class DogList {
    // No one can change the list directly
    private doggies: Doggy[] = [];

    // statics can be accessed using dot notation, and without the need
    // to craete an instance of the class (outside of it, if we follow this
    // pattern))
    static instance: DogList = new DogList();

    // making the constructor private means that people will not be able
    // to generate more instances of the class
    private constructor() {}

    static addDog(dog: Doggy) {
        DogList.instance.doggies.push(dog);
    }

    getDogs(): Doggy[] {
        return this.doggies;
    }
}

DogList.addDog(elgee);
console.log(DogList.instance.getDogs());

const woofboy: Doggy = new Doggy("Woof Boy", 1);
DogList.addDog(woofboy);
console.log(DogList.instance.getDogs());
