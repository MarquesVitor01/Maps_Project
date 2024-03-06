import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from './app/Acesso/Context/auth.jsx';

// Importar páginas
import Login from "./app/Acesso/Login/login1.jsx";
import ResetSenha from "./app/Acesso/ResetSenha/resetsenha.jsx";
import Vendas from "./app/Home/Vendas/vendas.jsx";
import NovoCliente from "./app/Cliente/NovoCliente/novocliente.jsx";
import EditarCliente from "./app/Cliente/EditarCliente/editarcliente.jsx";
import FichaCliente from "./app/Cliente/fichaCliente/fichacliente.jsx";
import Financeiro from "./app/Home/Financeiro/financeiro.jsx";
import Marketing from "./app/Home/Marketing/marketing.jsx"; 
import Cobranca from "./app/Home/Cobranca/cobranca.jsx";
import FichaCobranca from "./app/Cliente/fichaCobranca/fichaCobranca.jsx";
import Site from "./Site/site1.jsx";
import FichaMonitoria from "./app/Cliente/FichaMonitoria/fichamonitoria.jsx";
import Monitoria from "./app/Home/Monitoria/monitoria.jsx";

function App() {
  const { logado } = useContext(AuthContext);
  console.log(logado);
  const PrivateRoutes = () => {
    return (
      logado ? <Outlet /> : <Navigate to="/app" />
    );
  }
  console.log(logado)
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Site />} />
        <Route path='/app' element={<Login />} />
        <Route path='/app/resetsenha' element={<ResetSenha />} />
        <Route element={<PrivateRoutes />}>
          <Route element={<Vendas />} path='/app/home' exact />
          <Route element={<NovoCliente />} path='/app/home/novocliente' exact />
          <Route element={<EditarCliente />} path='/app/home/editarcliente/:id' exact />
          <Route element={<FichaCliente />} path='/app/home/fichacliente/:id' exact />
          <Route element={<Financeiro/>} path='/app/financeiromapsempresas' exact />
          <Route element={<Marketing/>} path='/app/marketingmapsempresas' exact/>
          <Route element={<Cobranca/>} path='/app/cobrancamapsempresas' exact/>
          <Route element={<FichaCobranca/>} path='/app/home/fichacobrancamapsempresas/:id' exact/>
          <Route element={<FichaMonitoria/>} path='/app/home/fichaavaliacaovendamapsempresas/:id' exact/>
          <Route element={<Monitoria/>} path='/app/monitoriamapsempresas' exact/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
  
}


export default App;