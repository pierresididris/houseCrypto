import React from 'react';
import { Product } from '../../Components'

const UserProducts = ({account, array}) => {
    return(
    <>
    <p>{account}</p>
    <p>VOS BIENS</p>
    {
        array.map((product)=>{
            return(
            <Product 
            name={product.name} 
            price={(product.price.toString())}
             owner={product.owner} 
             description={product.description} 
             sellingDate={product.sellingDate} 
             purchased={product.purchased} 
             id={product.id}
             purchaseRealEstate={undefined}
             parentProps={undefined}/>
            )
        })
    }
    </>
    )
}

export default UserProducts;