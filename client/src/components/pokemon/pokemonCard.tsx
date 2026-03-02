import { PropsWithChildren, useEffect, useState } from "react";
import { PokemonType } from "./pokemonType";
import { PokeapiClient, Pokemon } from "../../lib/pokeapiClient";
import { Box, Card, CardContent, CardMedia, CircularProgress, Typography } from "@mui/material";

interface PokemonCardProps extends PropsWithChildren {
    id: number;
}

const fetchPokemon = (id: number) => new PokeapiClient().getPokemonById(id);

const Spinner = () => <Box sx={ { width: '100%', p: 8 } }>
    <CircularProgress />
</Box>;

const PokemonCardContent = ({ pokemon }: { pokemon: Pokemon | null }) => {
    if(!pokemon) {
        return(
            <CardContent>
                <Typography variant="h5" component="div">Pokemon not found</Typography>
            </CardContent>
        );
    }
    
    return(
    <>
        <CardMedia component='img' image={pokemon.pokemonsprites[0].frontDefault} title={pokemon.name} sx={ { width: '100%', height: 'auto' } } />
        <CardContent>
            <Typography variant="h5" component="div">
                {pokemon.name}
            </Typography>
            {
                pokemon.pokemontypes.map((pokemonType, index) => (
                    <PokemonType sx={ { ml: index == 0 ? 0 : 1 } } key={`${pokemon.name}-type-${index}`} type={pokemonType.type.name} />
                ))
            }
        </CardContent>
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
        <Card variant='outlined' sx={ { width: '100%' } }>
            { loading ? <Spinner /> : <PokemonCardContent pokemon={pokemon} /> }
        </Card>
    );
}