function printIngredients(
    quantity: string,
    ingredient: string,
    extra?: string
) {
    console.log(`${quantity} ${ingredient} ${extra || ""}`);
}

printIngredients("1C", "flour");
printIngredients("1C", "sugar", "casseroles");

interface User {
    id: string;
    info?: {
        email?: string;
    };
}

function getEmail(user: User): string {
    if (user.info) {
        // Note that if you are sure that a field exists you can use the ! to over ride ts
        return user.info.email!;
    }
    return "";
}

function getEmailEasy(user: User): string {
    return user?.info?.email ?? "";
}

function addWithCallback(x: number, y: number, callback: () => void) {
    console.log(x, y);
    // you can check to see if the callback is there beofre calling it
    // if (callback) {
    //     callback
    // }

    // or
    callback?.();
}

addWithCallback(5, 6, () => console.log("Success!"));
