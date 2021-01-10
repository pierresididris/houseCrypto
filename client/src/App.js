import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
import Navbar from './Navbar'
import Main from './Main'
import Marketplace from './contracts/Marketplace.json'

class App extends Component {

  componentWillMount() {
    window.ethereum.on('accountsChanged', function () {
      console.log("changement de compte")
    })
    this.loadBlockchainData()

  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    const accounts = await web3.eth.getAccounts()
    console.log(Web3.givenProvider)
    if(accounts.length == 0){
      this.setState({account:undefined})
    } else {
      this.setState({ account: accounts[0] })
      const networkId = await web3.eth.net.getId()
      console.log(networkId);
      const networkData = Marketplace.networks[networkId]

      if (networkData){
        const marketplace = new web3.eth.Contract(Marketplace.abi, networkData.address)
        console.log(marketplace)
        this.setState({ marketplace })
        const productCount = await marketplace.methods.productCount().call()
        this.setState({ productCount })
  
        for (var i = 1; i <= productCount; i++) {
          const product = await marketplace.methods.products(i).call()
          if(!product.purchased && product.owner != accounts){
            this.setState({
              products: [...this.state.products, product]
            })
          }
        }
        this.setState({ loading: false })
      } else {
        window.alert('Marketplace contract not deployed to detected network. ')
      }
    } 
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true,
    }
    this.createRealEstate = this.createRealEstate.bind(this)
    this.purchaseRealEstate = this.purchaseRealEstate.bind(this)
  }

  reload(){
    window.ethereum.on('accountsChanged', function () {
      console.log("changement de compte")
    })
  }

  createRealEstate(name, price, address, area, description, nbRoom, sellingDate) {
    this.setState({ loading: true })
    //appelle la fonction et indique à Web3 que le compte actuel est l'utilisateur qui l'appelle.
    this.state.marketplace.methods.createRealEstate(name, price, address, area, description, nbRoom, sellingDate).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      // pour que l'utilisateur sache que l'appel de la fonction est terminé
      this.setState({ loading: false })
      window.location.reload()
    })
  }

  purchaseRealEstate(id, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.purchaseRealEstate(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      window.location.reload()
    })
  }

  render() {
    return (
      <div>
        {this.state.account===undefined 
        ? <>
        <p>veuillez vous connecter</p>
        </>
        :<>
        <Navbar account={this.state.account} />
        <div className="container mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main 
                  products={this.state.products} 
                  createRealEstate={this.createRealEstate} 
                  purchaseRealEstate={this.purchaseRealEstate} />
              }
            </main>
          </div>
        </div>
      </>}
      </div>
    );
  }
}

export default App;
