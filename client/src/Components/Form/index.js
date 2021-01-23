import React from 'react';
import Web3 from 'web3'

const Form = ({name, price, adress, area, description, nbRoom, createRealEstate, marketplace, account}) => {
    return(
    <form className="create-product-form" onSubmit={(event) => {
        event.preventDefault()
        const n = name.value
        const p = Web3.utils.toWei(price.value, 'Ether')
        const ad = adress.value
        const ar = area.value
        const desc = description.value
        const nbR = nbRoom.value
        var sellingDate = Date.now().toString()
        createRealEstate(n, p, ad, ar, desc, nbR, sellingDate, marketplace, account)
      }}>
        <div className="form-group mr-sm-2">
          <input
            id="productName"
            type="text"
            ref={(input) => { name = input }}
            className="form-control"
            placeholder="Nom du bien"
            required />
        </div>
        <div className="form-group mr-sm-2">
          <input
            id="productPrice"
            type="number"
            step="0.01"
            ref={(input) => { price = input }}
            className="form-control"
            placeholder="Prix du bien"
            required />
        </div>
        <div className="form-group mr-sm-2">
          <input
            id="productAddress"
            type="text"
            ref={(input) => { adress = input }}
            className="form-control"
            placeholder="Adresse du bien"
            required />
        </div>
        <div className="form-group mr-sm-2">
          <input
            id="productArea"
            type="number"
            ref={(input) => { area = input }}
            className="form-control"
            placeholder="surface"
            required />
        </div>
        <div className="form-group mr-sm-2">
          <input
            id="productDescription"
            type="text"
            ref={(input) => { description = input }}
            className="form-control"
            placeholder="description"
            required />
        </div>
        <div className="form-group mr-sm-2">
          <input
            id="productNbRoom"
            type="number"
            ref={(input) => { nbRoom = input }}
            className="form-control"
            placeholder="Nombre de piece"
            required />
        </div>
        <button type="submit" className="btn btn-primary">Ajouter un bien</button>
      </form>
    )
}

export default Form;
