import React from 'react';
import Web3 from 'web3';
import {Modal, Button} from 'react-bootstrap';

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
                        Modal heading
        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
            <p>Détail du produit</p>
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
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProductDetails;