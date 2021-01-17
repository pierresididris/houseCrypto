import React from 'react';
import Web3 from 'web3'

const Product = ({name, price, owner, description, sellingDate, purchased, id, purchaseRealEstate, parentProps}) => {
    return(
<div className="col-md-3 col-sm-6">
<div className="product-grid6">
  <div className="product-image6">
    <a href="#">
      <img className="pic-1" src="http://bestjquery.com/tutorial/product-grid/demo10/images/img-1.jpg"></img>
    </a>
  </div>
  <div className="product-content">
    <h3 className="title"><p>{name}</p></h3>
    <div className="price">{Web3.utils.fromWei(price.toString(), 'Ether')} Eth
    </div>
    <p>{name}</p>
    <p>{owner}</p>
    <p>{description}</p>
    <p>
    {
    Date(sellingDate)
    }
    </p>
  </div>
  <ul className="social">
    <li><a href="" data-tip="consulter"><i className="fa fa-search"></i></a></li>
    <li>
      { !purchased && purchaseRealEstate !== undefined
      ? <button name={id}
        value={price}
        data-tip="acheter"
        onClick={() => {
          purchaseRealEstate(id, price, parentProps.marketplace, parentProps.account)
          
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