import React, { useState } from "react";
import "../styles/login.css";
import { BiSolidLock, BiUser } from "react-icons/bi";

import Header from "../components/Header";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleTeste() {
    console.log(email);
    console.log(senha);
  }

  return (
    <>
      <Header />
      <h1>Pocket Plus</h1>
      <div className="container">
        <div className="ladoEsquerdo">
          <img src="/logo.png" width={"400px"} alt="logo do projeto" />
        </div>
        <div className="ladoDireito">
          <div className="container-input">
            <BiUser className="icon" size={30} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />

          <div className="container-input">
            <BiSolidLock className="icon" size={30} />
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <br />
          <div className="teste">
            <div className="teste2">
              <input type="checkbox" />
              <p>Lembrar-me</p>
            </div>
            <div className="teste2">
              <a href="index.html">Esqueceu sua senha?</a>
            </div>
          </div>

          <button onClick={handleTeste}>Entrar</button>
        </div>
      </div>
    </>
  );
}

export default Login;
