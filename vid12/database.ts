interface Database {
    get(id: string): string;
    set(id: string, value: string): void;
}

interface Persistable {
    saveToString(): string;
    restoreFromString(storedString: string): void;
}

class InMemoryDatabase implements Database {
    // private makes it only available to this class
    // protected lets classes that inherit have it
    protected db: Record<string, string> = {};

    get(id: string): string {
        return this.db[id];
    }

    set(id: string, value: string) {
        this.db[id] = value;
    }
}

const myDB: InMemoryDatabase = new InMemoryDatabase();
myDB.set("foo", "bar");
// myDB.db["foo"] =  "baz";
console.log("Intial get: ", myDB.get("foo"));

class PersistentMemoryDB extends InMemoryDatabase implements Persistable {
    saveToString(): string {
        return JSON.stringify(this.db);
    }

    restoreFromString(storedState: string): void {
        this.db = JSON.parse(storedState);
    }
}

const myNewDB: PersistentMemoryDB = new PersistentMemoryDB();
myNewDB.set("foo", "bar");
const stringDBContents: string = myNewDB.saveToString();
console.log("DB Contents: ", stringDBContents);

const myFreshDB: PersistentMemoryDB = new PersistentMemoryDB();
myFreshDB.restoreFromString(stringDBContents);
console.log("Find a restored value: ", myFreshDB.get("foo"));
