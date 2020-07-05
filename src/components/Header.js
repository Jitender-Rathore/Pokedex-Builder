import React from "react";
import { Link } from "react-router-dom";


// Component for setting the common header having link to home page 
const Header = () => (
  <nav
    className="header"
    style={{ backgroundColor: "#4d4975", padding: "10px 20px" }}
  >
    <Link to="/">
      <h1 className="title" style={{ display: "inline-block" }}>
        Pokedex
      </h1>
    </Link>
  </nav>
);

export default Header;