import { useParams } from "react-router-dom";
import { Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TextField, Typography } from "@mui/material";
import { useFetchProductDetailsQuery } from "./catalogApi";

export const ProductDetails = () => {
  const {id} = useParams<{id:string}>();
  const {data: product, isLoading} = useFetchProductDetailsQuery(id ? +id :0);

  if (isLoading || !product) return <div>Loading...</div>

  const productDetails = [
    {label : 'Name', value: product.name},
    {label : 'Description', value: product.description},
    {label : 'Price', value: `$${(product.price / 100).toFixed(2)}`},
    {label : 'Type', value: product.type},
    {label : 'Brand', value: product.brand},
    {label : 'Quantity in Stock', value: product.quantityInStock}
  ]
  return (
    <Grid container spacing ={6} maxWidth="lg" sx={{mx: 'auto'}}>
      <Grid size={6}>
        <img 
          src={product?.pictureUrl} 
          alt={product.name} 
          style={{width: '100%'}}
        />
      </Grid>
      <Grid size={6}>
        <h3>{product?.name}</h3>
        <Divider sx={{mb:2}}/>
        <Typography variant="h4" color="secondary">${product ? (product.price / 100).toFixed(2) : ''}</Typography> 
        <TableContainer>
          <Table sx={{
            '& td':{fontSize: '1rem'}
          }}>
            <TableBody>
              {productDetails.map((details,index) => (
                <tr key={index}>
                  <TableCell sx={{fontWeight:'bold'}}>{details.label}</TableCell>
                  <TableCell>{details.value}</TableCell>
                </tr>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
          <Grid container spacing={2} sx={{mt:3}}>
            <Grid size={6}>
              <TextField 
                variant='outlined'
                type='number'
                label='Quantity' 
                fullWidth
                defaultValue={1}
                />
            </Grid>
            <Grid size={6}>
              <Button
              sx={{height:'55px'}}
                color="primary"
                size="large"
                variant="contained"
                fullWidth
                >
                  Add to cart
                </Button>
            </Grid>
          </Grid>
      </Grid>
    </Grid>
  )
}