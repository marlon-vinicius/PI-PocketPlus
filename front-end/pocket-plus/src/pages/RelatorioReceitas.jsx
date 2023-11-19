import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/relatorio.css";
import { toast } from "react-toastify";

import { TiDelete } from 'react-icons/ti'
import { BiSolidPencil } from 'react-icons/bi'

function RelatorioReceitas() {
  const [transacoes, setTransacoes] = useState([]);
  const [totalRecebido, setTotalRecebido] = useState(0);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [receitaEditada, setReceitaEditada] = useState(null);

  const carregarTodosLancamentos = async () => {
    const response = await fetch("http://localhost:5000/receitas/todas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: window.sessionStorage.getItem("token"),
      },
    });

    if (response.status === 200) {

      const retorno = await response.json();

      const total = retorno.reduce((acc, transacao) => acc + transacao.valor, 0);
  setTotalRecebido(total);

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
        `http://localhost:5000/receitas/filtradas?categoria=${categoriaSelecionada}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: window.sessionStorage.getItem("token"),
          },
        }
      );
  
      if (response.status === 404) {
        toast.warning("Nenhuma despesa ou receita encontrada para a categoria selecionada.");
        return;
      }
  
      if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.status} - ${response.statusText}`);
      }
  
      const retorno = await response.json();

      const total = retorno.reduce((acc, transacao) => acc + transacao.valor, 0);
  setTotalRecebido(total);

  setTransacoes(retorno);

  
      if (retorno.length === 0) {
        toast.warning("Nenhuma despesa ou receita encontrada para a categoria selecionada.");
        setTotalRecebido(0);
        return;
      }
  
      setTransacoes(retorno);
    } catch (error) {
      console.error("Erro ao carregar transações filtradas:", error.message);
      toast.warning("Falha ao carregar transações filtradas.");
    }
  };

  const handleEdit = (receita) => {
    setReceitaEditada(receita);
  };

  const handleUpdate = async (receita) => {
    try {
      const response = await fetch(`http://localhost:5000/receitas/${receita.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: window.sessionStorage.getItem('token'),
        },
        body: JSON.stringify(receita),
      });
  
      if (response.status === 200) {
        toast.success('Receita atualizada com sucesso!');
        carregarTodosLancamentos();
        setReceitaEditada(null); // Limpa o estado de edição
      } else {
        const data = await response.json();
        toast.error(`Ops, tivemos um problema: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (receitaClicada) => {

    try {
      const response = await fetch(
        `http://localhost:5000/receitas/${receitaClicada}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: window.sessionStorage.getItem("token"),
          },
        }
      );
  
      if (response.status === 204) {
        toast.success('Receita deletada com sucesso!');
        carregarTodosLancamentos();
      } else if (response.status === 404) {
        toast.warning('Receita não encontrada.');
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
                    <td>{"R$ " + item.valor.toFixed(2)}</td>
                    <td>
                      {receitaEditada && receitaEditada.id === item.id ? (
                        // Formulário de edição
                        <div>
                          <span>Categoria: </span>
                          <input
                            type="text"
                            value={receitaEditada.categoria}
                            onChange={(e) =>
                              setReceitaEditada({
                                ...receitaEditada,
                                categoria: e.target.value,
                              })
                            }
                          /><br />
                          <span>Data: </span>
                          <input
                            type="date"
                            value={receitaEditada.data}
                            onChange={(e) =>
                              setReceitaEditada({
                                ...receitaEditada,
                                data: e.target.value,
                              })
                            }
                          /><br />
                          <span>Valor :</span>
                          <input
                            type="number"
                            value={receitaEditada.valor}
                            onChange={(e) =>
                              setReceitaEditada({
                                ...receitaEditada,
                                valor: e.target.value,
                              })
                            }
                          /><br />
                          <span>Descrição: </span>
                          <input
                            type="text"
                            value={receitaEditada.descricao}
                            onChange={(e) =>
                              setReceitaEditada({
                                ...receitaEditada,
                                descricao: e.target.value,
                              })
                            }
                          /><br />
                          <span>Tipo: </span>
                          <input
                            type="text"
                            value={receitaEditada.tipo}
                            onChange={(e) =>
                              setReceitaEditada({
                                ...receitaEditada,
                                tipo: e.target.value,
                              })
                            }
                          /><br />
                          <button
                            onClick={() => handleUpdate(receitaEditada)}
                          >
                            Salvar
                          </button>
                          <button onClick={() => setReceitaEditada(null)}>
                            Cancelar
                          </button>
                        </div>
                      ) : (
                    <td className="icones" onClick={() => handleEdit(item)}>
                      <BiSolidPencil />
                    </td>
                        
                      )}
                    </td>

                    <td className="icones" onClick={() => handleDelete(item.id)}><TiDelete /></td>
                  </tr>
                ))}
              </table>
              <div>
                <span>Total Recebido: R$ {totalRecebido.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RelatorioReceitas;
