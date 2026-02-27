import { PropsWithChildren, useEffect, useState } from "react";
import axios from "axios";

interface PokemonCardProps extends PropsWithChildren {
    id: number;
}

interface Pokemon {
    name: string,
    pokemontypes: {
      type: {
        name: string
      },
      slot: number
    }[],
    pokemonsprites: {
        frontDefault: string,
        backDefault: string
    }[]
}

const fetchPokemon = async (id: number) => {
    try {
        const response = await axios.get<Pokemon>(`/pokemon/${id}`);
        if(response.status === 200) {
            return response.data;
        }
    }
    catch(e) {
        console.log((e as any).message);
    }
    return null;
}

const Spinner = () => <div className="w-100 d-flex justify-content-center align-items-center">
    <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
</div>;

const PokemonCardContent = ({ pokemon }: { pokemon: Pokemon | null }) => {
    if(!pokemon) {
        return(
        <div className="card-body">
            <h5 className="card-title">Pokemon not found</h5>
        </div>
        );
    }
    
    return(
    <>
        <img src={pokemon.pokemonsprites[0].frontDefault} className="card-img-top" alt={pokemon?.name} />
        <div className="card-body">
            <h5 className="card-title">{pokemon.name}</h5>
            {
                pokemon.pokemontypes.map((pokemonType) => (
                    <span key={pokemonType.slot} className="badge bg-primary me-1">{pokemonType.type.name}</span>
                ))
            }
        </div>
    </>
    );
}

export default ({ id }: PokemonCardProps) => {
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState<Pokemon|null>(null);

    const fetchPokemonData = async () => {
        setLoading(true);
        const pokemonData = await fetchPokemon(id);
        setPokemon(pokemonData);
        setLoading(false);
    }

    useEffect(() => {
        fetchPokemonData();
    }, [id]);

    return(
        <div className="card">
            { loading ? <Spinner /> : <PokemonCardContent pokemon={pokemon} /> }
        </div>
    );
}