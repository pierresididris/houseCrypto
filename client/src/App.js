import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
// import getWeb3 from './getWeb3'
import Navbar from './Navbar'
// import Marketplace from './contracts/Marketplace.json'


class App extends Component {


  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({ account: accounts[0] })

   
  }

  constructor(props) {
    super(props)
    this.state = { account: '' }
  }
 

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            {/* <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main 
                  products={this.state.products} 
                  createProduct={this.createProduct} 
                  purchaseProduct={this.purchaseProduct} />
              }
            </main> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
