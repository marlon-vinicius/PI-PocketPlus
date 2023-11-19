import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/relatorio.css";
import { toast } from "react-toastify";
import { TiDelete } from "react-icons/ti";
import { BiSolidPencil } from "react-icons/bi";

function RelatorioDespesas() {
  const [transacoes, setTransacoes] = useState([]);
  const [totalGasto, setTotalGasto] = useState(0);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [transacaoEditada, setTransacaoEditada] = useState(null);

  const carregarTodosLancamentos = async () => {
    const response = await fetch("http://localhost:5000/transacao/todas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: window.sessionStorage.getItem("token"),
      },
    });

    if (response.status === 200) {
      const retorno = await response.json();

      const total = retorno.reduce(
        (acc, transacao) => acc + transacao.valor,
        0
      );
      setTotalGasto(total);

      setTransacoes(retorno);

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
    try {
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

      if (response.status === 404) {
        toast.warning(
          "Nenhuma despesa ou receita encontrada para a categoria selecionada."
        );
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Erro na solicitação: ${response.status} - ${response.statusText}`
        );
      }

      const retorno = await response.json();

      if (retorno.length === 0) {
        toast.warning(
          "Nenhuma despesa ou receita encontrada para a categoria selecionada."
        );
        setTotalGasto(0);
        return;
      }

      const total = retorno.reduce(
        (acc, transacao) => acc + transacao.valor,
        0
      );
      setTotalGasto(total);

      setTransacoes(retorno);

      setTransacoes(retorno);
    } catch (error) {
      console.error("Erro ao carregar transações filtradas:", error.message);
      toast.warning("Falha ao carregar transações filtradas.");
    }
  };

  const handleEdit = (transacao) => {
    setTransacaoEditada(transacao);
  };

  const handleUpdate = async (transacao) => {
    try {
      const response = await fetch(
        `http://localhost:5000/transacao/${transacao.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: window.sessionStorage.getItem("token"),
          },
          body: JSON.stringify(transacao),
        }
      );

      if (response.status === 200) {
        toast.success("Transação atualizada com sucesso!");
        carregarTodosLancamentos();
        setTransacaoEditada(null); // Limpa o estado de edição
      } else {
        const data = await response.json();
        toast.error(`Ops, tivemos um problema: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (transacaoClicada) => {
    try {
      const response = await fetch(
        `http://localhost:5000/transacao/${transacaoClicada}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: window.sessionStorage.getItem("token"),
          },
        }
      );

      if (response.status === 204) {
        toast.success("Transação deletada com sucesso!");
        carregarTodosLancamentos();
      } else if (response.status === 404) {
        toast.warning("Transação não encontrada.");
      } else {
        const data = await response.json();
        toast.warning(`Ops, tivemos um problema: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="pai">
          <h2>Histórico de Lançamentos de Despesas</h2>

          <div className="pesquisa">
            Filtrar por:
            <br />
            <br />
            <select
              value={categoriaSelecionada}
              onChange={handleSelecionarCategoria}
            >
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
                    <td>{"R$ " + item.valor.toFixed(2)}</td>
                    <td>
                      {transacaoEditada && transacaoEditada.id === item.id ? (
                        // Formulário de edição
                        <div>
                          <span>Categoria: </span>
                          <input
                            type="text"
                            value={transacaoEditada.categoria}
                            onChange={(e) =>
                              setTransacaoEditada({
                                ...transacaoEditada,
                                categoria: e.target.value,
                              })
                            }
                          />
                          <br />
                          <span>Data: </span>
                          <input
                            type="date"
                            value={transacaoEditada.data}
                            onChange={(e) =>
                              setTransacaoEditada({
                                ...transacaoEditada,
                                data: e.target.value,
                              })
                            }
                          />
                          <br />
                          <span>Valor :</span>
                          <input
                            type="number"
                            value={transacaoEditada.valor}
                            onChange={(e) =>
                              setTransacaoEditada({
                                ...transacaoEditada,
                                valor: e.target.value,
                              })
                            }
                          />
                          <br />
                          <span>Descrição: </span>
                          <input
                            type="text"
                            value={transacaoEditada.descricao}
                            onChange={(e) =>
                              setTransacaoEditada({
                                ...transacaoEditada,
                                descricao: e.target.value,
                              })
                            }
                          />
                          <br />
                          <span>Tipo: </span>
                          <input
                            type="text"
                            value={transacaoEditada.tipo}
                            onChange={(e) =>
                              setTransacaoEditada({
                                ...transacaoEditada,
                                tipo: e.target.value,
                              })
                            }
                          />
                          <br />
                          {/* Adicione mais campos de entrada conforme necessário */}
                          <button
                            onClick={() => handleUpdate(transacaoEditada)}
                          >
                            Salvar
                          </button>
                          <button onClick={() => setTransacaoEditada(null)}>
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <td className="icones" onClick={() => handleEdit(item)}>
                          <BiSolidPencil />
                        </td>
                      )}
                    </td>
                    <td
                      className="icones"
                      onClick={() => handleDelete(item.id)}
                    >
                      <TiDelete />
                    </td>
                  </tr>
                ))}
              </table>
              <div>
                <span>Total Gasto: R$ {totalGasto.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RelatorioDespesas;
