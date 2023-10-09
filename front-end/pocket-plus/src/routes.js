import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Cadastro from './pages/Login'
import Home from './pages/Home'
import Relatorio from './pages/Relatorio'
import Error from './pages/Error'

function RoutesApp() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/pages/Login" element={ <Login /> } />
                <Route path="/pages/Cadastro" element={ <Cadastro /> } />
                <Route path="/pages/Home" element={ <Home /> } />
                <Route path="/pages/Relatorio" element={ <Relatorio /> } />

                <Route path="/*" element={ <Error /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp