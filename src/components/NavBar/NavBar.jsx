import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () =>{
  return (
    <>
      <nav>
        <h1><Link to="/">BlogSpot</Link></h1>
        <ul>
          <Link to="/create_blog">Create blog</Link>
        </ul>
      </nav> 
    </>
  );
};

export default NavBar;
