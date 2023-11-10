import React, { useState } from "react";
import "../styles/login.css";
import { BiSolidLock, BiUser } from "react-icons/bi";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from '../components/Footer'
import { toast } from 'react-toastify'

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const nav = useNavigate();

  const handleKeyPress = event => {
    if(event.key === 'Enter'){
    }
  };

  async function handleTeste(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email : email,
          senha : senha
        }),
      });

      if (response.status === 200) {
        const retorno = await response.json();
        window.sessionStorage.setItem('nomeUsuario',retorno.nome);
        window.sessionStorage.setItem('codigoUsuario',retorno.usuario);
        window.sessionStorage.setItem('token',retorno.token);
        toast.success('Login concluído com sucesso!');
        nav('/dashboard');
      } else {
        const data = await response.json();
        toast.warning(`Falha ao efetuar o login: ${data.error}`);
      }
    } catch (error) {
      console.log('Registration error:', error);
      toast.warning('Falha no sistema.');
    }
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="ladoEsquerdo">
          <img src="/logo.png" width={"400px"} alt="logo do projeto" />
        </div>
        <div className="ladoDireito">
          <div className="container-input">
            <BiUser className="icon" size={30} />
            <input
              type="email"
              placeholder="E-mail:"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />

          <div className="container-input">
            <BiSolidLock className="icon" size={30} />
            <input
              type="password"
              placeholder="Senha:"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              onKeyDown ={handleKeyPress}
            />
          </div>
          <br />
          <div className="inputs">
            <div className="input">
              <input type="checkbox" />
              <p>Lembrar-me</p>
            </div>
            <div className="teste2">
              <Link to="/Cadastro">Primeiro acesso? Clique aqui</Link>
            </div>
          </div>

          <button onClick={handleTeste}>Entrar</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;