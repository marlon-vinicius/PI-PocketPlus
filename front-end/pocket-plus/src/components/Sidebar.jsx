import { React, useState } from "react";
import { TemaClaro, TemaEscuro } from "./estilos";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

function Sidebar() {
  const nav = useNavigate();
  async function logout(e) {
    e.preventDefault();

    window.sessionStorage.clear();
    nav("/");
    toast.success("Obrigado por utilizar o Pocket+ !")
  }

  const [temaAtual, setTemaAtual] = useState("claro");

  const alternarTema = () => {
    setTemaAtual((temaAtual) => (temaAtual === "claro" ? "escuro" : "claro"));
  };

  return (
    <>
    {temaAtual === "claro" ? <TemaClaro /> : <TemaEscuro />}
    <div className="sidebar">
      <nav>
        <ul>
        <li>
            <Link to="/Dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/Receita">Receitas</Link>
          </li>
          <li>
            <Link to="/Despesa">Despesas</Link>
          </li>
          <li>
            <Link to="/RelatorioReceitas">Relatório Receitas</Link>
          </li>
          <li>
            <Link to="/RelatorioDespesas">Relatório Despesas</Link>
          </li>
        </ul>
      </nav>

      <nav>
        
            <p>
            <button onClick={alternarTema}>Trocar Tema</button>
            </p>

            <p>
              <button onClick={logout}>Logout</button>
            </p>
      </nav>
    </div>
    </>
  );
}

export default Sidebar;
