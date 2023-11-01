import React, { useState } from 'react'
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CurrencyInput from '../CurrencyInput'
import { toast } from 'react-toastify'
import "../styles/home.css";

function Home() {
  const [transacaoData, setTransacaoData] = useState({
    data: '',
    valor: '',
    tipo: '',
    categoria: '',
    descricao: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setTransacaoData({ ...transacaoData, [name]: value });
      
  };

  const handleLancamento = async (e) => {
    e.preventDefault();

    const valorFloat = parseFloat(transacaoData.valor);

    if((valorFloat)) {
      setTransacaoData({ ...transacaoData, valor: valorFloat });
    }

    console.log(transacaoData);
    console.log(valorFloat);

    try {
      const response = await fetch('http://localhost:5000/transacao', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: 
            JSON.parse(transacaoData)
      });

      if (response.status === 201) {
        toast.success('Transação cadastrada com sucesso!');
      } else {
        const data = await response.json();
        toast.warning(`Ops, tivemos um problema: ${data.error}`);
      }
    } catch (error) {
      console.log('Registration error:', error);
      console.log(transacaoData);
      toast.warning('Falha no sistema!');
    }
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
              name='data'
              value={transacaoData.data}
              onChange={handleInputChange}
              />
              <CurrencyInput 
              placeholder="R$ 0,00" 
              type="text"
              name='valor'
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
                  <label for="debito">Débito</label>
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
                  <label for="credito">Crédito</label>
                </div>
              </div>

              <select
              name='categoria'
              value={transacaoData.categoria}
              onChange={handleInputChange}>
                <option value="" >Categoria</option>
                <option value={"Moradia"}>Moradia</option>
                <option value={"Alimentacao"}>Alimentação</option>
                <option value={"Saude"}>Saúde</option>
                <option value={"Transporte"}>Transporte</option>
                <option value={"Lazer"}>Lazer</option>
              </select>
            </div>

            <div className="painel2">
              <input type="text"
              name='descricao'
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;