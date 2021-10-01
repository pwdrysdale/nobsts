import fetch from "node-fetch";

const url: string = "https://pokeapi.co/api/v2/pokemon?limit=10";

interface PokemonResults {
    count: number;
    next?: string;
    previous?: string;
    results: {
        name: string;
        url: string;
    }[];
}

function fetchPokemon(link: string, cb: (data: PokemonResults) => void): void;
function fetchPokemon(link: string): Promise<PokemonResults>;
function fetchPokemon(
    link: string,
    cb?: (data: PokemonResults) => void
): unknown {
    if (cb) {
        fetch(link)
            .then((data: any) => data.json())
            .then((data: any) => cb(data as PokemonResults));
        return;
    } else {
        return fetch(link).then((res: any) => res.json());
    }
}

fetchPokemon(url, (data) => {
    data.results.forEach((pokemon) => console.log(pokemon.name));
});

(async function () {
    const data = await fetchPokemon(url);
    data.results.forEach((pokemon) => console.log(pokemon.name));
})();
