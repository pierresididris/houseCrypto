import React from 'react';
import Web3 from 'web3';
import {Button} from 'react-bootstrap';
import {ProductDetails} from '../../Components';

const Product = ({product, purchaseRealEstate, parentProps}) => {
  const [modalShow, setModalShow] = React.useState(false);
    return(
<div className="col-md-3 col-sm-6">
<div className="product-grid6">
  <div className="product-image6">
    <a href="#">
      <img className="pic-1" src="http://bestjquery.com/tutorial/product-grid/demo10/images/img-1.jpg"></img>
    </a>
  </div>
  <div className="product-content">
    <h3 className="title"><p>{product.name}</p></h3>
    <div className="price">{Web3.utils.fromWei(product.price.toString(), 'Ether')} Eth
    </div>
    <p>{product.name}</p>
    <p>{product.owner}</p>
    <p>{product.description}</p>
    <p>
    {
    Date(product.sellingDate)
    }
    </p>
  </div>
  <ul className="social">
    <li>
    <Button         data-tip="consulter"
variant="primary" onClick={() => setModalShow(true)}>
      </Button>
      <ProductDetails
        product={product}
        show={modalShow}
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