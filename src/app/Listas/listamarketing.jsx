import React, { useState, useEffect } from "react";
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { Link } from "react-router-dom";
import "./listamarketing.css";
import Swal from 'sweetalert2';
function ListaClienteMarketing(props) {
  const [filtroDataVenda, setFiltroDataVenda] = useState("");
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

        // Adicione aqui a lógica de verificação da senha
        const senhaCorreta = '@1V?$9En9o#1qa'; // Substitua com a sua senha real

        if (senhaDigitada === senhaCorreta) {
          // Se a senha estiver correta, proceda com a exclusão
          setAdditionalInfo((prevInfo) => {
            const updatedInfo = { ...prevInfo };
            delete updatedInfo[clienteId];
            return updatedInfo;
          });
          localStorage.setItem('additionalInfo', JSON.stringify({ ...additionalInfo, [clienteId]: null }));
          Swal.fire('Informações excluídas!', '', 'success');
        } else {
          // Senha incorreta
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
  return (
    <div>
      <div className="row divAss">
        <div className="divDate">
        <p className="text-center">DATA DA VENDA:</p>
          <input
            type="date"
            value={filtroDataVenda}
            onChange={(e) => setFiltroDataVenda(e.target.value)}
            className="form-control date date-config"
          />
        </div>
      </div>
      <table className="table table-hover table-bordered">
        <thead>
          <tr className="table-primari text-light">
            <th scope="col" className="col-acao text-center">CNPJ/CPF</th>
            <th scope="col" className="col-acao text-center">ENCAMINHAR</th>
            <th scope="col" className="col-acao text-center">NOME</th>
            <th scope="col" className="col-acao text-center">UF</th>
            <th scope="col" className="col-acao text-center">TELEFONE</th>
            <th scope="col" className="col-acao text-center">VALOR</th>
            <th scope="col" className="col-acao text-center">DATA DA VENDA</th>
            <th scope="col" className="col-acao text-center">INFORMAÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {props.arrayClientes.filter(cliente => cliente.encaminharCliente === true)
            .filter(cliente => !filtroDataVenda || cliente.data >= filtroDataVenda)
            .map((cliente) => (
              <tr key={cliente.id} className="table-light">
                <th scope="row " className="align-middle">
                  <Link
                    to={`/app/home/fichacliente/${cliente.id}`}
                    className="fa-solid fa-list icone-acao1 align-middle"
                  ></Link>
                  {cliente.cpf || "N/A"}
                </th>
                <td className="align-middle text-center">{cliente.encaminharCliente ? 'Sim' : 'Não'}</td>
                <td className="align-middle text-center">{cliente.nome || 'N/A'}</td>
                <td className="align-middle text-center">{cliente.uf || 'N/A'}</td>
                <td className="align-middle text-center">{cliente.fone || 'N/A'}</td>
                <td className="align-middle text-center">{cliente.valor || 'N/A'}</td>
                <td className="align-middle text-center">{cliente.data || 'N/A'}</td>
 
                <td className="align-middle text-center">
                <Link to={`/app/fichamarketing/${cliente.id}`}><i className="fa-solid fa-clipboard icon-u"></i></Link>
<br />
                <button onClick={() => addInfoManually(cliente.id)} className="btn btn-danger btn-cliG" type="button" id="button-addon2">
                    Adicionais
                  </button>
                  {additionalInfo[cliente.id] && (
                    <div>
                      <strong>Informações:</strong> {additionalInfo[cliente.id].info}
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
export default ListaClienteMarketing;