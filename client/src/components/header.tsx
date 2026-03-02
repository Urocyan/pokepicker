import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export const Header: React.FC = () => {
    return(
        <Box sx={ { flexGrow: 1, marginBottom: 16 } }>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    PokePicker
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}