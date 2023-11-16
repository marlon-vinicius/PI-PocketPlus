import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/relatorio.css";
import { toast } from "react-toastify";

import { TiDelete } from 'react-icons/ti'
import { BiSolidPencil } from 'react-icons/bi'

function RelatorioReceitas() {
  const [transacoes, setTransacoes] = useState([]);
  const [valor, setValor] = useState(0);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  const carregarTodosLancamentos = async () => {
    const response = await fetch("http://localhost:5000/receitas/todas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: window.sessionStorage.getItem("token"),
      },
    });

    if (response.status === 200) {
      let valorDespesas = 0;

      const retorno = await response.json();

      retorno.map((val) => {
        return setValor(valorDespesas += val.valor);
      });

      
      return setTransacoes(retorno);
    } else {
      const data = await response.json();
      toast.warning(`Ops, tivemos um problema: ${data.error}`);
    }
  };

  const handleSelecionarCategoria = (e) => {
    setCategoriaSelecionada(e.target.value);
  };

  const carregarFiltrados = async () => {
    setTransacoes([]);
    const response = await fetch(
      `http://localhost:5000/receitas/filtradas?categoria=${categoriaSelecionada}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: window.sessionStorage.getItem("token"),
        },
      }
    );

    if (response.status === 200) {
      const retorno = await response.json();
      return setTransacoes(retorno);
    } else {
      const data = await response.json();
      toast.warning(`Ops, tivemos um problema: ${data.error}`);
    }
  };

  function handleEdit() {

  }

  function handleDelete() {
    
  }

  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar valor={valor} />
        <div className="pai">
          <h2>Histórico de Lançamentos de Receitas</h2>

          <div className="pesquisa">
            Filtrar por:
            <br />
            <br />
            <select value ={categoriaSelecionada} onChange={handleSelecionarCategoria}>
              <option value="">Categoria</option>
              <option value="Pagamento">Pagamento</option>
              <option value="Quinzena">Quinzena</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
          <div className="botoes">
            <button onClick={carregarTodosLancamentos}>Carregar Todos</button>
            <button onClick={carregarFiltrados}>Carregar Filtrados</button>
          </div>

          <div className="painel">
            <div>
              <table>
                <tr>
                  <th>Data</th>
                  <th>Categoria</th>
                  <th>Tipo</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Editar</th>
                  <th>Excluir</th>
                </tr>
                {transacoes.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {item.data.substring(8, 10) +
                        "/" +
                        item.data.substring(5, 7) +
                        "/" +
                        item.data.substring(0, 4)}
                    </td>
                    <td>{item.categoria}</td>
                    <td>{item.tipo}</td>
                    <td>{item.descricao}</td>
                    <td>{"R$ " + item.valor}</td>
                                        <td className="icones" onClick={handleEdit}><BiSolidPencil /></td>
                    <td className="icones" onClick={handleDelete}><TiDelete /></td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RelatorioReceitas;
