import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from './app/Context/auth.jsx';

// Importar páginas
import Site from "./Site/site1";
import Login from "./app/Login/login1.jsx";
import NovaConta from "./app/NovaConta/novaconta1.jsx";
import ResetSenha from "./app/ResetSenha/resetsenha.jsx";
import Home from "./app/Home/home.jsx";
import NovoCliente from "./app/NovoCliente/novocliente.jsx";
import EditarCliente from "./app/EditarCliente/editarcliente.jsx";
import FichaCliente from "./app/fichaCliente/fichacliente.jsx";
import Pagos from "./app/Pagos/pagos.jsx";

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
        {/* <Route path='/app/novaconta' element={<NovaConta />} /> */}
        <Route path='/app/resetsenha' element={<ResetSenha />} />
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path='/app/home' exact />
          <Route element={<NovoCliente />} path='/app/home/novocliente' exact />
          <Route element={<EditarCliente />} path='/app/home/editarcliente/:id' exact />
          <Route element={<FichaCliente />} path='/app/home/fichacliente/:id' exact />
          <Route element={<Pagos/>} path='/app/home/pagos' exact />
        </Route>
      </Routes>
    </BrowserRouter>
  );
  
}


export default App;