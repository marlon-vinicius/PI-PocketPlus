import React from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header({...props}) {
  const nav = useNavigate();

  return (
    <div>
      <div className="header">
      <Link to="/Dashboard">
        <img src="/logo.png" alt="logo" /></Link>

      </div>
    </div>
  );
}

export default Header;
