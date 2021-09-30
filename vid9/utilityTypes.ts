// --------------------------------------------------------------------------------
// Exmample 1: Partials
// Makes everything optional

interface MyUser {
    name: string;
    id: string;
    email?: string;
    phone?: string;
}

// interface MyUserOptionals {
//     name?: string;
//     id?: string;
//     email?: string;
// }
type MyUserOptionals = Partial<MyUser>;

const merge = (user: MyUser, overrides: MyUserOptionals): MyUser => {
    return { ...user, ...overrides };
};

console.log(
    merge(
        {
            name: "Peter",
            id: "2sdff",
            email: "test@test.com",
        },
        {
            email: "realboy@realboy.com",
        }
    )
);

// --------------------------------------------------------------------------------
// Exmample 2: Required
// Makes everything required

type RequiredMyUser = Required<MyUser>;

// --------------------------------------------------------------------------------
// Exmample 3: Pick
// Take what you want

type EmailName = Pick<MyUser, "email" | "name">;

// --------------------------------------------------------------------------------
// Exmample 3: Records
// Generates a map

// MyUser["id"] takes the type from the interface that already exists
const mapById = (users: MyUser[]): Record<MyUser["id"], MyUser> => {
    return users.reduce((a, v) => {
        return { ...a, [v.id]: v };
    }, {});
};

console.log(
    mapById([
        { id: "foo", name: "Mr Foo" },
        { id: "baz", name: "Miss Baz" },
    ])
);
// {
//   foo: { id: 'foo', name: 'Person One' },
//   baz: { id: 'baz', name: 'Person Two' }
// }

// --------------------------------------------------------------------------------
// Exmample 4: Omit
// Removes fields from the type

type UserWithoutID = Omit<MyUser, "id">;

const mapByIdAnon = (users: MyUser[]): Record<MyUser["id"], UserWithoutID> => {
    return users.reduce((a, v) => {
        const { id, ...rest } = v;
        return { ...a, [id]: rest };
    }, {});
};

console.log(
    mapByIdAnon([
        { id: "foo", name: "Mr Foo" },
        { id: "baz", name: "Miss Baz" },
    ])
);
// { foo: { name: 'Mr Foo' }, baz: { name: 'Miss Baz' } }
