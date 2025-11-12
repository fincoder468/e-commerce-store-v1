import { useParams } from "react-router-dom";
import { Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TextField, Typography } from "@mui/material";
import { useFetchProductDetailsQuery } from "./catalogApi";
import { useAddBasketItemMutation, useFetchBasketQuery, useRemoveBasketItemMutation } from "../basket/basketApi";
import { useEffect, useState, type ChangeEvent } from "react";

export const ProductDetails = () => {
  const {id} = useParams<{id:string}>();
  const [removeBasketItem] = useRemoveBasketItemMutation();
  const [addBasketItem] = useAddBasketItemMutation();
  const {data: basket} = useFetchBasketQuery();
  const item = basket?.items.find((item) => item.productId === +id!);
  const [quantity, setQuantity] = useState(0);

  useEffect(()=>{
    if(item) setQuantity(item.quantity);
  }, [item])

  const {data: product, isLoading} = useFetchProductDetailsQuery(id ? +id :0);

  if (isLoading || !product) return <div>Loading...</div>

   const handleUpdateBasket = () =>  {
    const updateQuantity = item ? Math.abs(quantity - item.quantity) : quantity;

    if(!item || quantity>item.quantity){
      addBasketItem({product, quantity:updateQuantity});
    } 
    else if(quantity<item.quantity) {
      removeBasketItem({productId: product.id, quantity: updateQuantity})
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement> ) => {
    const value = +event.currentTarget.value;
    if(value>=0) setQuantity(value);
  }

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
                label='Quantity in basket' 
                fullWidth
                value={quantity}
                onChange={handleInputChange}

                />
            </Grid>
            <Grid size={6}>
              <Button
                onClick={handleUpdateBasket}
                disabled = {quantity === item?.quantity || !item && quantity === 0}
                sx={{height:'55px'}}
                color="primary"
                size="large"
                variant="contained"
                fullWidth
                >
                  {item ? 'Update quantity' : 'Add to cart'}
                </Button>
            </Grid>
          </Grid>
      </Grid>
    </Grid>
  )
}