import Marketplace from './contracts/Marketplace.json'
import Web3 from 'web3'

export function createRealEstate(name, price, address, area, description, nbRoom, sellingDate) {
    this.setState({ loading: true })
    //appelle la fonction et indique à Web3 que le compte actuel est l'utilisateur qui l'appelle.
    this.state.marketplace.methods.createRealEstate(name, price, address, area, description, nbRoom, sellingDate).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      // pour que l'utilisateur sache que l'appel de la fonction est terminé
      this.setState({ loading: false })
      window.location.reload()
    })
  }