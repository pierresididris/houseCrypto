import React from 'react';
import Web3 from 'web3';
import {Modal, Button} from 'react-bootstrap';

const dateObj = new Date();
const month = dateObj.getUTCMonth() + 1; //months from 1-12
const day = dateObj.getUTCDate();
const year = dateObj.getUTCFullYear();

const currentDate = day + "/" + month + "/" + year 

const ProductDetails = (props) => {
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Détail du bien
        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
            <p>Nom du bien</p>
            <p>{props.product.name}</p>
            <p>Vendu par {props.product.owner}</p>
            <p>{Web3.utils.fromWei(props.product.price.toString(), 'Ether')} Eth</p>
            <span>{props.product.description}</span>
            <b><p>Surface : </p>{props.product.area}</b>
            <b><p>Nombre de piece : </p>{props.product.area}</b>
            <b><p>Adresse : </p>{props.product.realEstateAddress}</b>
            <p>Produit mis en vente depuis le {props.product.sellingDate}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Fermer</Button>
                    {props.resell ? <>  
            <div className="form-group mr-sm-2">
                        <form onSubmit={(event) => {
        event.preventDefault()
        const n = props.product.name
        const p = Web3.utils.toWei(props.product.price, 'Ether')
        const t = props.product.type
        const ad = props.product.realEstateAddress 
        const ar = props.product.area
        const desc = props.product.description
        const nbR = props.product.nbroom
        const sellingDate = currentDate
        props.createRealEstate(n, p, t, ad, ar, desc, nbR, sellingDate, props.account)
      }}>
        {/* <input
            id="productPrice"
            type="number"
            step="0.01"
            className="form-control"
            placeholder={Web3.utils.fromWei(props.product.price.toString(), 'Ether')}
            required /> */}
        {/* <button type="submit" className="btn btn-primary">Remettre en vente</button> */}
                        </form>
        </div>
  </>: <></>}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProductDetails;