import React from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <div className="logo">
            {/* <h1 className="brand-name">
            NASA x <span>React</span>
          </h1> */}
            <img className="nasa-png" src={logo} alt="" />
            <span>x REACT</span>
          </div>
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/Apod"> Astronomy Picture Of The Day</Link>
          </li>
          <li>
            <Link to="/videos">Videos</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
