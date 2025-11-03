import { DarkMode, LightMode } from "@mui/icons-material"
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"

type Props = {
    toggleDarkMode: () => void;
    darkMode: boolean;
}

export const NavBar = ({darkMode, toggleDarkMode} : Props) => {

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6">
                    Re-store
                    <IconButton onClick={toggleDarkMode} sx={{ml:2}}>
                        {darkMode ? <DarkMode /> : <LightMode sx= {{color:'yellow'}}/> }
                    </IconButton>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}