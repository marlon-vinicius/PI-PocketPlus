import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/relatorio.css";
import { toast } from "react-toastify";

function RelatorioReceitas() {
  const [transacoes, setTransacoes] = useState([]);
  const [valor, setValor] = useState(0);

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

  const carregarFiltrados = async () => {
    const response = await fetch("http://localhost:5000/transacao/filtradas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: window.sessionStorage.getItem("token"),
      },
    });

    if (response.status === 200) {
      const retorno = await response.json();
      return setTransacoes(retorno);
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
          <h2>Histórico de Lançamentos de Receitas</h2>

          <div className="pesquisa">
            Filtrar por:
            <br />
            <br />
            <select>
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

export default RelatorioReceitas;
