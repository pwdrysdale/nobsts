// ------------------------------------------------------------
// State example

function simpleState<T>(initial: T): [() => T, (v: T) => void] {
    let val: T = initial;
    return [
        () => val,
        (v: T) => {
            val = v;
        },
    ];
}

// ------------------------------------------------------------
// testing state example

// takes inferred state (from genereic)
const [st1getter, st1setter] = simpleState(3);

console.log(st1getter());
st1setter(30);
console.log(st1getter());

// can override the inferred state
const [st2getter, st2setter] = simpleState<string | null>(null);

console.log(st2getter());
st2setter("string");
console.log(st2getter());

// ------------------------------------------------------------
// Ranker example

interface Rank<RankItem> {
    item: RankItem;
    rank: number;
}

function ranker<RankItem>(
    items: RankItem[],
    rank: (v: RankItem) => number
): RankItem[] {
    const ranks: Rank<RankItem>[] = items.map((item) => {
        return { item, rank: rank(item) };
    });

    ranks.sort((a, b) => a.rank - b.rank);

    return ranks.map((rank) => {
        return rank.item;
    });
}

// ------------------------------------------------------------
// Testing rank example

interface Pokemon {
    name: string;
    hp: number;
}

const pokemon: Pokemon[] = [
    { name: "Bulbasor", hp: 20 },
    { name: "Megasaur", hp: 5 },
    { name: "Goldilocks", hp: 120 },
];

const ranks = ranker(pokemon, ({ hp }) => hp);

console.log(ranks);
