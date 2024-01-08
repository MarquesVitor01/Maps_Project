import React from "react";
import { Link } from "react-router-dom";
import './listacliente.css'
// import clientes from '../../../Dados/clientes'


function ListaCliente2(props) {

  return <table className="table table-hover table-bordered">
    <thead>
      <tr className="table-info">
        <th scope="col">CNPJ/CPF</th>
        <th scope="col">Nome</th>
        <th scope="col">Email</th>
        <th scope="col">UF</th>
        <th scope="col">Telefone</th>
        <th scope="col">Valor</th>
        <th scope="col">Pago</th>
      </tr>
    </thead>
    <tbody>

      {props.arrayClientes.map((cliente) => {
        return <tr key={cliente.id}>
          <th scope="row"><Link to={`/app/home/fichacliente/${cliente.id}`} className="fa-solid fa-list icone-acao1"></Link>{cliente.cpf}</th>
          <td>{cliente.nome}</td>
          <td>{cliente.email}</td>
          <td>{cliente.uf}</td>
          <td>{cliente.fone}</td>
          <td>{cliente.valor}</td>
          <td className="bg-success">Sim</td>
        </tr>
      })
      }
    </tbody>
  </table>
}

export default ListaCliente2;