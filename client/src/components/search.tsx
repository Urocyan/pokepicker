import { Autocomplete, Box, Button, Grid, TextField, InputAdornment } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { PokeapiClient } from "../lib/pokeapiClient";

export const Search: React.FC<{ addCallback: (id: number) => void }> = ({ addCallback }) => {
    const [suggestions, setSuggestions] = useState<{ label: string, id: number }[]>([]);
    const [input, setInput] = useState("");
    const [timeoutId, setTimeoutId] = useState<number | null>(null);

    const fetchSuggestions = async () => {
        const suggestions = await searchPokemonByName(input);
        setSuggestions(suggestions?.map(p => ({ label: p.name, id: p.id })) ?? []);
    }

    const searchPokemonByName = (name: string) => new PokeapiClient().searchPokemonByName(name);

    const startTimeout = () => {
        setSuggestions([]);
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            fetchSuggestions();
        }, 1000);
        setTimeoutId(newTimeoutId);
    }

    const handleAdd = async () => {
        if(!input) return;
        let pokemon = suggestions.find(suggestion => suggestion.label.toLowerCase() === input.toLowerCase());
        if(!pokemon) {
            const search = await searchPokemonByName(input);
            if(search) pokemon = { label: search[0].name, id: search[0].id };
        }
        if(pokemon) {
            addCallback(pokemon.id);
            setInput("");
            setSuggestions([]);
        }
    }

    const handleInput = (_: SyntheticEvent, value: string, reason: string) => {
        setInput(value);
        if(reason === 'input') startTimeout();
    }

    return(
        <Grid container spacing={2}>
            <Grid offset={ { xs: 0, lg: 2 } } size={ { xs: 12, lg: 8 } }>
                <Box sx={ { display: 'flex', justifyContent: 'center', alignItems: 'stretch' } }>
                    <Autocomplete
                        fullWidth
                        filterOptions={x => x}
                        options={suggestions}
                        inputValue={input}
                        onInputChange={handleInput}
                        renderInput={(params) => <TextField {...params} label="pokemon" />} />
                    <Button sx={ { ml: 4 } } variant="outlined" onClick={handleAdd}>Add</Button>
                </Box>
            </Grid>
        </Grid>
    );
}