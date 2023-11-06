import { Link } from "react-router-dom";
import "../styles/sidebar.css";
import { useNavigate } from "react-router-dom";

function Sidebar({...props}) {
  const nav = useNavigate();
  async function logout(e) {
    e.preventDefault();

    window.sessionStorage.clear();
    nav("/");
  }

  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/Home">Home</Link>
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
