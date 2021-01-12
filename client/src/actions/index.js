import Marketplace from '../contracts/Marketplace.json'
import Web3 from 'web3'

export function createRealEstate(name, price, address, area, description, nbRoom, sellingDate) {
    //appelle la fonction et indique à Web3 que le compte actuel est l'utilisateur qui l'appelle.
    this.state.marketplace.methods.createRealEstate(name, price, address, area, description, nbRoom, sellingDate).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      // pour que l'utilisateur sache que l'appel de la fonction est terminé
      window.location.reload()
    })
}

export function purchaseRealEstate(id, price) {
    this.state.marketplace.methods.purchaseRealEstate(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      window.location.reload()
    })
}

export async function LoadData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    console.log("A")
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    if(accounts.length === 0){
      //this.setState({account:undefined})
    } else {
        console.log(accounts[0])
      //this.setState({ account: accounts[0] })
      const networkId = await web3.eth.net.getId()
      const networkData = Marketplace.networks[networkId]
      if (networkData){
        const marketplace = new web3.eth.Contract(Marketplace.abi, networkData.address)
        console.log(marketplace)
        //this.setState({ marketplace })
        const productCount = await marketplace.methods.productCount().call()
        //this.setState({ productCount })
        var res = []
        for (var i = 1; i <= productCount; i++) {
          const product = await marketplace.methods.products(i).call()
          if(!product.purchased && product.owner !== accounts){
              res.push(product)
            // this.setState({
            //   products: [...this.state.products, product]
            // })
          }
        }
        //this.setState({ loading: false })
        return res
      } else {
        window.alert('Marketplace contract not deployed to detected network. ')
      }
    } 
}