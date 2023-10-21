import { Link } from "react-router-dom";
import "../styles/sidebar.css";


function Sidebar() {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/pages/Home">Home</Link>
          </li>
          <li>
          <Link to="/pages/Relatorio">Relatório</Link>
          </li>
        </ul>
      </nav>

      <nav>
        <ul>
          <li>
            <p>Ganhos</p>
          </li>
          <li>
            <p>Despesas</p>
          </li>
          <li>
            <p>Total</p>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
