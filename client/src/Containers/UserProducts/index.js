import React from 'react';
import { Product } from '../../Components'

const UserProducts = ({array, createRealEstate, account, marketplace, type, type2}) => {
    return(
    <>
    {
        array.length === 0 ?
        <>
            <p>Vous n'avez encore rien {type}, et si vous {type2}?</p>
            {/* //<p>Vous n'avez encore rien acheté ou mis en vente, et si vous achetiez quelque chose ou mettiez en vente?</p> */}
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