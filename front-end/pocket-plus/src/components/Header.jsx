import React from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <div className="header">
        <img src="/logo.png" alt="logo" />

        <div className="menu">
          <Link to="/pages/Login">Login</Link>
          <Link to="/pages/Cadastro">Cadastro</Link>
          <Link to="/pages/Home">Home</Link>
          <Link to="/pages/Relatorio">Relatório</Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
