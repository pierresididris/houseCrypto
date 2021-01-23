import React from 'react';
import { Product } from '../../Components'

const UserProducts = ({array, createRealEstate, account, marketplace}) => {
    return(
    <>
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
             resell={true}
             createRealEstate={createRealEstate}
             account={account}
             marketplace={marketplace}
             purchaseRealEstate={undefined}
             parentProps={undefined}/>
            )
        })
    }
    </>
    )
}

export default UserProducts;