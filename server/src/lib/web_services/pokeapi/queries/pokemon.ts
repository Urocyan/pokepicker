import { gql } from "@apollo/client";

export const searchPokemonByNameQuery = gql`
    query SearchPokemonByName($name: String!) {
        pokemon(where:  {
            name: {
                _ilike: $name
            }
        }) {
            name,
            id,
            pokemontypes {
                slot,
                type {
                    name
                }
            }
        }
    }
`;

export const getPokemonByIdQuery = gql`
    query GetPokemonById($id: Int) {
        pokemon(where:  {
            id: {
                _eq: $id
            }
        }, limit: 1) {
            name,
            pokemontypes {
                type {
                    name
                },
                slot
            }
            pokemonsprites {
              frontDefault: sprites(path: "front_default")
              backDefault: sprites(path: "back_default")
            }
        }
    }
`;