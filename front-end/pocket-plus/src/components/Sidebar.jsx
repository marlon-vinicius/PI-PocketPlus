import '../styles/sidebar.css'

function Sidebar () {

    return(

        <div className="sidebar">
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Inserir</a></li>
                    <li><a href="#">Relatório</a></li>
                </ul>
            </nav>

            <nav>
                <ul>
                    <li><p>Ganhos</p></li>
                    <li><p>Despesas</p></li>
                    <li><p>Total</p></li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar;