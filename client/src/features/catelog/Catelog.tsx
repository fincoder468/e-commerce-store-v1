import type { Product } from '../../app/models/product';
import { ProductList } from './ProductList';

type Props = {
  products: Product[];
}

export const Catelog = ({products}: Props) => {
  return (
    <>
      <ProductList products={products} />

    </>
  )
}
