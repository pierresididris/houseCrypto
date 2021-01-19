import React from 'react';
import { Product } from '../../Components'

const Products = ({ array, purchaseRealEstate, parentProps }) => {
    return (
        <>
            {
                array.map((product) => {
                    return (
                        <Product
                            product={product}
                            purchaseRealEstate={purchaseRealEstate}
                            parentProps={parentProps}
                        />
                    )
                })
            }
        </>
    )
}

export default Products;