import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Home from './pages/Home'
import Relatorio from './pages/Relatorio'
import Error from './pages/Error'

function RoutesApp() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Login /> } />
                <Route path="/cadastro" element={ <Cadastro /> } />
                <Route path="/home" element={ <Home /> } />
                <Route path="/relatorio" element={ <Relatorio /> } />

                <Route path="/*" element={ <Error /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp