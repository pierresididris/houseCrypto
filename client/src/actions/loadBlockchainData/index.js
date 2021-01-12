import Marketplace from '../../contracts/Marketplace.json'
import Web3 from 'web3'

expo LoadData = () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    const accounts = await web3.eth.getAccounts()
    console.log(Web3.givenProvider)
    if(accounts.length === 0){
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
          if(!product.purchased && product.owner !== accounts){
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

 export default LoadData; 