import React from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <div className="header">
        <img src="/logo.png" alt="logo" />

        <div className="menu">
          <Link to="/cadastro">Cadastro</Link>
          <Link to="/home">Home</Link>
          <Link to="/relatorio">Relatório</Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
