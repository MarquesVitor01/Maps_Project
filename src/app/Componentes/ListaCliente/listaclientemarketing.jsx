import React, { useState, useEffect } from "react";
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { Link } from "react-router-dom";
import "./listaclientemarketing.css";
import Swal from 'sweetalert2';

function ListaClienteMarketing(props) {
  const [filtroDataVenda, setFiltroDataVenda] = useState(""); // Estado para armazenar a data de filtro
  const ScriptModal = ({ onClose, clientId, onCheckAll }) => {
    const [checkboxes, setCheckboxes] = useState(() => {
      const savedCheckboxes = localStorage.getItem(
        `savedCheckboxes_${clientId}`
      );
      return savedCheckboxes
        ? JSON.parse(savedCheckboxes)
        : {
          checkbox1: false,
          checkbox2: false,
          checkbox3: false,
          checkbox4: false,
        };
    });
    const handleCheckboxChange = (checkboxName) => {
      setCheckboxes((prevCheckboxes) => {
        const newCheckboxes = {
          ...prevCheckboxes,
          [checkboxName]: !prevCheckboxes[checkboxName],
        };
        localStorage.setItem(
          `savedCheckboxes_${clientId}`,
          JSON.stringify(newCheckboxes)
        );
        return newCheckboxes;
      });
    };
    const updateFirestoreDocument = (clientId, data) => {
      const db = getFirestore();
      const docRef = doc(db, 'clientes', clientId);
      return updateDoc(docRef, data);
    };
    const handleSalvar = () => {
      localStorage.setItem(
        `savedCheckboxes_${clientId}`,
        JSON.stringify(checkboxes)
      );
      const concluido = areAllCheckboxesChecked();
      updateFirestoreDocument(clientId, { concluido });
      onCheckAll(clientId, concluido);
      onClose();
    };
    const areAllCheckboxesChecked = () =>
      Object.values(checkboxes).every(Boolean);
    return (
      <div className="script-modal over">
        <div className="script-modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <br />
          <div>
            <label>
              <input
                type="checkbox"
                checked={checkboxes.checkbox1}
                onChange={() => handleCheckboxChange("checkbox1")}
              />
              Logomarca
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={checkboxes.checkbox2}
                onChange={() => handleCheckboxChange("checkbox2")}
              />
              Cartão Digital
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={checkboxes.checkbox3}
                onChange={() => handleCheckboxChange("checkbox3")}
              />
              Página da Google
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={checkboxes.checkbox4}
                onChange={() => handleCheckboxChange("checkbox4")}
              />
              QrCode
            </label>
          </div>
          <button onClick={handleSalvar}>Salvar</button>
          {areAllCheckboxesChecked() && <div className="checkmark-icon">✓</div>}
        </div>
      </div>
    );
  };
  const [isScriptModalVisible, setScriptModalVisible] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [allCheckboxesChecked, setAllCheckboxesChecked] = useState(() => {
    const savedStates = localStorage.getItem("allCheckboxesChecked");
    return savedStates ? JSON.parse(savedStates) : {};
  });
  const handleMostrarScript = (clientId) => {
    setSelectedClientId(clientId);
    setScriptModalVisible(true);
  };
  const handleFecharScriptModal = () => {
    setSelectedClientId(null);
    setScriptModalVisible(false);
  };
  const handleCheckAll = (clientId, checked) => {
    setAllCheckboxesChecked((prev) => ({ ...prev, [clientId]: checked }));
  };
  useEffect(() => {
    localStorage.setItem("allCheckboxesChecked", JSON.stringify(allCheckboxesChecked));
  }, [allCheckboxesChecked]);
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
          <th scope="col">Nome</th>
          <th scope="col">Email</th>
          <th scope="col">UF</th>
          <th scope="col">Telefone</th>
          <th scope="col">Valor</th>
          <th scope="col">Data de venda</th>
          <th scope="col" className=""></th>
          <th scope="col">Informações do acordo</th>

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
            <td className="align-middle">{cliente.nome || 'N/A'}</td>
            <td className="align-middle">{cliente.email || 'N/A'}</td>
            <td className="align-middle">{cliente.uf || 'N/A'}</td>
            <td className="align-middle">{cliente.fone || 'N/A'}</td>
            <td className="align-middle">{cliente.valor || 'N/A'}</td>
            <td className="align-middle">{cliente.data || 'N/A'}</td>
            <td>
              <button onClick={() => handleMostrarScript(cliente.id)}>
                <i
                  className={`fa-solid ${allCheckboxesChecked[cliente.id]
                    ? "fa-check icone-verde"
                    : "fa-paperclip"
                    }`}
                ></i>
              </button>
            </td>
            <td>
              <button onClick={() => addInfoManually(cliente.id)}>
                Adicionar Informações
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
      {isScriptModalVisible && selectedClientId && (
        <ScriptModal
          onClose={handleFecharScriptModal}
          clientId={selectedClientId}
          onCheckAll={handleCheckAll}
        />
      )}
    </table>
    </div>
  );
}
export default ListaClienteMarketing;