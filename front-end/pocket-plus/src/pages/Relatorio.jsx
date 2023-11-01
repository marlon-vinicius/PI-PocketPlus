import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/relatorio.css";

function Relatorio() {
  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="pai">
          <h2>Histórico de Lançamentos</h2>

        <div className="select">Filtrar por:
        <br />
        <br />

        <select>
                <option value="">Categoria</option>
                <option value="moradia">Moradia</option>
                <option value="alimentacao">Alimentação</option>
                <option value="saude">Saúde</option>
                <option value="transporte">Transporte</option>
                <option value="lazer">Lazer</option>
              </select>

        </div>

          <div className="painel">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente aut commodi sint dolore veniam doloremque nesciunt voluptatum earum dolorum, ratione magnam quo unde praesentium ea iusto provident et? Molestiae, facere.</p>
          <br />
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente aut commodi sint dolore veniam doloremque nesciunt voluptatum earum dolorum, ratione magnam quo unde praesentium ea iusto provident et? Molestiae, facere.</p>
          <br />
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente aut commodi sint dolore veniam doloremque nesciunt voluptatum earum dolorum, ratione magnam quo unde praesentium ea iusto provident et? Molestiae, facere.</p>
          <br />
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente aut commodi sint dolore veniam doloremque nesciunt voluptatum earum dolorum, ratione magnam quo unde praesentium ea iusto provident et? Molestiae, facere.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Relatorio;