import Marketplace from './contracts/Marketplace.json'
import Web3 from 'web3'

export function purchaseRealEstate(id, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.purchaseRealEstate(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      window.location.reload()
    })
  }