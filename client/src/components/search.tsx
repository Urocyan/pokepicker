import axios from "axios";
import { InputEvent, useState } from "react";
import { PokemonBase } from "types/pokemon";

export const Search: React.FC<{ addCallback: (id: number) => void }> = ({ addCallback }) => {
    const [suggestions, setSuggestions] = useState<PokemonBase[]>([]);
    const [input, setInput] = useState("");
    const [timeoutId, setTimeoutId] = useState<number | null>(null);

    const fetchSuggestions = async () => {
        setSuggestions((await searchPokemonByName(input)) ?? []);
    }

    const searchPokemonByName = async (name: string) => {
        try {
            const response = await axios.get<{ pokemon: PokemonBase[] }>(`/pokemon?query=${name}`);
            if(response.status === 200) {
                return response.data.pokemon;
            }
        }
        catch(e) {
            return null;
        }
    }

    const startTimeout = () => {
        setSuggestions([]);
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            fetchSuggestions();
        }, 2000);
        setTimeoutId(newTimeoutId);
    }

    const handleAdd = async () => {
        if(!input) return;
        let pokemon = suggestions.find(suggestion => suggestion.name.toLowerCase() === input.toLowerCase());
        if(!pokemon) {
            pokemon = (await searchPokemonByName(input))?.[0];
        }
        if(pokemon) {
            addCallback(pokemon.id);
            setInput("");
            setSuggestions([]);
        }
    }

    const inputAllowsSuggestionChange = (e: InputEvent<HTMLInputElement>) => {
        return e.nativeEvent.inputType === 'insertText';
    }

    return(
        <div className="input-group mb-3 w-100">
            <input onInput={(e) => {
                setInput(e.currentTarget.value);
                if(inputAllowsSuggestionChange(e)) startTimeout();
            }} value={input} className="form-control" list="datalistOptions" placeholder="Type to search..." />
            <datalist id="datalistOptions">
                {
                    suggestions.map((suggestion, index) => (
                        <option key={`suggestion-${index}`} value={suggestion.name} />
                    ))
                }
            </datalist>
            <button onClick={() => handleAdd()} className="btn btn-outline-primary" type="button">Add</button>
        </div>
    );
}