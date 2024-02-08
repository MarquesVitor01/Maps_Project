import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './listacliente.css';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
function ListaCliente(props) {
  const [selectedFiles, setSelectedFiles] = useState({});
  const [filesInfo, setFilesInfo] = useState({});
  const [filtroDataVenda, setFiltroDataVenda] = useState("");
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
            <th scope="col" className="col-acao text-center">CNPJ/CPF</th>
            <th scope="col" className="col-acao text-center"><i className="fa-solid fa-signature icon-u"></i></th>
            <th scope="col" className="col-acao text-center"><i className="fa-solid fa-envelope icon-u"></i></th>
            <th scope="col" className="col-acao text-center"><i className="fa-solid fa-earth-americas icon-u"></i></th>
            <th scope="col" className="col-acao text-center"><i className="fa-solid fa-phone icon-u"></i></th>
            <th scope="col" className="col-acao text-center"><i className="fa-solid fa-user icon-u"></i></th>
            <th scope="col" className="col-acao text-center"><i className="fa-solid fa-calendar-days icon-u"></i></th>
            <th scope="col" className="col-acao text-center"><i className="fa-solid fa-circle-info icon-u"></i></th>
            <th scope="col" className="col-acao text-center"><i className="fa-solid fa-clipboard icon-u"></i></th>
          </tr>
        </thead>
        <tbody>
          {props.arrayClientes.filter((cliente) => !filtroDataVenda || cliente.data >= filtroDataVenda).map((cliente) => (
            <tr key={cliente.id} className="table-light">
              <th scope="row" className="align-middle"><Link to={`/app/home/fichacliente/${cliente.id}`} className="fa-solid fa-list icone-acao1 align-middle"></Link>{cliente.cpf}</th>
              <td className="align-middle">{cliente.nome || 'N/A'}</td>
              <td className="align-middle">{cliente.email || 'N/A'}</td>
              <td className="align-middle">{cliente.uf || 'N/A'}</td>
              <td className="align-middle">{cliente.fone || 'N/A'}</td>
              <td className="align-middle">{cliente.operador || 'N/A'}</td>
              <td className="align-middle">{cliente.valor || 'N/A'}</td>
              <td className="align-middle">{cliente.data || 'N/A'}</td>
              <td>
                <Link to={`/app/home/editarcliente/${cliente.id}`}><i className="fa-solid fa-pen-to-square icone-acao"></i></Link>
                <Link to="#" onClick={() => props.clickDelete(cliente.id)}><i className="fa-solid fa-trash icone-acao red"></i></Link>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ListaCliente;