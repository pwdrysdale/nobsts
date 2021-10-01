// ----------------------------------------------------------------------
// some type decs

type StrVoidFn = (str: string) => void;
type VoidStrFn = () => string;

// ----------------------------------------------------------------------
// Exmaple 1: a function that generates a function

function myLogFunction(): StrVoidFn {
    return (str: string): void => {
        console.log(str);
    };
}

// Testing
const logger: StrVoidFn = myLogFunction();
logger("Your string");

// ----------------------------------------------------------------------
// Example 2: a function that generates a class

function createLoggerClass() {
    return class MyLoggerClass {
        private completeLog: string = "";
        log(str: string): void {
            console.log("Logging: ", str);
            this.completeLog += str + "\n";
        }
        dumpLog() {
            return this.completeLog;
        }
    };
}

// testing

const MyLogger = createLoggerClass();
const logger2 = new MyLogger();
logger2.log("foo");
logger2.log("bar");
console.log(logger2.dumpLog());

// ----------------------------------------------------------------------
// Example 3: a function that generates a class from anotehr class
// Part a: Just a regular mixin

function CreateSimpleMemoryDatabase<T>() {
    return class SimpleMemoryDatabase {
        private db: Record<string, T> = {};

        set(id: string, value: T) {
            this.db[id] = value;
        }

        get(id: string): T {
            return this.db[id];
        }

        getObject(): object {
            return this.db;
        }
    };
}

// testing / implementation
const StringDatabase = CreateSimpleMemoryDatabase<string>();
const sdb1 = new StringDatabase();
sdb1.set("a", "hello");

// Part b: the class of a class of a function

type Constructor<T> = new (...args: any[]) => T;

function Dumpable<T extends Constructor<{ getObject(): object }>>(Base: T) {
    return class Dumpable extends Base {
        dump() {
            console.log(this.getObject());
        }
    };
}

// testing

const DumpableStringDatabase = Dumpable(StringDatabase);
const sdb2 = new DumpableStringDatabase();
sdb2.set("Jack", "Hello Jack");
sdb2.set("Peter", "Hi guy");
sdb2.dump();
