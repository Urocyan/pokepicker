import { gql } from "@apollo/client";

export const getPokemonTypesQuery = gql`
    query getPokemonTypes {
        type(distinct_on: [id], where: {
            pokemonformtypes:  {
                pokemonform: {
                    form_name:  {
                    _nin: ["terastal","stellar","unknown"]
                    }
                }
            }
        }) {
            name,
            id,
            typeefficacies {
                damage_factor,
                target_type: TypeByTargetTypeId {
                    name,
                    id
                }
            }
        }
    } 
`;