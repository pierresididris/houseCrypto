import React from 'react';
import { Navbar } from '../../Components'

const NavbarDisplay = ({account}) => {
    return(
        <>
        <Navbar account={account}/>
        </>
    )
}

export default NavbarDisplay;