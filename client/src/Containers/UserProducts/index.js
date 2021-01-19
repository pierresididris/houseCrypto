import React from 'react';
import { Product } from '../../Components'

const UserProducts = ({array}) => {
    return(
    <>
    <p>VOS BIENS</p>
    {
        array.length === 0 ? 
        <>
            <p>Vous n'avez encore rien acheté, et si vous achetiez quelque chose ?</p>
        </>
        :
        array.map((product)=>{
            return(
            <Product 
             product={product}
             purchaseRealEstate={undefined}
             parentProps={undefined}/>
            )
        })
    }
    </>
    )
}

export default UserProducts;