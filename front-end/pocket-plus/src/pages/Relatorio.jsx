import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/relatorio.css";
import { toast } from "react-toastify";

function Relatorio() {
  const [transacoes, setTransacoes] = useState([]);
  const [valor, setValor] = useState(0);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Moradia");

  const carregarTodosLancamentos = async () => {
    const response = await fetch("http://localhost:5000/transacao/todas", {
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
      `http://localhost:5000/transacao/filtradas?categoria=${categoriaSelecionada}`,
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
      if (retorno === 0) {
        toast.warning(`Nenhum dado correspondente encontrado.`);
      }
      setTransacoes(retorno);
    } else {
      const data = await response.json();
      toast.warning(`Ops, tivemos um problema: ${data.error}`);
    }
  };

  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar valor={valor} />
        <div className="pai">
          <h2>Histórico de Lançamentos</h2>

          <div className="pesquisa">
            Filtrar por:
            <br />
            <br />
            <select value={categoriaSelecionada} onChange={handleSelecionarCategoria}>
              <option value="">Categoria</option>
              <option value="Moradia">Moradia</option>
              <option value="Alimentacao">Alimentação</option>
              <option value="Saude">Saúde</option>
              <option value="Transporte">Transporte</option>
              <option value="Lazer">Lazer</option>
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

export default Relatorio;
