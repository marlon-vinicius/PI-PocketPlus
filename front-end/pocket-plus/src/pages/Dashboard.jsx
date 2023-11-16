import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/despesa.css";
import { Link } from 'react-router-dom'

function Dashboard() {
  const [usuario, setUsuario] = useState("");
  
  useEffect(() => {

    const obterDadosUsuario = async () => {
      try {
        const resposta = await fetch('http://localhost/5000/usuario/id/:id');
        const dados = await resposta.json();
        console.log(dados);
        setUsuario(dados.nome);
      } catch (erro) {
        console.error("Erro ao obter dados do usuário", erro);
      }
    };

    obterDadosUsuario();
  }, []); 

  return (
    <>
      <Header />
      <div className="tela-total">
        <Sidebar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2>Olá {usuario}, o que você deseja fazer hoje?</h2>

          <div className="dashboard">
            <Link to="/receita"> <button> Cadastrar Receitas </button> </Link>
            <Link to="/despesa"> <button> Cadastrar Despesas </button> </Link>
            <Link to="/RelatorioReceitas"> <button> Consultar Receitas </button> </Link>
            <Link to="/RelatorioDespesas"> <button> Consultar Despesas </button> </Link>
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;
