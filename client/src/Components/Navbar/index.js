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
            <div className="navbar-start ">
            <div className="row">
              
              <NavLink className="navbar-item col-sm-3 col-md-3 mr-0" activeClassName="is-active" to="/">
                <p className="navbar-brand ">
                  Marketplace Immobilière
                </p>
              </NavLink>
              
              <NavLink className="navbar-item  col-sm-3 col-md-3 mr-0" activeClassName="is-active" to="/add">
                <p className="navbar-brand">
                  Ajoutez votre bien 
                </p>
              </NavLink>
              
              <NavLink className="navbar-item col-sm-5 col-md-5" activeClassName="is-active"to="/profile">
                  <p className="navbar-brand btn btn-outline-info " id="account">
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