import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import './listacliente.css';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
function ListaCliente2(props) {
  const [filtroDataVenda, setFiltroDataVenda] = useState(""); // Estado para armazenar a data de filtro
  const [pagoStatus, setPagoStatus] = useState(() => {
    const storedStatus = localStorage.getItem('pagoStatus');
    return storedStatus ? JSON.parse(storedStatus) : {};
  });
  const [paymentDates, setPaymentDates] = useState(() => {
    const storedDates = localStorage.getItem('paymentDates');
    return storedDates ? JSON.parse(storedDates) : {};
  });
  useEffect(() => {
    const fetchPagoStatus = async () => {
      const db = getFirestore();
      for (const cliente of props.arrayClientes) {
        const clienteRef = doc(db, 'clientes', cliente.id);
        const clienteDoc = await getDoc(clienteRef);
        if (clienteDoc.exists()) {
          const data = clienteDoc.data();
          setPagoStatus((prevStatus) => ({
            ...prevStatus,
            [cliente.id]: data.pago || false,
          }));
        }
      }
    };
    fetchPagoStatus();
  }, [props.arrayClientes]);
  const handlePagoChange = async (clienteId, newValue) => {
    const currentDate = new Date().toISOString();
    const newData = newValue
      ? { pago: true, dataPagamento: paymentDates[clienteId] || currentDate }
      : { pago: false, dataPagamento: null };
  
    const { value: selectedDate } = await Swal.fire({
      title: 'Selecione a Data de Pagamento',
      html: '<input type="text" id="datepicker" class="swal2-input">',
      preConfirm: () => {
        const selectedDate = document.getElementById('datepicker').value;
        return selectedDate;
      }
    });
  
    if (selectedDate) {
      newData.dataPagamento = new Date(selectedDate).toISOString();
    }
  
    Swal.fire({
      title: 'Confirmação',
      text: `O valor em aberto ${newValue ? 'está pago' : 'não está pago'}? Clique aqui para ${newValue ? 'marcar' : 'desmarcar'}!`,
      icon: 'question',
      showCancelButton: false,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setPagoStatus((prevStatus) => ({ ...prevStatus, [clienteId]: newValue }));
        setPaymentDates((prevDates) => ({ ...prevDates, [clienteId]: newData.dataPagamento }));
        const db = getFirestore();
        const clienteRef = doc(db, 'clientes', clienteId);
        await updateDoc(clienteRef, newData);
        localStorage.setItem('paymentDates', JSON.stringify({ ...paymentDates, [clienteId]: newData.dataPagamento }));
        console.log(`Status pago para o cliente ID ${clienteId} atualizado para ${newValue}`);
      } else {
        setPagoStatus((prevStatus) => ({ ...prevStatus, [clienteId]: false }));
        setPaymentDates((prevDates) => ({ ...prevDates, [clienteId]: null }));
        localStorage.setItem('paymentDates', JSON.stringify({ ...paymentDates, [clienteId]: null }));
        console.log(`Status pago para o cliente ID ${clienteId} atualizado para ${newValue}`);
      }
    });
  };
  const [selectedFiles, setSelectedFiles] = useState({});
  const [filesInfo, setFilesInfo] = useState({});
  const handleFileSelect = (clientId, event) => {
    const files = event.target.files;
    setSelectedFiles((prevFiles) => ({
      ...prevFiles,
      [clientId]: files,
    }));
  };
  const renderFileIndicator = (clientId) => {
    const fileInfo = filesInfo[clientId];
    if (fileInfo && fileInfo.length > 0) {
      return <span className="text-success">Arquivos Armazenados: {fileInfo.length}</span>;
    } else {
      return <span className="text-muted">Sem Arquivos Armazenados</span>;
    }
  };
  useEffect(() => {
    const storedFilesInfo = localStorage.getItem('filesInfo');
    if (storedFilesInfo) {
      setFilesInfo(JSON.parse(storedFilesInfo));
    }
  }, []);
  const handleArmazenarArquivos = async (clientId) => {
    try {
      const storage = getStorage();
      const files = selectedFiles[clientId];
      if (files && files.length > 0) {
        const storageRef = ref(storage, `arquivos/${clientId}/${files[0].name}`);
        await uploadBytes(storageRef, files[0]);
        const downloadURL = await getDownloadURL(storageRef);
        const newFilesInfo = { ...filesInfo, [clientId]: [{ name: files[0].name, url: downloadURL }] };
        setFilesInfo(newFilesInfo);
        localStorage.setItem('filesInfo', JSON.stringify(newFilesInfo));
        setSelectedFiles({});
      } else {
        console.error('Nenhum arquivo selecionado para upload.');
      }
    } catch (error) {
      console.error('Erro ao armazenar o arquivo:', error);
    }
  };
  const handleClick = (clientId) => {
    handleArmazenarArquivos(clientId);
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
          <th scope="col" className="col-acao text-center" >CNPJ/CPF</th>
          <th scope="col" className="col-acao text-center">Nome</th>
          <th scope="col" className="col-acao text-center">Email</th>
          <th scope="col" className="col-acao text-center">UF</th>
          <th scope="col" className="col-acao text-center">Telefone</th>
          <th scope="col" className="col-acao text-center">Valor</th>
          <th scope="col" className="col-acao text-center">Vencimento</th>
          <th scope="col" className="col-acao text-center">Pago</th>
          <th scope="col" className="col-acao text-center">Data de Pagamento</th>
          <th scope="col" className="col-acao text-center">Cobrança</th>
          <th scope="col" className="col-acao text-center">Comprovante</th>
        </tr>
      </thead>
      <tbody>
        {props.arrayClientes.filter((cliente) => !filtroDataVenda || cliente.venc2 >= filtroDataVenda).map((cliente) => {
          const isPago = pagoStatus[cliente.id] || false;
          const paymentDate = paymentDates[cliente.id] || null;
          if (props.exibirPagos && !isPago) {
            return null;
          }
          return (
            <tr key={cliente.id} className="table-light">
              <th scope="row">
                <Link to={`/app/home/fichacliente/${cliente.id}`} className="fa-solid fa-list icone-acao1"></Link>
                {cliente.cpf}
              </th>
              <td className="align-middle">{cliente.nome}</td>
              <td className="align-middle">{cliente.email}</td>
              <td className="align-middle">{cliente.uf}</td>
              <td className="align-middle">{cliente.fone}</td>
              <td className="align-middle">{cliente.valor}</td>
              <td className="align-middle">{cliente.venc2}</td>
              <td>
                <input
                  type="checkbox"
                  checked={isPago}
                  onChange={(e) => handlePagoChange(cliente.id, e.target.checked)}
                />
              </td>
              <td>
                {isPago ? (
                  <DatePicker
                    selected={paymentDate ? new Date(paymentDate) : null}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                    }}
                    readOnly
                  />
                ) : null}
              </td>
              <td>{cliente.cobrador}</td>
              <td>
              <input
                  type="file"
                  onChange={(e) => handleFileSelect(cliente.id, e)}
                  className="form-control-file"
                />
                {renderFileIndicator(cliente.id)}
                <button
                  onClick={() => handleClick(cliente.id)}
                  className="btn btn-success"
                  type="button"
                >
                  <i className="fa-solid fa-upload"></i> Armazenar Arquivos
                </button>
                </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
}
export default ListaCliente2;