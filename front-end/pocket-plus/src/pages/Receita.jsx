import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";
import "../styles/despesa.css";

function Receita() {
  const [receitaData, setReceitaData] = useState({
    data: "",
    valor: "",
    tipo: "",
    categoria: "",
    descricao: "",
  });

  const [receitas, setReceitas] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setReceitaData({ ...receitaData, [name]: value });
  };

  const carregarLancamentos = async () => {
    const response = await fetch("http://localhost:5000/transacao/ultimas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: window.sessionStorage.getItem("token"),
      },
    });

    if (response.status === 200) {
      const retorno = await response.json();
      return setReceitas(retorno);
    } else {
      const data = await response.json();
      toast.warning(`Ops, tivemos um problema: ${data.error}`);
    }
  };

  const handleLancamento = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/transacao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: window.sessionStorage.getItem("token"),
        },
        body: JSON.stringify(receitaData),
      });

      if(receitaData.valor < 0) {
        toast.warning("O valor digitado não pode ser negativo!");

        return;
      }

      if (response.status === 201) {
        toast.success("Receita cadastrada com sucesso!");
      } else {
        const data = await response.json();
        toast.warning(`Ops, tivemos um problema: ${data.error}`);
      }
    } catch (error) {
      console.log("Registration error:", error);
      toast.warning("Falha no sistema!");
    }
  };

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
          <br />
          <h2>Novo Lançamento</h2>
          <div className="painel-principal">
            <div className="painel1">
              <input
                type="date"
                name="data"
                value={receitaData.data}
                onChange={handleInputChange}
              />
              <input
                type='number'
                placeholder="R$ 0,00"
                name="valor"
                value={receitaData.valor}
                onChange={handleInputChange}
              />
              <div className="debito-credito">
                <div>
                  <input
                    type="radio"
                    id="pix"
                    name="tipo"
                    value="Pix"
                    checked={receitaData.tipo === "Pix"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="pix">Pix</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="dinheiro"
                    name="tipo"
                    value="Dinheiro"
                    checked={receitaData.tipo === "Dinheiro"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="dinheiro">Dinheiro</label>
                </div>
              </div>

              <select
                name="categoria"
                value={receitaData.categoria}
                onChange={handleInputChange}
              >
                <option value="">Selecione...</option>
                <option value={"Pagamento"}>Pagamento</option>
                <option value={"Quinzena"}>Quinzena</option>
                <option value={"Outros"}>Outros</option>
              </select>
            </div>

            <div className="painel2">
              <input
                type="text"
                name="descricao"
                placeholder="Descrição"
                value={receitaData.descricao}
                onChange={handleInputChange}
              />
              <button onClick={handleLancamento}>Salvar</button>
              
            </div>
          </div>

          <div
            style={{
              width: "25%",
              height: "5px",
              backgroundColor: "black",
              marginTop: "30px",
              marginBottom: "30px",
            }}
          ></div>

          <div className="painel-secundario">
            <h2>Últimos Lançamentos</h2>
            <div>
              <table>
                <tr>
                  <th>Data</th>
                  <th>Categoria</th>
                  <th>Tipo</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                </tr>
                {receitas.map((item) => (
                  <tr>
                    <td>{item.data.substring(8,10) + '/' + item.data.substring(5,7) + '/' + item.data.substring(0,4)}</td>
                    <td>{item.categoria}</td>
                    <td>{item.tipo}</td>
                    <td>{item.descricao}</td>
                    <td>{"R$ " + item.valor}</td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
          <button onClick={carregarLancamentos}>Carregar</button>
        </div>
      </div>
    </>
  );
}

export default Receita;
