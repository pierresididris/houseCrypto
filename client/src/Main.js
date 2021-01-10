import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content" className="main-content">
        <h1>Mettre un bien en vente</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          const price = window.web3.toWei(this.productPrice.value.toString(), 'Ether')
          const address = this.productAddress.value
          const area = this.productArea.value
          const description = this.productDescription.value
          const nbRoom = this.productNbRoom.value
          var sellingDate = Date.now().toString()
          this.props.createRealEstate(name, price, address, area, description, nbRoom, sellingDate)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Nom du bien"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="number"
              step="0.01"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Prix du bien"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productAddress"
              type="text"
              ref={(input) => { this.productAddress = input }}
              className="form-control"
              placeholder="Adresse du bien"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productArea"
              type="number"
              ref={(input) => { this.productArea = input }}
              className="form-control"
              placeholder="surface"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productDescription"
              type="text"
              ref={(input) => { this.productDescription = input }}
              className="form-control"
              placeholder="description"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productNbRoom"
              type="number"
              ref={(input) => { this.productNbRoom = input }}
              className="form-control"
              placeholder="Nombre de piece"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Ajouter un bien</button>
        </form>
        <p> </p>
        <div className="container">
          <h2>Acheter un produit</h2>
          <div className="row">
            {this.props.products.map((product) => {
              return (
                <div className="col-md-3 col-sm-6">
                  <div className="product-grid6">
                    <div className="product-image6">
                      <a href="#">
                        <img className="pic-1" src="http://bestjquery.com/tutorial/product-grid/demo10/images/img-1.jpg"></img>
                      </a>
                    </div>
                    <div className="product-content">
                      <h3 className="title"><p>{product.name}</p></h3>
                      <div className="price">{window.web3.fromWei(product.price.toString(), 'Ether')} Eth
                      </div>
                      <p>{product.name}</p>
                      <p>{product.owner}</p>
                      <p>{product.description}</p>
                      <p>{product.sellingDate}</p>
                    </div>
                    <ul className="social">
                      <li><a href="" data-tip="consulter"><i className="fa fa-search"></i></a></li>
                      
                      <li>
                        { !product.purchased
                        ? <button name={product.id}
                          value={product.price}
                          data-tip="acheter"
                          onClick={(event) => {
                            this.props.purchaseRealEstate(event.target.name, event.target.value)
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