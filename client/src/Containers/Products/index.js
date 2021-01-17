import React from 'react';
import { Product } from '../../Components'

const Products = ({product, purchaseRealEstate, parentProps}) => {
    return(
        <>
        <Product 
        name={product.name} 
        price={product.price}
         owner={product.owner} 
         description={product.description} 
         sellingDate={product.sellingDate} 
         purchased={product.purchased} 
         id={product.id}
         purchaseRealEstate={purchaseRealEstate}
         parentProps={parentProps}
         />
        </>
    )
}

export default Products;