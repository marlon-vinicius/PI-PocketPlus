import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoutes from "./guard/guard.jsx";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Despesa from "./pages/Despesa";
import Relatorio from "./pages/Relatorio";
import Dashboard from "./pages/Dashboard.jsx";
import Receita from './pages/Receita.jsx'
import Error from "./pages/Error";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/receita" element={<Receita />} />
          <Route path="/despesa" element={<Despesa />} />
          <Route path="/relatorio" element={<Relatorio />} />

        </Route>

          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/*" element={<Error />} />
          
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
