import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './listacliente.css';
import * as XLSX from 'xlsx'; // Importando a biblioteca xlsx

function ListaCliente(props) {
  const [filtroDataVenda01, setFiltroDataVenda01] = useState(localStorage.getItem('filtroDataVenda01') || "");
  const [filtroDataVenda02, setFiltroDataVenda02] = useState(localStorage.getItem('filtroDataVenda02') || "");
  const [filtroDataVenda03, setFiltroDataVenda03] = useState(localStorage.getItem('filtroDataVenda03') || "");
  const [filtroModelo, setFiltroModelo] = useState(localStorage.getItem('filtroModelo') || ""); // Novo filtro para "Renovação" ou "Base"
  const [clientesFiltrados, setClientesFiltrados] = useState([]);

  useEffect(() => {
    localStorage.setItem('filtroDataVenda01', filtroDataVenda01);
    localStorage.setItem('filtroDataVenda02', filtroDataVenda02);
    localStorage.setItem('filtroDataVenda03', filtroDataVenda03);
    localStorage.setItem('filtroModelo', filtroModelo);
  }, [filtroDataVenda01, filtroDataVenda02, filtroDataVenda03, filtroModelo]);

  const sortedClientes = React.useMemo(() => {
    return props.arrayClientes.slice().sort((a, b) => new Date(b.data) - new Date(a.data));
  }, [props.arrayClientes]);

  const formattedClientes = React.useMemo(() => {
    return sortedClientes.map(cliente => ({
      ...cliente,
      formattedData01: formatarData(cliente.data),
      formattedData02: formatarData(cliente.venc2)
    }));
  }, [sortedClientes]);

  // Lógica para filtrar clientes baseados no intervalo de datas e no tipo de venda
  const filteredClientes = React.useMemo(() => {
    return formattedClientes.filter(cliente => {
      const clienteData = new Date(cliente.data);
      const clienteVencimento = new Date(cliente.venc2);
      
      const startDate = filtroDataVenda01 ? new Date(filtroDataVenda01) : null;
      const endDate = filtroDataVenda03 ? new Date(filtroDataVenda03) : null;
      const vencimentoDate = filtroDataVenda02 ? new Date(filtroDataVenda02) : null;
  
      const isWithinDateRange = (!startDate || clienteData >= startDate) && (!endDate || clienteData <= endDate);
      const isVencimentoEqual = !vencimentoDate || clienteVencimento.getTime() === vencimentoDate.getTime(); // Verifica igualdade exata
      const isModeloMatch = filtroModelo === "" || cliente.modelo === filtroModelo || filtroModelo === "Todos";
  
      return isWithinDateRange && isVencimentoEqual && isModeloMatch;
    });
  }, [formattedClientes, filtroDataVenda01, filtroDataVenda02, filtroDataVenda03, filtroModelo]);
  
  

  useEffect(() => {
    setClientesFiltrados(filteredClientes); // Atualiza a lista filtrada de clientes
  }, [filteredClientes]);

  function formatarData(data) {
    if (typeof data === 'string' && data.includes('-')) {
      const partes = data.split('-');
      return `${partes[2]}-${partes[1]}-${partes[0]}`;
    } else {
      return 'N/A';
    }
  }

  // Função para gerar e baixar o arquivo Excel apenas com os clientes filtrados
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(clientesFiltrados.map(cliente => ({
      'Nome': cliente.nome,
      'CPF': cliente.cpf,
      'Razão Social': cliente.razao,
      'CNPJ': cliente.cnpj,
      'Data de Nascimento': "",
      'Telefone': cliente.fone,
      'Email': cliente.email,
      'CEP': "",
      'Rua': "",
      'Número': "",
      'Bairro': "",
      'Cidade': "",
      'Complemento': "",
      'Grupo': "",
      'Nota': "",
      "Modelo": cliente.modelo, // Adicionando o campo "Modelo" ao Excel
      "Código do Cliente": cliente.numeroContrato,
      "data": cliente.data
    })));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Clientes Filtrados');

    // Gerar o arquivo Excel e forçar o download
    XLSX.writeFile(wb, `clientes_filtrados_${filtroDataVenda01}_a_${filtroDataVenda03}_${filtroModelo}.xlsx`);
  };

  return (
    <div>
      <div className="row divAss">
        <div className="divDate">
          <p className="text-center">DATA DA VENDA (Início):</p>
          <input
            type="date"
            value={filtroDataVenda01}
            onChange={(e) => setFiltroDataVenda01(e.target.value)}
            className="form-control date date-config"
          />
        </div>
        <div className="divDate">
          <p className="text-center">DATA DA VENDA (Fim):</p>
          <input
            type="date"
            value={filtroDataVenda03}
            onChange={(e) => setFiltroDataVenda03(e.target.value)}
            className="form-control date date-config"
          />
        </div>
        <div className="divDate">
          <p className="text-center">DATA DE VENCIMENTO:</p>
          <input
            type="date"
            value={filtroDataVenda02}
            onChange={(e) => setFiltroDataVenda02(e.target.value)}
            className="form-control date date-config"
          />
        </div>

        <div className="divDate">
          <p className="text-center">TIPO DE VENDA:</p>
          <select
            value={filtroModelo}
            onChange={(e) => setFiltroModelo(e.target.value)}
            className="form-control"
          >
            <option value="">Todos</option>
            <option value="renovacao">Renovação</option>
            <option value="base">Base</option>
          </select>
        </div>
        <div className="download-btn-container">
          <button onClick={exportToExcel} className="btn btn-primary">
            Baixar Planilha Com Filtro
          </button>
        </div>
      </div>

      <table className="table table-hover table-bordered">
        <thead>
          <tr className="table-primari">
            <th scope="col" className="col-acao text-center">CNPJ/CPF</th>
            <th scope="col" className="col-acao text-center">NOME</th>
            <th scope="col" className="col-acao text-center">E-MAIL</th>
            <th scope="col" className="col-acao text-center">UF</th>
            <th scope="col" className="col-acao text-center">OPERADOR</th>
            <th scope="col" className="col-acao text-center">VENDA</th>
            <th scope="col" className="col-acao text-center">VENCIMENTO</th>
            <th scope="col" className="col-acao text-center"><i className="fa-solid fa-clipboard icon-u"></i></th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map((cliente) => (
            <tr key={cliente.id} className="table-light">
              <th scope="row" className="align-middle">
                <Link to={`/app/home/fichacliente/${cliente.id}`} className="fa-solid fa-list icone-acao1 align-middle"></Link>{cliente.cpf || cliente.cnpj}
              </th>
              <td className="align-middle text-center">{cliente.nome || 'N/A'}</td>
              <td className="align-middle text-center">{cliente.email || 'N/A'}</td>
              <td className="align-middle text-center">{cliente.uf || 'N/A'}</td>
              <td className="align-middle text-center">{cliente.operador || 'N/A'}</td>
              <td className="align-middle text-center">{cliente.formattedData01}</td>
              <td className="align-middle text-center">{cliente.formattedData02}</td>
              <td>
                <Link to={`/app/home/editarcliente/${cliente.id}`} className="fa-solid fa-pen-to-square icone-acao"></Link>
                <Link to={`/app/comprovantes/${cliente.id}`}><i className="fa-solid fa-file-invoice icone-acao"></i></Link>
                <Link to="#" onClick={() => props.clickDelete(cliente.id)}><i className="fa-solid fa-trash icone-acao red"></i></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaCliente;
