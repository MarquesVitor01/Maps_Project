import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from './app/Acesso/Context/auth.jsx';

// Importar páginas
import Login from "./app/Acesso/Login/login1.jsx";
import ResetSenha from "./app/Acesso/ResetSenha/resetsenha.jsx";
import Vendas from "./app/Home/Vendas/vendas.jsx";
import VendasSite from "./app/Home/VendasSite/vendassite.jsx";
import NovoCliente from "./app/Cliente/NovoCliente/novocliente.jsx";
import EditarCliente from "./app/Cliente/EditarCliente/editarcliente.jsx";
import FichaCliente from "./app/Cliente/fichaCliente/fichacliente.jsx";
import Financeiro from "./app/Home/Financeiro/financeiro.jsx";
import Marketing from "./app/Home/Marketing/marketing.jsx";
import Gestao from "./app/Home/Gestão/gestao.jsx";
import FichaCobranca from "./app/Cliente/fichaCobranca/fichaCobranca.jsx";
import FichaGestao from "./app/Cliente/fichaGestao/fichaGestao.jsx";
import Site from "./Site/site1.jsx";
import FichaMonitoria from "./app/Cliente/FichaMonitoria/fichamonitoria.jsx";
import Monitoria from "./app/Home/Monitoria/monitoria.jsx";
import FichaFinanceiro from "./app/Fichas/FichaFinanceiro/fichaFinanceiro.jsx";
import Dashboard from "./app/Componentes/Graficos/graficos.jsx";
import FichaPagamento from "./app/Fichas/FichaPagamento/fichaPagamento.jsx";
import Cobranca from "./app/Home/Cobranca/cobranca.jsx";
import FichaMarketing from "./app/Fichas/FichaMarketing/fichamarketing.jsx";
import Primeira from "./app/Acesso/PrimeiraPagina/primeira.jsx";
import PrimeiraVendas from "./app/Acesso/PrimeiraPagina/primeiravendas.jsx";
import NovoClienteSite from "./app/ClienteSite/NovoClienteSite/novoclientesite.jsx";
import FichaClienteSite from "./app/ClienteSite/fichaClienteSite/fichaclientesite.jsx";
import EditarClienteSite from "./app/ClienteSite/EditarClienteSite/editarclientesite.jsx";
import RelatorioVendas from "./app/Home/Relatorio/relatoriovendas.jsx";
import Relatorio02 from "./app/Home/Relatorio/relatorio02.jsx";
import FichaAlterar from "./app/Fichas/FichaFinanceiro/fichaAlterar.jsx";
import NovoCob from "./app/Cliente/NovoCliente/novocob.jsx";
import Comprovantes from "./app/Cliente/Comprovantes/comprovantes.jsx";

function App() {
  const { logado } = useContext(AuthContext);
console.log(logado)
  const PrivateRoutes = () => {
    return (
      logado ? <Outlet /> : <Navigate to="/app" />
    );
  }
  // console.log(logado)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Site />} />
        <Route path='/app' element={<Login />} />
        <Route path='/app/resetsenha' element={<ResetSenha />} />
        <Route element={<PrivateRoutes />}>
          <Route element={<Primeira />} path='/app/paginadeescolhagrupomapsempresas' exact />
          <Route element={<PrimeiraVendas />} path='/app/paginadeescolhavendasgrupomapsempresas' exact />
          <Route element={<Vendas />} path='/app/home' exact />
          <Route element={<VendasSite />} path='/app/homesite' exact />
          <Route element={<NovoCliente />} path='/app/home/novocliente' exact />
          <Route element={<EditarCliente />} path='/app/home/editarcliente/:id' exact />
          <Route element={<FichaCliente />} path='/app/home/fichacliente/:id' exact />
          <Route element={<Financeiro />} path='/app/financeiromapsempresas' exact />
          <Route element={<Marketing />} path='/app/marketingmapsempresas' exact />
          <Route element={<Cobranca />} path='/app/cobrancamapsempresas' exact />
          <Route element={<Gestao />} path='/app/gestaomapsempresas' exact />
          <Route element={<FichaCobranca />} path='/app/home/fichacobrancamapsempresas/:id' exact />
          <Route element={<FichaGestao />} path='/app/home/fichagestaomapsempresas/:id' exact />
          <Route element={<FichaMonitoria />} path='/app/home/fichaavaliacaovendamapsempresas/:id' exact />
          <Route element={<Monitoria />} path='/app/monitoriamapsempresas' exact />
          <Route element={<FichaFinanceiro />} path='/app/fichafinanceiro/:id' exact />
          <Route element={<Dashboard />} path='/app/financeirodash' exact />
          <Route element={<FichaPagamento />} path='/app/fichapagamento/:id' exact />
          <Route element={<FichaMarketing />} path='/app/fichamarketing/:id' exact />
          <Route element={<NovoClienteSite />} path='/app/home/novosite' exact />
          <Route element={<FichaClienteSite />} path='/app/home/fichaclientesite/:id' exact />
          <Route element={<EditarClienteSite />} path='/app/home/editarclientesite/:id' exact />
          <Route element={<RelatorioVendas />} path='/app/home/relatoriototal' exact />
          <Route element={<Relatorio02 />} path='/app/home/relatorioprincipal' exact />
          <Route element={<FichaAlterar />} path='/app/fichaalterar/:id' exact />
          <Route element={<Comprovantes />} path='/app/comprovantes/:id' exact />

          <Route element={<NovoCob />} path='/app/home/novocob' exact />
        </Route>  
      </Routes>
    </BrowserRouter>
  );

}


export default App;