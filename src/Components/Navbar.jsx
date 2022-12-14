import React, { useEffect,useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [ScreenWidth, setScreenWidth] = useState(window.innerWidth)
  useEffect(()=>{
    window.onresize=()=>{          
    setScreenWidth(window.innerWidth)     
    if(ScreenWidth>700)   {
      console.log('helllo')
    }
  }
  },[ScreenWidth])   
  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <div className="logo">
            {/* <h1 className="brand-name">
            NASA x <span>React</span>
          </h1> */}
            <img className="nasa-png" src={logo} alt="" width="100%" height="100%" />
            <span>x REACT</span>
          </div>
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/Apod">{ScreenWidth > 700? 'Astronomy Picture Of The Day' : 'APOD'}</Link>
          </li>
          <li>
            <Link to="/video">Videos</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
