import { Link } from 'react-router-dom'

function Error() {
    return(
        <>
            <h2>Ops, parece que essa página não existe!</h2>
            <br />
            <span>Clique no link abaixo para retornar.</span>
            <br />
            <Link to="/pages/Login">Login</Link>
        </>
    )
}

export default Error