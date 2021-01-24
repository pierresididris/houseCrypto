import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Marketplace from './contracts/Marketplace.json'
import { UserProducts, Products } from './Containers'
import { Form, Navbar, NotConnected, Loader, Selector } from './Components'
import { BrowserRouter, Switch, Route } from "react-router-dom"

const map = new Map()
map.set(1, "Residences")
map.set(2, "Maisons")
map.set(3, "Terrains")
map.set(4, "Appartements")
map.set(5, "Autres")

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
        const realEstateCount = await marketplace.methods.realEstateCount().call()
        this.setState({ realEstateCount })
        for (var i = 1; i <= realEstateCount; i++) {
          const availableProduct = await marketplace.methods.realEstates(i).call()
          if (!availableProduct.purchased && availableProduct.owner !== this.state.account) {
            this.setState({
              availableProducts: [...this.state.availableProducts, availableProduct]
            })
          }
        }
        for (var j = 1; j <= realEstateCount; j++) {
          const ownedProduct = await marketplace.methods.realEstates(j).call()
          if (ownedProduct.purchased && ownedProduct.owner === this.state.account) {
            this.setState({
              ownedProducts: [...this.state.ownedProducts, ownedProduct]
            })
          }
        }
        for (var j = 1; j <= realEstateCount; j++) {
          const unsoldProduct = await marketplace.methods.realEstates(j).call()
          if (!unsoldProduct.purchased && unsoldProduct.owner === this.state.account) {
            this.setState({
              unsoldProducts: [...this.state.unsoldProducts, unsoldProduct]
            })
          }
        }
        this.setState({ loading: false })
      } else {
        window.alert('Le smart contract Marketplace n\'est pas déployé sur le reseaux selectionné')
      }
    }
    }else {
      window.alert("Veuillez installer l'extension Metamask")
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      realEstateCount: 0,
      availableProducts: [],
      ownedProducts: [],
      unsoldProducts: [],
      loading: true,
      currentCategory: ""
    }
    this.createRealEstate = this.createRealEstate.bind(this)
    this.purchaseRealEstate = this.purchaseRealEstate.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  createRealEstate(name, price, type, address, area, description, nbRoom, sellingDate) {
    this.setState({ loading: true })
    //appelle la fonction et indique à Web3 que le compte actuel est l'utilisateur qui l'appelle.
    this.state.marketplace.methods.createRealEstate(name, price, type, address, area, description, nbRoom, sellingDate)
    .send({ from: this.state.account }) 
    .once('receipt', () => {
      // pour que l'utilisateur sache que l'appel de la fonction est terminé
      this.setState({ loading: false })
      window.location.reload()
    })
    .on('error', () => {
      window.alert("Vous avez refusé la transaction !")
      window.location.reload()
    })
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
  }

  handleChange(newOption){
    this.setState({currentCategory: newOption.target.value})
  }

  render() {
    return (
      <div>
        {
          this.state.account === undefined ? <>
            <NotConnected/>
          </>
            :
            <>
              {
                this.state.loading ? <>
                  <Loader/>
                </>
                  : <>
                    <BrowserRouter>
                      <Navbar account={this.state.account} />
                      <div className="Main-Section">
                        <Switch>
                          <Route exact path="/">
                            <div className="container">
                            <Selector handleChange={this.handleChange} options={["","Residences",
"Maisons",
"Terrains",
"Appartements",
"Autres"]}/>
                              <h1 class="display-5">Biens à vendre : {this.state.currentCategory}</h1>
                              <div className="row row-cols-4">
                                {this.state.currentCategory !== "" ?                                 
                                <Products array={this.state.availableProducts.filter(
                                    (x)=>
                                    map.get(parseInt(x.realEstateType)) === this.state.currentCategory
                                    )}
                                  purchaseRealEstate={this.purchaseRealEstate} parentProps={this.state} /> :  
                                    <Products array={this.state.availableProducts}
                                  purchaseRealEstate={this.purchaseRealEstate} parentProps={this.state} />}
  
                              </div>
                            </div>
                          </Route>
                          <Route exact path="/add">
                          <div className="container mt-5">
                            <h2>Mettre un bien en vente</h2>
                            <Form createRealEstate={this.createRealEstate} account={this.state.account}/>
                            </div>
                          </Route>
                          <Route exact path="/profile">
                            <div className="container mt-5">
                              <h2>Biens achetés</h2>
                              <div className="row">
                                <main role="main" className="col-lg-12 d-flex">
                                  <UserProducts array={this.state.ownedProducts} createRealEstate={this.createRealEstate} account={this.state.account} marketplace={this.state.marketplace} type={"acheté"} type2={"achetiez quelque chose"}/>
                                </main>
                              </div>
                              <h3>Biens à vendre</h3>
                              <div className="row">
                                <main role="main" className="col-lg-12 d-flex">
                                  <UserProducts array={this.state.unsoldProducts} createRealEstate={this.createRealEstate} account={this.state.account} marketplace={this.state.marketplace} type={"mis en vente"} type2={"mettiez en vente"}/>
                                </main>
                              </div>
                            </div>
                          </Route>
                        </Switch>
                      </div>
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
