import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './listacliente.css';


function ListaCliente(props) {
  const [filtroDataVenda, setFiltroDataVenda] = useState(localStorage.getItem('filtroDataVenda') || "");

  
  useEffect(() => {
    localStorage.setItem('filtroDataVenda', filtroDataVenda);
  }, [filtroDataVenda]);


  const sortedClientes = props.arrayClientes.sort((a, b) => new Date(b.data) - new Date(a.data));

  function formatarData(data) {
    if (typeof data === 'string' && data.includes('-')) {
      const partes = data.split('-');
      console.log(partes); // Adicionando este console.log para depurar
      return `${partes[2]}-${partes[1]}-${partes[0]}`;
    } else {
      console.log('Data inválida:', data); // Adicionando este console.log para depurar
      return 'Data inválida';
    }
  }
  return (
    <div>
      <input
        type="date"
        value={filtroDataVenda}
        onChange={(e) => setFiltroDataVenda(e.target.value)}
        className="form-control date"
      />
      <table className="table table-hover table-bordered">
        <thead>
          <tr className="table-secondary">
            <th scope="col" className="col-acao text-center">CNPJ/CPF</th>
            <th scope="col" className="col-acao text-center">nome</th>
            <th scope="col" className="col-acao text-center">e-mail</th>
            <th scope="col" className="col-acao text-center">UF</th>
            <th scope="col" className="col-acao text-center">telefone</th>
            <th scope="col" className="col-acao text-center">operador</th>
            <th scope="col" className="col-acao text-center">valor</th>
            <th scope="col" className="col-acao text-center">data</th>
            <th scope="col" className="col-acao text-center"><i className="fa-solid fa-clipboard icon-u"></i></th>
          </tr>
        </thead>
        <tbody>
          {sortedClientes.filter((cliente) => !filtroDataVenda || cliente.data === filtroDataVenda).map((cliente) => (
            <tr key={cliente.id} className="table-light">
              <th scope="row" className="align-middle"><Link to={`/app/home/fichacliente/${cliente.id}`} className="fa-solid fa-list icone-acao1 align-middle"></Link>{cliente.cpf}</th>
              <td className="align-middle">{cliente.nome || 'N/A'}</td>
              <td className="align-middle">{cliente.email || 'N/A'}</td>
              <td className="align-middle">{cliente.uf || 'N/A'}</td>
              <td className="align-middle">{cliente.fone || 'N/A'}</td>
              <td className="align-middle">{cliente.operador || 'N/A'}</td>
              <td className="align-middle">{cliente.valor || 'N/A'}</td>
              <td className="align-middle">{formatarData(cliente.data)}</td>
              <td>
                <Link to={`/app/home/editarcliente/${cliente.id}`}><i className="fa-solid fa-pen-to-square icone-acao"></i></Link>
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