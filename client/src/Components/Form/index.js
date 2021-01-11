import React, { functionComponent } from 'react';

const Form = ({name, price, adress, area, description, nbRoom}) => {
    return(
    <form onSubmit={(event) => {
        console.log("clic")
        event.preventDefault()
        const n = name
        //const p = window.web3.toWei(price, 'Ether')
        const p = 0.01
        const ad = adress
        const ar = area
        const desc = description
        const nbR = nbRoom
        var sellingDate = Date.now().toString()
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
