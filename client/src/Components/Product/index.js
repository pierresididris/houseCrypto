import React from 'react';

const Product = ({name, price, owner, description, sellingDate}) => {
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
    <div className="price">{window.web3.fromWei(price.toString(), 'Ether')} Eth
    </div>
    <p>{name}</p>
    <p>{owner}</p>
    <p>{description}</p>
    <p>{sellingDate}</p>
  </div>
  <ul className="social">
    <li><a href="" data-tip="consulter"><i className="fa fa-search"></i></a></li>
    {/* <li>
      { !product.purchased
      ? <button name={product.id}
        value={product.price}
        data-tip="acheter"
        onClick={(event) => {
          //this.props.purchaseRealEstate(event.target.name, event.target.value)
        }}>
          <i className="fa fa-shopping-cart"></i>
        </button>
        : null
      }
    </li> */}
  </ul>
</div>
</div>
)
}

export default Product; 