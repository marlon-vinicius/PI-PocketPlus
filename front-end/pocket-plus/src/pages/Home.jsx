import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/home.css";

function Home() {
  return (
    <>
      <Header />
      <div className="tela-total">
        <Sidebar />
        <div style={{display: "flex", flexDirection: "column", width: "90%", alignItems: "center", justifyContent: "center"}}>
        <div className="painel-principal">
          <div className="painel1">
            <input type="date" />
            <input type="text" />
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
            <input type="text" placeholder="Descrição" />
            <button>Salvar</button>
          </div>
        </div>

        <div style={{width: "25%", height: "5px", backgroundColor: "black", marginTop: "30px", marginBottom: "30px"}}></div>

        <div className="painel-secundario">
            <h2>Últimos Lançamentos</h2>
            <ul>
                <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. </li>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </li>
                <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </li>
                <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </li>
            </ul>
            </div>
      </div>
      </div>
    </>
  );
}

export default Home;
