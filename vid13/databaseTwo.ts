// ------------------------------------------------------------------------------------
// type declarations

interface DatabaseTwo<T, K> {
    get(id: K): T;
    set(id: K, value: T): void;
}

interface Persistable {
    saveToString(): string;
    restoreFromString(storedString: string): void;
}

type DBKeyType = string | number | symbol;

// ------------------------------------------------------------------------------------
// set up in memory db

class InMemDB<T, K extends DBKeyType> implements DatabaseTwo<T, K> {
    protected db: Record<K, T> = {} as Record<K, T>;

    get(id: K): T {
        return this.db[id];
    }

    set(id: K, value: T): void {
        this.db[id] = value;
    }
}

// ------------------------------------------------------------------------------------
// create instance and test in memory db

const myDBTwo: InMemDB<number, string> = new InMemDB();
myDBTwo.set("foo", 5);
console.log("Intial get: ", myDBTwo.get("foo"));

// ------------------------------------------------------------------------------------
// setup persistable memory db

class PersistMemDB<T, K extends DBKeyType>
    extends InMemDB<T, K>
    implements Persistable
{
    saveToString(): string {
        return JSON.stringify(this.db);
    }

    restoreFromString(storedState: string): void {
        this.db = JSON.parse(storedState);
    }
}

// ------------------------------------------------------------------------------------
// create and test saveable db

const myNewDBTwo: PersistMemDB<number, string> = new PersistMemDB<
    number,
    string
>();
myNewDBTwo.set("foo", 6);
const stringDBContentsTwo: string = myNewDBTwo.saveToString();
console.log("DB Contents: ", stringDBContentsTwo);

const myFreshDBTwo: PersistMemDB<number, string> = new PersistMemDB();
myFreshDBTwo.restoreFromString(stringDBContentsTwo);
console.log("Find a restored value: ", myFreshDBTwo.get("foo"));
