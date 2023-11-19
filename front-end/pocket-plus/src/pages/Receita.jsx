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

  React.useEffect(() => {
    carregarLancamentos();
  }, [receitas.length]);

  const carregarLancamentos = async () => {
    const response = await fetch("http://localhost:5000/receitas/ultimas", {
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

    if (receitaData.valor > 0) {
      try {
        const response = await fetch("http://localhost:5000/receitas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: window.sessionStorage.getItem("token"),
          },
          body: JSON.stringify(receitaData),
        });

        if (response.status === 201) {
          toast.success("Transação cadastrada com sucesso!");
          carregarLancamentos()
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
          <h2>Cadastrar Nova Receita</h2>
          <div className="painel-principal">
            <div className="painel1">
              <input
                type="date"
                name="data"
                value={receitaData.data}
                onChange={handleInputChange}
              />
              <input
                type="number"
                placeholder="R$ 0,00"
                name="valor"
                value={receitaData.valor}
                onChange={(e) => handleInputChange(e)}
                onInput={(e) => {

                  if (e.target.value.length > 6) {
                    e.target.value = e.target.value.slice(0, 6);
                  }
                }}
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
                    id="transferencia"
                    name="tipo"
                    value="Transferencia"
                    checked={receitaData.tipo === "Transferencia"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="transferencia">Transferência</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="deposito"
                    name="tipo"
                    value="Deposito"
                    checked={receitaData.tipo === "Deposito"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="deposito">Depósito</label>
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

export default Receita;
