import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";
import "../styles/despesa.css";

function Despesa() {
  const [transacaoData, setTransacaoData] = useState({
    data: "",
    valor: "",
    tipo: "",
    categoria: "",
    descricao: "",
  });

  const [transacoes, setTransacoes] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setTransacaoData({ ...transacaoData, [name]: value });
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
      return setTransacoes(retorno);
    } else {
      const data = await response.json();
      toast.warning(`Ops, tivemos um problema: ${data.error}`);
    }
  };

  const handleLancamento = async (e) => {
    e.preventDefault();
    
    if(transacaoData.valor > 0) {
      try {
        const response = await fetch("http://localhost:5000/transacao", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: window.sessionStorage.getItem("token"),
          },
          body: JSON.stringify(transacaoData),
        });
        
  
        if (response.status === 201) {
          toast.success("Transação cadastrada com sucesso!");
        } else {
          const data = await response.json();
          toast.warning(`Ops, tivemos um problema: ${data.error}`);
        }
      } catch (error) {
        console.log("Registration error:", error);
        toast.warning("Falha no sistema!");
      }
      
    } else {

      toast.warning("O valor digitado não pode ser negativo!");
      
      return;
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
          <h2>Cadastrar Nova Despesa</h2>
          <div className="painel-principal">
            <div className="painel1">
              <input
                type="date"
                name="data"
                value={transacaoData.data}
                onChange={handleInputChange}
              />
              <input
                type='number'
                placeholder="R$ 0,00"
                name="valor"
                value={transacaoData.valor}
                onChange={handleInputChange}
              />
              <div className="debito-credito">
                <div>
                  <input
                    type="radio"
                    id="debito"
                    name="tipo"
                    value="Débito"
                    checked={transacaoData.tipo === "Débito"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="debito">Débito</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="credito"
                    name="tipo"
                    value="Crédito"
                    checked={transacaoData.tipo === "Crédito"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="credito">Crédito</label>
                </div>
              </div>

              <select
                name="categoria"
                value={transacaoData.categoria}
                onChange={handleInputChange}
              >
                <option value="">Selecione...</option>
                <option value={"Moradia"}>Moradia</option>
                <option value={"Alimentacao"}>Alimentação</option>
                <option value={"Saude"}>Saúde</option>
                <option value={"Transporte"}>Transporte</option>
                <option value={"Lazer"}>Lazer</option>
              </select>
            </div>

            <div className="painel2">
              <input
                type="text"
                name="descricao"
                placeholder="Descrição"
                value={transacaoData.descricao}
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
                {transacoes.map((item) => (
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

export default Despesa;
