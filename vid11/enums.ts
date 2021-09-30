// const beforeLoad = "beforeLoad";
// const loading = "loading";
// const loaded = "loaded";

enum LoadingState {
    beforeLoad = "beforeLoad",
    loading = "loading",
    loaded = "loaded",
}

const englishLoadingStates = {
    [LoadingState.beforeLoad]: "Before Load",
    [LoadingState.loading]: "Loading...",
    [LoadingState.loaded]: "Loaded",
};

const isLoading = (state: LoadingState): boolean =>
    state === LoadingState.loaded;

console.log(isLoading(LoadingState.beforeLoad));

// example 2: literal types

// roll the dice 1, 2, or 3 times
function rollDice(dice: 1 | 2 | 3): number {
    let pip: number = 0;
    for (let i: number = 0; i < dice; i++) {
        pip += Math.floor(Math.random() * 6) + 1;
    }
    return pip;
}

console.log(rollDice(3));

function sendEventEnums(
    name: "addToCart",
    data: { productId: number; quantity: number }
): void;
function sendEventEnums(name: "checkout", data: { cartCount: number }): void;
function sendEventEnums(name: string, data: unknown): void {
    console.log(`${name}: ${JSON.stringify(data)}`);
}

sendEventEnums("checkout", { cartCount: 4 });
