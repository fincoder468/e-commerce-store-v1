import { useEffect, useState } from 'react'
import type { Product } from '../models/product';
import { Catelog } from '../../features/catelog/Catelog';
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { NavBar } from './NavBar';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [ darkMode, setDarkMode ] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette :{
      mode:paletteType,
      background: {
        default: (paletteType === 'light') ? '#eaeaea' : '#121212'
      }
    }
  })
  
  useEffect(()=>{
    fetch('https://localhost:5001/api/products')
    .then(response=>response.json())
    .then(data=>setProducts(data));
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
    <Box
      sx={{
        minHeight: '100vh',
        background: darkMode 
          ? 'radial-gradient(circle, #1e3aBa, #111B27)'
          : 'radial-gradient(circle, #baecf9, #f0f9ff)',
        py: 6
      }}>
      <Container maxWidth="xl" sx={{mt: 8}}>
      <Catelog products={products}/>
    </Container>
    </Box>
    
    </ ThemeProvider>
    
  )
}

export default App
