import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Marketplace from './contracts/Marketplace.json'
import { UserProducts, Products } from './Containers'
import { Form, Navbar } from './Components'
import { BrowserRouter, Switch, Route } from "react-router-dom"


class App extends Component {

  ethEnabled = () => {  
    if (window.ethereum) {   
      window.web3 = new Web3(window.ethereum);    
      window.ethereum.enable();   
      return true;  
    }  
  return false;
}

  componentWillMount() {
    window.ethereum.on('accountsChanged', function () {
      console.log("changement de compte")
      window.location.reload()
    })
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const en = this.ethEnabled()
    if(en){
    window.web3 = new Web3(window.ethereum);    
    window.ethereum.enable(); 
    const accounts = await window.web3.eth.getAccounts()
    if (accounts.length === 0) {
      this.setState({ account: undefined })
    } else {
      this.setState({ account: accounts[0] })
      const networkId = await window.web3.eth.net.getId()
      const networkData = Marketplace.networks[networkId]
      if (networkData) {
        const marketplace = new window.web3.eth.Contract(Marketplace.abi, networkData.address)
        this.setState({ marketplace })
        const productCount = await marketplace.methods.productCount().call()
        this.setState({ productCount })
        for (var i = 1; i <= productCount; i++) {
          const availableProduct = await marketplace.methods.products(i).call()
          if (!availableProduct.purchased && availableProduct.owner !== this.state.account) {
            this.setState({
              availableProducts: [...this.state.availableProducts, availableProduct]
            })
          }
        }
        for (var j = 1; j <= productCount; j++) {
          const ownedProduct = await marketplace.methods.products(j).call()
          if (ownedProduct.purchased && ownedProduct.owner === this.state.account) {
            this.setState({
              ownedProducts: [...this.state.ownedProducts, ownedProduct]
            })
          }
        }
        for (var j = 1; j <= productCount; j++) {
          const unsoldProduct = await marketplace.methods.products(j).call()
          if (!unsoldProduct.purchased && unsoldProduct.owner === this.state.account) {
            this.setState({
              unsoldProducts: [...this.state.unsoldProducts, unsoldProduct]
            })
          }
        }
        this.setState({ loading: false })
      } else {
        window.alert('Marketplace contract not deployed to detected network. ')
      }
    }
    }else {
      window.alert("PAS DE METAMASK, INSTALLEZ SVP")
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      availableProducts: [],
      ownedProducts: [],
      unsoldProducts: [],
      loading: true,
    }
    this.createRealEstate = this.createRealEstate.bind(this)
    this.purchaseRealEstate = this.purchaseRealEstate.bind(this)
  }

  createRealEstate(name, price, address, area, description, nbRoom, sellingDate) {
    this.setState({ loading: true })
    //appelle la fonction et indique à Web3 que le compte actuel est l'utilisateur qui l'appelle.
    this.state.marketplace.methods.createRealEstate(name, price, address, area, description, nbRoom, sellingDate)
    .send({ from: this.state.account }) 
    .once('transactionHash', (hash) => {
      window.web3.eth.getTransactionReceipt(hash).then(() => {

      })
    })
    .once('receipt', function(receipt){ console.log(receipt) })
    .on('confirmation', function(confNumber, receipt){ console.log(confNumber);console.log(receipt) })
    .on('error', () => {
      window.alert("Vous avez refusé la transaction !")
      window.location.reload()
    }).then(function(receipt){
        // will be fired once the receipt is mined
        console.log(receipt)
    });
  }

  purchaseRealEstate(id, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.purchaseRealEstate(id).send({ from: this.state.account, value: price })
      .once('receipt', () => {
        // pour que l'utilisateur sache que l'appel de la fonction est terminé
        this.setState({ loading: false })
        window.location.reload()
      })
      .on('error', () => {
        window.alert("Vous avez refusé la transaction !")
        window.location.reload()
      }
      )
      .on('confirmation', ()=>{
      })
  }

  render() {
    return (
      <div>
        {
          this.state.account === undefined ? <>
            <p>veuillez vous connecter</p>
          </>
            :
            <>
              {
                this.state.loading ? <>
                  <p>LOADING</p>
                </>
                  : <>
                    <BrowserRouter>
                      <Navbar account={this.state.account} />
                      <Switch>
                        <Route exact path="/">
                          <div className="container mt-5">
                            <div className="row">
                              <main role="main" className="col-lg-12 d-flex">
                                <Products array={this.state.availableProducts} purchaseRealEstate={this.purchaseRealEstate} parentProps={this.state} />
                              </main>
                            </div>
                          </div>
                        </Route>
                        <Route exact path="/add">
                        <div className="container mt-5">
                          <Form createRealEstate={this.createRealEstate} account={this.state.account}/>
                          </div>
                        </Route>
                        <Route exact path="/profile">
                          <div className="container mt-5">
                            <div className="row">
                              <main role="main" className="col-lg-12 d-flex">
                                <UserProducts array={this.state.ownedProducts} />
                              </main>
                            </div>
                          </div>
                        </Route>
                      </Switch>
                    </BrowserRouter>
                  </>
              }
            </>
        }
      </div>
    );
  }
}

export default App;
