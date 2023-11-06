import Header from "../components/Header";
import Footer from '../components/Footer'
import React, { useState } from "react";
import "../styles/cadastro.css";
//import CurrencyInput from '../CurrencyInput'
import { BiSolidLock, BiUser } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { MdWorkOutline } from 'react-icons/md'
//import { MdOutlineAttachMoney } from 'react-icons/md'
import { toast } from 'react-toastify'
 
function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    profissao: '',
    email: '',
    senha: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/registrar', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        toast.success('Cadastro realizado com sucesso!');
      } else {
        const data = await response.json();
        toast.warning(`Falha ao cadastrar: ${data.error}`);
      }
    } catch (error) {
      console.log(error);
      console.log(formData);
      toast.warning('Falha ao cadastrar, tente novamente mais tarde!');
    }
  }

  return (
    <>

      <Header />
      <h1>Preencha os campos abaixo</h1>
      <form onSubmit={handleSubmit}>
        <div className="formulario">
          <div className="formulario-input">
            <BiUser className="icon" size={30} />
            <input
              type="text"
              name="nome"
              placeholder="Nome:"
              value={formData.nome}
              onChange={handleInputChange}
            />
          </div>
          <br />

          <div className="formulario-input">
            <MdWorkOutline className="icon" size={30} />
            <input
              type="text"
              name="profissao"
              placeholder="Profissão:"
              value={formData.profissao}
              onChange={handleInputChange}
            />
          </div>
          <br />      
          <div className="formulario-input">
            <HiOutlineMail className="icon" size={30} />
            <input
              type="email"
              name="email"
              placeholder="Email:"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <br />

          <div className="formulario-input">
            <BiSolidLock className="icon" size={30} />
            <input
              type="password"
              name="senha"
              placeholder="Senha:"
              value={formData.senha}
              onChange={handleInputChange}
            />
          </div>
          <br />
          <button type="submit">Registrar</button>
        </div>          
      </form>

      <Footer />
    </>
  );
}

export default Cadastro;