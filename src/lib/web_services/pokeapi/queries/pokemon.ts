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
`