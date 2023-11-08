import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/despesa.css";

function Dashboard() {
  
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
          <h2>O que você deseja fazer hoje?</h2>

          <div className="dashboard">
            <button>Cadastrar Receita</button>
            <button>Cadastrar Despesa</button>
            <button>Consultar Receitas</button>
            <button>Consultar Despesas</button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;
