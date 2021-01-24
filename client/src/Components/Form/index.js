import React, {useState} from 'react';
import Web3 from 'web3'

const map = new Map()
map.set("Residence", 1)
map.set("Maison", 2)
map.set("Terrain", 3)
map.set("Appartement", 4)
map.set("Autre", 5)

const dateObj = new Date();
const month = dateObj.getUTCMonth() + 1; //months from 1-12
const day = dateObj.getUTCDate();
const year = dateObj.getUTCFullYear();

const currentDate = day + "/" + month + "/" + year 

const Form = ({name, price, type, adress, area, description, nbRoom, createRealEstate, marketplace, account}) => {
  const [realEstateType, setRealEstateType] = useState(1)
  const onChangeHandler = (event) => {
    setRealEstateType(map.get(event.target.value))
  }
    return(
    <form className="create-product-form" onSubmit={(event) => {
        event.preventDefault()
        const n = name.value
        const p = Web3.utils.toWei(price.value, 'Ether')
        const t = map.get(type.value)
        const ad = adress.value
        const ar = area.value
        const desc = description.value
        const nbR = map.get(type.value) === 3 ? 1 : nbRoom.value
        var sellingDate = currentDate
        createRealEstate(n, p, t, ad, ar, desc, nbR, sellingDate, marketplace, account)
      }}>
        <label for="productName">Nom du bien</label>
        <div className="form-group mr-sm-2">
          <input
            id="productName"
            type="text"
            ref={(input) => { name = input }}
            className="form-control"
            required />
        </div>
        <label for="productPrice">Prix du bien</label>
        <div className="form-group mr-sm-2">
          <input
            id="productPrice"
            type="number"
            step="0.01"
            ref={(input) => { price = input }}
            className="form-control"
            required />
        </div>
        <label for="select">Type de bien</label>
        <div className="form-group mr-sm-2">
            <select onChange={onChangeHandler}className="form-control form-select" aria-label="Default select example" name="Select" id="select" ref={(input) => { type = input }} required>
              <option value="Residence">Residence</option>
              <option value="Maison">Maison</option>
              <option value="Terrain">Terrain</option>
              <option value="Appartement">Appartement</option>
              <option value="Autre">Autre</option>
          </select>
        </div>
        <label for="productAddress">Adresse du bien</label>
        <div className="form-group mr-sm-2">
          <input
            id="productAddress"
            type="text"
            ref={(input) => { adress = input }}
            className="form-control"
            required />
        </div>
        <label for="productArea">Surface</label>
        <div className="form-group mr-sm-2">
          <input
            id="productArea"
            type="number"
            ref={(input) => { area = input }}
            className="form-control"
            required />
        </div>
        <label for="productDescription">Description</label>
        <div className="form-group mr-sm-2">
          <input
            id="productDescription"
            type="text"
            ref={(input) => { description = input }}
            className="form-control"
            required />
        </div>
        {realEstateType=== 3 ? <></> : 
        <>        
        <label for="productNbRoom">Nombre de pieces</label>
       <div className="form-group mr-sm-2">
          <input
            id="productNbRoom"
            type="number"
            ref={(input) => { nbRoom = input }}
            className="form-control"
            defaultValue="1"
            required />
        </div></>}
        <button type="submit" className="btn btn-primary">Ajouter un bien</button>
      </form>
    )
}

export default Form;
