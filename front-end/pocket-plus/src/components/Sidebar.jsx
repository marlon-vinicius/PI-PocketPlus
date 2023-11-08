import { Link } from "react-router-dom";
import "../styles/sidebar.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

function Sidebar({...props}) {
  const nav = useNavigate();
  async function logout(e) {
    e.preventDefault();

    window.sessionStorage.clear();
    nav("/");
    toast.success("Obrigado por utilizar o Pocket+ !")
  }

  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/Receita">Receitas</Link>
          </li>
          <li>
          <Link to="/Despesa">Despesas</Link>
          </li>
          <li>
          <Link to="/Relatorio">Relatório</Link>
          </li>
        </ul>
      </nav>

      <nav>
        <ul>
          <li>
            <p>Ganhos</p>
          </li>
          <li>
            <p>{props.valor}</p>
          </li>
          <li>
            <p>Total</p>
          </li>
          <hr />
          <li>
            <p>
              <button onClick={logout}>Logout</button>
            </p>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
