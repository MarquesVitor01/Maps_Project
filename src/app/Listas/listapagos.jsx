import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

function ListaCliente2(props) {
  const [filtroDataVenda03, setFiltroDataVenda03] = useState(localStorage.getItem('filtroDataVenda03') || "");
  const [filtroDataVenda02, setFiltroDataVenda02] = useState(localStorage.getItem('filtroDataVenda02') || "");
  const [filtroDataVenda01, setFiltroDataVenda01] = useState(localStorage.getItem('filtroDataVenda01') || "");

  useEffect(() => {
    localStorage.setItem('filtroDataVenda03', filtroDataVenda03);
    localStorage.setItem('filtroDataVenda02', filtroDataVenda02);
    localStorage.setItem('filtroDataVenda01', filtroDataVenda01);

  }, [filtroDataVenda01, filtroDataVenda03, filtroDataVenda02]);
  useEffect(() => {
    // Carrega o filtro de data salvo no localStorage ao montar o componente
    setFiltroDataVenda03(localStorage.getItem('filtroDataVenda03') || "");
    setFiltroDataVenda02(localStorage.getItem('filtroDataVenda02') || "");
    setFiltroDataVenda01(localStorage.getItem('filtroDataVenda01') || "");

  }, []);

  const sortedClientes = React.useMemo(() => {
    return props.arrayClientes.slice().sort((a, b) => new Date(b.data) - new Date(a.data));
  }, [props.arrayClientes]);

  const formattedClientes = React.useMemo(() => {
    return sortedClientes.map(cliente => {
      return {
        ...cliente,
        formattedData03: formatarData(cliente.dataPagamento),
        formattedData02: formatarData(cliente.venc2),
        formattedData01: formatarData(cliente.data)
      };
    });
  }, [sortedClientes]);

  function formatarData(data) {
    if (typeof data === 'string' && data.includes('-')) {
      const partes = data.split('-');
      return `${partes[2]}-${partes[1]}-${partes[0]}`;
    } else {
      return 'N/A';
    }
  }
  return (
    <div>
      <div className="row divAss">
        <div className="divDate">
          <p>DATA DA VENDA:</p>
          <input
            type="date"
            value={filtroDataVenda01}
            onChange={(e) => setFiltroDataVenda01(e.target.value)}
            className="form-control date date-config"
          />
        </div>
        <div className="divDate">
          <p>DATA DE VENCIMENTO:</p>
          <input
            type="date"
            value={filtroDataVenda02}
            onChange={(e) => setFiltroDataVenda02(e.target.value)}
            className="form-control date date-config"
          />
        </div>
        <div className="divDate">
          <p>DATA DE PAGAMENTO:</p>
          <input
            type="date"
            value={filtroDataVenda03}
            onChange={(e) => setFiltroDataVenda03(e.target.value)}
            className="form-control date date-config"
          />
        </div>
        <div className="txtAss row">
          <div className="divAgenciados">
            <h1>
            </h1>
          </div>
          <div className="divAgenciados">
            <h1>
            </h1>
          </div>
        </div>
      </div>
      <table className="table table-hover table-bordered table-rounded">
        <thead>
          <tr className="table-primari">
            <th scope="col" className="col-acao text-center">CNPJ/CPF</th>
            <th scope="col" className="col-acao text-center">NOME</th>
            <th scope="col" className="col-acao text-center">UF</th>
            <th scope="col" className="col-acao text-center">VALOR</th>
            <th scope="col" className="col-acao text-center">VENCIMENTO</th>
            <th scope="col" className="col-acao text-center">DATA DO PAGAMENTO</th>
            <th scope="col" className="col-acao text-center">PAGAMENTO</th>
            <th scope="col" className="col-acao text-center">PARCELAS</th>
            <th scope="col" className="col-acao text-center">AÇÃO</th>
            <th scope="col" className="col-acao text-center">COBRANÇA</th>
          </tr>
        </thead>
        <tbody>
          {formattedClientes.filter((cliente) => (!filtroDataVenda01 || cliente.data === filtroDataVenda01) && (!filtroDataVenda02 || cliente.venc2 === filtroDataVenda02) && (!filtroDataVenda03 || cliente.dataPagamento === filtroDataVenda03)).map((cliente) => {
            return (
              <tr key={cliente.id} className="table-light text-center">
                <th scope="row" >
                  <Link to={`/app/home/fichacliente/${cliente.id}`} className="fa-solid fa-list icone-acao1"></Link>
                  {cliente.cpf}
                </th>
                <td className="align-middle text-center">{cliente.nome || 'N/A'} </td>
                <td className="align-middle text-center">{cliente.uf || 'N/A'}</td>
                <td className="align-middle text-center">{cliente.valor || 'N/A'}</td>
                <td className="align-middle text-center">{cliente.formattedData02}</td>
                <td className="align-middle text-center">{cliente.formattedData03}</td>
                <td className="align-middle text-center">{cliente.simPago ? 'Sim' : 'Não'}</td>
                <td className="align-middle text-center">{cliente.parcelas}</td>
                <td className="align-middle text-center"><Link to={`/app/fichapagamento/${cliente.id}`} className="btn btn-primary btn-cliG2" type="button" id="button-addon2"><i className="fa-solid fa-bars light"></i></Link></td>
                <td className="align-middle text-center"><Link to={`/app/fichafinanceiro/${cliente.id}`}><i className="fa-solid fa-sack-dollar"></i></Link></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default ListaCliente2;