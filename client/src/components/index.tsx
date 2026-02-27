import { useState } from "react";
import PokemonCard from "./pokemon/pokemonCard";

export const Index: React.FC = () => {
    const [counter, setCounter] = useState(1);

    return(
        <div className="container">
            <div className="row">
                <div className="col-lg-6 offset-3">
                    <PokemonCard id={counter} />
                    <button className="btn btn-primary" onClick={() => setCounter(counter + 1)}>Next Pokemon</button>
                </div>
            </div>
        </div>
    );
}