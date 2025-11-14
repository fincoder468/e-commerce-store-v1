import { Filters } from './Filters';
import { ProductList } from './ProductList';
import { useFetchFiltersQuery, useFetchProductsQuery } from './catalogApi';
import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store/store';
import { AppPagination } from '../../app/shared/components/AppPagination';
import { useDispatch } from 'react-redux';
import { setPageNumber } from './catalogSlice';

export const Catalog = () => {
  const productParams = useSelector((state: RootState) => state.catalog);
  const { data, isLoading } = useFetchProductsQuery(productParams)
  const {data: filtersData, isLoading: filtersLoading} = useFetchFiltersQuery();
  const dispatch = useDispatch();
  
  if(isLoading || !data || filtersLoading || !filtersData) return <h3>Loading...</h3>
  return (
    <Grid container spacing={4}>
      <Grid size={3}>
        <Filters filtersData={filtersData}/>
      </Grid>
      <Grid size ={9}>
        {data.items && data.items.length > 0 ? (
          <>
            <ProductList products={data.items} />
            <AppPagination 
              metadata={data.pagination}
              onPageChange={(page:number)=> {
                dispatch(setPageNumber(page));
                window.scrollTo({top: 0, behavior:'smooth'})
              }}
            />
          </>
        ) : (
          <Typography variant='h5'>There are no results for this filter</Typography>
        )}
        
      </Grid>
      
    </ Grid>
  )
}
