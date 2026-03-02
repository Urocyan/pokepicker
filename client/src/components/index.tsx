import { useState } from "react";
import PokemonCard from "./pokemon/pokemonCard";
import { Header } from "./header";
import { Search } from "./search";
import { Container, Grid } from "@mui/material";

export const Index: React.FC = () => {
    const [currentPokemonId, setCurrentPokemonId] = useState<number | null>(null);

    return(
        <div>
            <Header />
            <Container>
                <Search addCallback={setCurrentPokemonId} />
            </Container>
            <Container>
                <Grid container spacing={2}>
                    <Grid offset={ { xs: 0, lg: 3 } } size={ { xs: 12, lg: 6 } }>
                        { currentPokemonId !== null && <PokemonCard id={currentPokemonId} /> }
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}