import { useState } from "react";
import PokemonCard from "./pokemon/pokemonCard";
import { Header } from "./header";
import { Search } from "./search";

export const Index: React.FC = () => {
    const [currentPokemonId, setCurrentPokemonId] = useState<number | null>(null);

    return(
        <div>
            <Header />
            <Search addCallback={setCurrentPokemonId} />

            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-3">
                        { currentPokemonId !== null && <PokemonCard id={currentPokemonId} /> }
                    </div>
                </div>
            </div>
        </div>
    );
}