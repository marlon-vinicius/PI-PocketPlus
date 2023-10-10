import Header from "../components/Header";
import Footer from '../components/Footer'
import React, { useState } from "react";
import "../styles/cadastro.css";
import CurrencyInput from '../CurrencyInput'
import { BiSolidLock, BiUser } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { MdWorkOutline } from 'react-icons/md'
import { MdOutlineAttachMoney } from 'react-icons/md'
 
function Cadastro() {
  const [nome, setNome] = useState("");
  const [profissao, setProfissao] = useState("");
  const [valor, setValor] = useState('')
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleRegister() {
    console.log(nome);
    console.log(profissao);
    console.log(email);
    console.log(senha);
  }

  return (
    <>

      <Header />
      <h1>Preencha os campos abaixo</h1>
      <div className="formulario">
        <div className="formulario-input">
          <BiUser className="icon" size={30} />
          <input
            type="text"
            placeholder="Nome:"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <br />

        <div className="formulario-input">
          <MdWorkOutline className="icon" size={30} />
          <input
            type="text"
            placeholder="Profissão:"
            value={nome}
            onChange={(e) => setProfissao(e.target.value)}
          />
        </div>
        <br />

        <div className="formulario-input">
        <MdOutlineAttachMoney className="icon" size={30} />
        <CurrencyInput 
              placeholder="R$ 0,00" 
              type="text"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              /> 
        </div>
        <br />
      
        <div className="formulario-input">
          <HiOutlineMail className="icon" size={30} />
          <input
            type="email"
            placeholder="Email:"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />

        <div className="formulario-input">
          <BiSolidLock className="icon" size={30} />
          <input
            type="password"
            placeholder="Senha:"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <br />

        <button onClick={handleRegister}>Registrar</button>
      </div>
      <Footer />
    </>
  );
}

export default Cadastro;
