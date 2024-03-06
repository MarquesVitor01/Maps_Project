import React, { useState, useEffect } from "react";
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { Link } from "react-router-dom";
import "./listamonitoria.css";
import Swal from 'sweetalert2';
import { getAuth } from 'firebase/auth';

function ListaMonitoria(props) {
    const auth = getAuth();
    const user = auth.currentUser;
  const [filtroDataVenda, setFiltroDataVenda] = useState(""); // Estado para armazenar a data de filtro

  const [additionalInfo, setAdditionalInfo] = useState(() => {
    const storedInfo = localStorage.getItem('additionalInfo');
    return storedInfo ? JSON.parse(storedInfo) : {};
  });
  const deleteInfo = (clienteId) => {
    Swal.fire({
      title: 'Tem certeza que deseja excluir informações?',
      html: `
            <input type="password" id="senha-exclusao" class="swal2-input" placeholder="Senha de Exclusão">
        `,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        const senhaDigitada = document.getElementById('senha-exclusao').value;
        const senhaCorreta = '@1V?$9En9o#1qa';
        if (senhaDigitada === senhaCorreta) {
          setAdditionalInfo((prevInfo) => {
            const updatedInfo = { ...prevInfo };
            delete updatedInfo[clienteId];
            return updatedInfo;
          });
          localStorage.setItem('additionalInfo', JSON.stringify({ ...additionalInfo, [clienteId]: null }));
          Swal.fire('Informações excluídas!', '', 'success');
        } else {
          Swal.fire('Senha incorreta!', 'Você não tem permissão para excluir informações.', 'error');
        }
      }
    });
  };
  const addInfoManually = async (clienteId) => {
    const result = await Swal.fire({
      title: 'Adicionar Informações',
      html: `
            <input type="text" id="info-input" class="swal2-input" placeholder="Informações">
            <input type="text" id="name-input" class="swal2-input" placeholder="Seu Nome">
        `,
      showCancelButton: true,
      confirmButtonText: 'Adicionar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const infoInput = document.getElementById('info-input').value;
        const nameInput = document.getElementById('name-input').value;
        return { info: infoInput, name: nameInput };
      },
    });
    if (result.isConfirmed) {
      const { info, name } = result.value;
      if (!info || !name) {
        Swal.fire({
          icon: 'error',
          title: 'Preencha todas as informações',
          text: 'Você precisa fornecer tanto as informações quanto o seu nome.',
        });
        return;
      }
      setAdditionalInfo((prevInfo) => ({ ...prevInfo, [clienteId]: { info, name } }));
      // Update local storage after adding information
      localStorage.setItem('additionalInfo', JSON.stringify({ ...additionalInfo, [clienteId]: { info, name } }));
    }
  };
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
          <th scope="col">CNPJ/CPF</th>
          <th scope='col'>Encaminhar</th>
          <th scope="col">Nome</th>
          <th scope="col">Email</th>
          <th scope="col">UF</th>
          <th scope="col">Telefone</th>
          <th scope="col">Valor</th>
          <th scope="col">Operador</th>
          <th scope="col">Data</th>
          <th scope="col">Ficha</th>
          <th scope="col">Ligações</th>
        </tr>
      </thead>
      <tbody>
        {props.arrayClientes.filter((cliente) => !filtroDataVenda || cliente.data >= filtroDataVenda).map((cliente) => (
          <tr key={cliente.id} className="table-light">
            <th scope="row " className="align-middle">
              <Link
                to={`/app/home/fichacliente/${cliente.id}`}
                className="fa-solid fa-list icone-acao1 align-middle"
              ></Link>
              {cliente.cpf || "N/A"}
            </th>
            <td className="align-middle">{cliente.encaminharCliente ? 'Sim' : 'Não'}</td>
            <td className="align-middle">{cliente.nome || 'N/A'}</td>
            <td className="align-middle">{cliente.email || 'N/A'}</td>
            <td className="align-middle">{cliente.uf || 'N/A'}</td>
            <td className="align-middle">{cliente.fone || 'N/A'}</td>
            <td className="align-middle">{cliente.valor || 'N/A'}</td>
            <td className="align-middle">{cliente.operador || 'N/A'}</td>
            <td className="align-middle">{formatarData(cliente.data)}</td>
            <td>
            <Link to={`/app/home/fichaavaliacaovendamapsempresas/${cliente.id}`}><i className="fa-solid fa-clipboard icon-u"></i></Link> 
            </td>
            <td>
              <button onClick={() => addInfoManually(cliente.id)}>
                Link da ligação
              </button>
              {additionalInfo[cliente.id] && (
                <div>
                  <strong>Incluir link da ligação:</strong> {additionalInfo[cliente.id].info}
                  <br />
                  <strong>Adicionado por:</strong> {additionalInfo[cliente.id].name}
                  <br />
                  <button onClick={() => deleteInfo(cliente.id)}>
                    Excluir Informações
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}
export default ListaMonitoria;