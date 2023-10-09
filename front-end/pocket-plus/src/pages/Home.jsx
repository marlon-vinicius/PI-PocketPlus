import React, { useState } from 'react'
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CurrencyInput from '../CurrencyInput'
import "../styles/home.css";

function Home() {

  const [data, setData] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  function handleLancamento() {
    console.log(data);
    console.log(valor);
    console.log(descricao);
  }

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
              <input type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              />
              <CurrencyInput 
              placeholder="R$ 0,00" 
              type="text"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              /> 
              <div className="debito-credito">
                <div>
                  <input type="radio" id="debito" value="debito" />
                  <label for="debito">Débito</label>
                </div>
                <div>
                  <input type="radio" id="credito" value="credito" />
                  <label for="credito">Crédito</label>
                </div>
              </div>

              <select>
                <option value="">Categoria</option>
                <option value="moradia">Moradia</option>
                <option value="alimentacao">Alimentação</option>
                <option value="saude">Saúde</option>
                <option value="transporte">Transporte</option>
                <option value="lazer">Lazer</option>
              </select>
            </div>

            <div className="painel2">
              <input type="text" 
              placeholder="Descrição" 
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;