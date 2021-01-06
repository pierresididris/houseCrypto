import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Ajouter un produit</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          const price = window.web3.toWei(this.productPrice.value.toString(), 'Ether')
          this.props.createProduct(name, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Nom du produit"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Prix du produit"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Ajouter un produit</button>
        </form>
        <p> </p>
        <div className="container">
          <h2>Acheter un produit</h2>
          <div className="row">
            {this.props.products.map((product, key) => {
              return (
                <div className="col-md-3 col-sm-6">
                  <div className="product-grid6">
                    <div className="product-image6">
                      <a href="#">
                        <img class="pic-1" src="http://bestjquery.com/tutorial/product-grid/demo10/images/img-1.jpg"></img>
                      </a>
                    </div>
                    <div className="product-content">
                      <h3 className="title"><p>{product.name}</p></h3>
                      <div className="price">{window.web3.fromWei(product.price.toString(), 'Ether')} Eth
                      {/* <span>$14.00</span> */}
                      </div>
                      <h3>proprietaire</h3>
                      <p>{product.owner}</p>
                    </div>
                    <ul className="social">
                      <li><a href="" data-tip="consulter"><i className="fa fa-search"></i></a></li>
                      <li>
                        { !product.purchased
                        ? <button name={product.id}
                          value={product.price}
                          data-tip="acheter"
                          onClick={(event) => {
                            this.props.purchaseProduct(event.target.name, event.target.value)
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
            })}
          </div>



          {/* // <table className="table">
          //   <thead>
          //     <tr>
          //       <th scope="col">#</th>
          //       <th scope="col">Nom</th>
          //       <th scope="col">Prix</th>
          //       <th scope="col">Vendeur</th>
          //       <th scope="col"></th>
          //     </tr>
          //   </thead>
          //   <tbody id="productList">
          //     { this.props.products.map((product, key) => {
          //       return(
          //         <tr key={key}>
          //           <th scope="row">{product.id.toString()}</th>
          //           <td>{product.name}</td>
          //           <td>{window.web3.fromWei(product.price.toString(), 'Ether')} Eth</td>
          //           <td>{product.owner}</td>
          //           <td>
          //             { !product.purchased
          //             ? <button className="btn btn-primary"
          //                 name={product.id}
          //                 value={product.price}
          //                 onClick={(event) => {
          //                   this.props.purchaseProduct(event.target.name, event.target.value)
          //                 }}
          //               >
          //                 Acheter
          //               </button>
          //             : <button className="btn btn-primary">remettre en vente</button>
          //             }
          //           </td>
          //         </tr>
          //       )
          //     })}
          //   </tbody>
          // </table> */}
        </div>

      </div>
    );
  }
}

export default Main;