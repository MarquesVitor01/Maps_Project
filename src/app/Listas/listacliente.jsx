import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Link } from "react-router-dom";
import './listacliente.css';
import Swal from 'sweetalert2';

import { getFirestore, collection, getDocs, where, query } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthContext } from '../Acesso/Context/auth';
import QRCode from 'qrcode.react';

function ListaCliente(props) {
  const [filtroDataVenda01, setFiltroDataVenda01] = useState(localStorage.getItem('filtroDataVenda01') || "");
  const [filtroDataVenda02, setFiltroDataVenda02] = useState(localStorage.getItem('filtroDataVenda02') || "");
  const [quantidadeClientes, setQuantidadeClientes] = useState(0);
  const [quantidadePagos, setQuantidadePagos] = useState('');

  useEffect(() => {
    localStorage.setItem('filtroDataVenda01', filtroDataVenda01);
    localStorage.setItem('filtroDataVenda02', filtroDataVenda02);
  }, [filtroDataVenda01, filtroDataVenda02]);
  useEffect(() => {
    // Carrega o filtro de data salvo no localStorage ao montar o componente
    setFiltroDataVenda01(localStorage.getItem('filtroDataVenda01') || "");
    setFiltroDataVenda02(localStorage.getItem('filtroDataVenda02') || "");
  }, []);

  const sortedClientes = React.useMemo(() => {
    return props.arrayClientes.slice().sort((a, b) => new Date(b.data) - new Date(a.data));
  }, [props.arrayClientes]);

  const [exclusiveUser, setExclusiveUser] = useState(false)
  const { setLogado } = useContext(AuthContext);
  const auth = getAuth();
  const [isAdmUser, setIsAdmUser] = useState(false);

  const formattedClientes = React.useMemo(() => {
    return sortedClientes.map(cliente => {
      return {
        ...cliente,
        formattedData01: formatarData(cliente.data),
        formattedData02: formatarData(cliente.venc2)
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

  const handleVerificarPagos = useCallback(async () => {
    try {
      const db = getFirestore();
      const userId = auth.currentUser?.uid;
      if (userId === 'yezea9eucLS9O1Pyl1LDzGXNTkE2') {
        setIsAdmUser(true)
      }
      else if (userId === 'yezea9eucLS9O1Pyl1LDzGXNTkE2') {
        setExclusiveUser(true)
      }
      let q;
      const userAllViwer = ((userId === 'JErLzWpMaDhnK7FQCNyWxovFGF92') || (userId === 'Hk5ute6UesQM6R438MyBu6Cc9TF2') || (userId === 'W4OmQKw6gWTnWioUENmEpPjwb4m1') || (userId === 'JiQlIYtqE6X4cuhAefF655384L42') || (userId === 'yezea9eucLS9O1Pyl1LDzGXNTkE2') || (userId === 'aWFWUvSEOxYmBBsJiTZR7KLD2X23') || (userId === '3RmT5lBN8bhHt6pdHyOq9oBW6yD3') || (userId === 'fzPJ8yp4OJPAvGcBXP0aVD0TYe62'))
      if (userAllViwer) {
        q = query(collection(db, 'clientes'));
      } else {
        q = query(collection(db, 'clientes'), where('userId', '==', userId));
      }
      const querySnapshot = await getDocs(q);
      const listaCli = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        cpf: doc.data().cpf,
        nome: doc.data().nome,
        email: doc.data().email,
        uf: doc.data().uf,
        fone: doc.data().fone,
        operador: doc.data().operador,
        data: doc.data().data,
        razao: doc.data().razao,
        simPago: doc.data().simPago,
        dataPagamento: doc.data().dataPagamento,
        venc2: doc.data().venc2
      }));
      let contadorPagos = 0;
      listaCli.forEach(cliente => {
        if (cliente.simPago) {
          contadorPagos++;
        }
      });

      setQuantidadeClientes(listaCli.length);
      setQuantidadePagos(contadorPagos)
    } catch (error) {
      console.error('Erro ao obter dados:', error);
    }
  }, [auth]);
  const Logout = () => {
    setLogado(false);
    localStorage.removeItem('logado');
  };

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
      localStorage.setItem('additionalInfo', JSON.stringify({ ...additionalInfo, [clienteId]: { info, name } }));
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log('ID do usuário:', user.uid);
        setLogado(true);
        handleVerificarPagos();
      } else {
        console.log('Nenhum usuário autenticado.');
        setLogado(false);
      }
    });
    return () => unsubscribe();
  }, [auth, setLogado, handleVerificarPagos]);
  return (
    <div>
      <div className="row divAss">
        <div className="divDate">
          <p className="text-center">DATA DA VENDA:</p>
          <input
            type="date"
            value={filtroDataVenda01}
            onChange={(e) => setFiltroDataVenda01(e.target.value)}
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
        {/* <div className="txtAss row">
          <div className="divAgenciados">
            <h1>
              <i className="fa-solid fa-user user-icon"></i><b>CLIENTES: {quantidadeClientes}</b>
            </h1>
          </div>  
          <div className="divAgenciados">
            <h1>
              <i className="fa-solid fa-dollar-sign"></i><b>PAGOS: {quantidadePagos}</b>
            </h1>
          </div>  
        </div> */}
      </div>
      <table className="table table-hover table-bordered">
        <thead>
          <tr className="table-primari">
            <th scope="col" className="col-acao text-center">CNPJ/CPF</th>
            <th scope="col" className="col-acao text-center">NOME</th>
            <th scope="col" className="col-acao text-center">E-MAIL</th>
            <th scope="col" className="col-acao text-center">UF</th>
            {/* <th scope="col" className="col-acao text-center">TELEFONE</th> */}
            <th scope="col" className="col-acao text-center">OPERADOR</th>
            {/* <th scope="col" className="col-acao text-center">VALOR</th> */}
            <th scope="col" className="col-acao text-center">VENDA</th>
            <th scope="col" className="col-acao text-center">VENCIMENTO</th>
            <th scope="col" className="col-acao text-center"><i className="fa-solid fa-clipboard icon-u"></i></th>
          </tr>
        </thead>
        <tbody>
          {formattedClientes.filter((cliente) => (!filtroDataVenda01 || cliente.data === filtroDataVenda01) && (!filtroDataVenda02 || cliente.venc2 === filtroDataVenda02)).map((cliente) => {
            const additionalInfoData = additionalInfo[cliente.id] || {};
            return (
              <tr key={cliente.id} className="table-light">
                <th scope="row" className="align-middle"><Link to={`/app/home/fichacliente/${cliente.id}`} className="fa-solid fa-list icone-acao1 align-middle"></Link>{cliente.cpf}</th>
                <td className="align-middle text-center ">{cliente.nome || 'N/A'}</td>
                <td className="align-middle text-center ">{cliente.email || 'N/A'}</td>
                <td className="align-middle text-center ">{cliente.uf || 'N/A'}</td>
                {/* <td className="align-middle text-center ">{cliente.fone || 'N/A'}</td> */}
                <td className="align-middle text-center ">{cliente.operador || 'N/A'}</td>
                {/* <td className="align-middle text-center ">{cliente.valor || 'N/A'}</td> */}
                <td className="align-middle text-center ">{cliente.formattedData01}</td>
                <td className="align-middle text-center ">{cliente.formattedData02}</td>
                <td>
                  <Link to={`/app/home/editarcliente/${cliente.id}`}><i className="fa-solid fa-pen-to-square icone-acao"></i></Link>
                  <Link to={`/app/comprovantes/${cliente.id}`}><i className="fa-solid fa-file-invoice icone-acao"></i></Link>
                  <Link to="#" onClick={() => props.clickDelete(cliente.id)}><i className="fa-solid fa-trash icone-acao red"></i></Link>

                  <div className="qrCodeWrapper">
                    {cliente.qrCode ? <QRCode value={cliente.qrCode} size={20} /> : 'N/A'}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListaCliente;