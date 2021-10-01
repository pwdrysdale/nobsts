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

type FetchPokemonResult<T> = T extends undefined
    ? Promise<PokemonResults>
    : void;

function fetchPokemon<T extends undefined | ((data: PokemonResults) => void)>(
    link: string,
    cb?: T
): FetchPokemonResult<T> {
    if (cb) {
        fetch(link)
            .then((data: any) => data.json())
            .then((data: any) => cb(data as PokemonResults));
        return undefined as FetchPokemonResult<T>;
    } else {
        return fetch(link).then((res: any) =>
            res.json()
        ) as FetchPokemonResult<T>;
    }
}

fetchPokemon(url, (data) => {
    data.results.forEach((pokemon) => console.log(pokemon.name));
});

(async function () {
    const data = <PokemonResults>await fetchPokemon(url);
    data.results.forEach((pokemon) => console.log(pokemon.name));
})();
