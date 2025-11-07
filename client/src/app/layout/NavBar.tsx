import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material"
import { AppBar, Badge, Box, IconButton, LinearProgress, List, ListItem, Toolbar, Typography } from "@mui/material"
import type { AppDispatch, RootState } from "../../app/store/store";
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { setDarkMode } from "./uiSlice";


const midLinks = [
    {title: 'catalog', path: '/catalog'},
    {title: 'about', path: '/about'},
    {title: 'contact', path: '/contact'},
]

const rightLinks = [
    {title: 'login', path: '/login'},
    {title: 'register', path: '/register'},
]

const navStyles = {
    color:'inherit', 
    typography:'h6',
    textDecoration:'none',
    '&:hover': {color:'grey.500'},
    '&.active': {color:'#baecf9'}
}

export const NavBar = () => {
    const {isLoading, darkMode} =  useSelector((state: RootState) => state.ui);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <AppBar position="fixed">
            <Toolbar sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <Box display='flex' alignItems='center'>
                    <Typography component={NavLink} to='/' sx = {navStyles} variant="h6">
                        Re-store
                    </Typography>
                    <IconButton onClick={()=> dispatch(setDarkMode())} sx={{ml:2}}>
                        {darkMode ? <DarkMode /> : <LightMode sx= {{color:'yellow'}}/> }
                    </IconButton>
                </Box>
                
                <List sx ={{display:'flex'}}>
                    {midLinks.map(({title, path}) => (
                    <ListItem
                    component={NavLink}
                    to={path}
                    key={path}
                    sx={navStyles}
                    >
                    {title.toUpperCase()}
                    </ListItem>
                ) )}
                </List>

                <Box display='flex' alignItems='center'>
                    <IconButton size="large" sx ={{color:'inherit'}}>
                    <Badge badgeContent={4} color="secondary">
                        <ShoppingCart/>
                    </Badge>

                    </IconButton>
                    <List sx ={{display:'flex', ml:5}}>
                        {rightLinks.map(({title, path}) => (
                        <ListItem
                        component={NavLink}
                        to={path}
                        key={path}
                        sx={navStyles}
                        >
                        {title.toUpperCase()}
                        </ListItem>
                    ) )}
                    </List>
                </Box>
                
            </Toolbar>
            { isLoading && (
                <Box sx={{width: '100%', position: 'absolute', bottom:0 }}>
                    <LinearProgress color="secondary" />
                </Box>
            )}
        </AppBar>
    )
}