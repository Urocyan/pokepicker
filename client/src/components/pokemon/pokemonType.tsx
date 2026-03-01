import { PokemonTypes } from "types/pokemon_types";

const typeColors: Record<PokemonTypes, string> = {
    [PokemonTypes.Normal]: "#aa9",
    [PokemonTypes.Fire]: "#f42",
    [PokemonTypes.Water]: "#39f",
    [PokemonTypes.Electric]: "#fc3",
    [PokemonTypes.Grass]: "#7c5",
    [PokemonTypes.Ice]: "#6cf",
    [PokemonTypes.Fighting]: "#b54",
    [PokemonTypes.Poison]: "#a59",
    [PokemonTypes.Ground]: "#db5",
    [PokemonTypes.Flying]: "#89f",
    [PokemonTypes.Psychic]: "#f59",
    [PokemonTypes.Bug]: "#ab2",
    [PokemonTypes.Rock]: "#ba6",
    [PokemonTypes.Ghost]: "#66b",
    [PokemonTypes.Dragon]: "#76e",
    [PokemonTypes.Dark]: "#754",
    [PokemonTypes.Steel]: "#aab",
    [PokemonTypes.Fairy]: "#e9e"
}

export const PokemonType: React.FC<{ type: PokemonTypes }> = ({ type }) => {
    return <span className="badge" style={{ backgroundColor: typeColors[type] }}>{type}</span>;
}