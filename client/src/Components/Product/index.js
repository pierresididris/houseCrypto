import React from 'react';
import Web3 from 'web3';
import {ProductDetails} from '../../Components';

const Product = ({product, purchaseRealEstate, parentProps, resell, createRealEstate, marketplace, account}) => {
  console.log(product)
  const [modalShow, setModalShow] = React.useState(false);
  return(
    <div class="col-6 col-md-3 product-content">
     <div className="card product-grid6 h-70">
             <img className="img-fluid card-img-top" src="http://www.freeimageslive.com/galleries/buildings/city/preview/terraced_houses_manchester_298792.jpg"></img>
         <div className="card-body product-content">
           <h5 className="card-title">{product.name}</h5>
           <p className="card-text">{product.description}</p>
           <p className="card-text">Mise en vente le : {product.sellingDate}</p>

         </div>
         <ul class="list-group list-group-flush">
          <li class="list-group-item price">{Web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</li>
        </ul>
         <ul className="social">
           <li>
             <button data-tip="consulter" variant="primary" onClick={() => setModalShow(true)}>
               <i className="fa fa-search"></i>
             </button>
             <ProductDetails
             product={product}
             show={modalShow}
             resell={resell}
             marketplace={marketplace}
             account={account}
             createRealEstate={createRealEstate}
             onHide={() => setModalShow(false)}
           />
           </li>
           <li>
             { !product.purchased && purchaseRealEstate !== undefined
             ? <button name={product.id}
               value={product.price}
               data-tip="acheter"
               onClick={() => {
                 purchaseRealEstate(product.id, product.price, parentProps.marketplace, parentProps.account) 
               }}>
                 <i className="fa fa-shopping-cart"></i>
               </button>
               : null
             }
           </li>
         </ul>
       </div>
    </div>
  )
}

export default Product; 