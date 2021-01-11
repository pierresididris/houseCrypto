import React from 'react';
import { Product } from '../../Components'

const Products = ({product}) => {
    return(
        <>
        <Product name={product.name} price={(product.price.toString())} owner={product.owner} description={product.description} sellingDate={product.sellingDate}/>
        </>
    )
}

export default Products;