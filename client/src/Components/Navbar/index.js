import React, { useState } from "react";
import { NavLink } from "react-router-dom"

const Navbar = ({account}) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="row">
          <div className="navbar-brand">
            <a
              role="button"
              className={`navbar-burger burger ${isOpen && "is-active"}`}
              aria-label="menu"
              aria-expanded="false"
              onClick={() => setOpen(!isOpen)}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div className={`navbar-menu ${isOpen && "is-active"}`}>
            <div className="navbar-start">
              <NavLink className="navbar-item" activeClassName="is-active" to="/">
                <p className="navbar-brand col-sm-0 col-md-0 mr-0">
                  Marketplace Immobilière
                </p>
              </NavLink>
              
              <NavLink className="navbar-item" activeClassName="is-active" to="/add">
                <p className="navbar-brand col-sm-1 col-md-1 mr-0">
                  Ajoutez votre bien 
                </p>
              </NavLink>
              
              <NavLink className="navbar-item" activeClassName="is-active"to="/profile">
                  <p className="navbar-brand col-sm-4" id="account">
                    {console.log(account)}
                                  {account}
                </p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;