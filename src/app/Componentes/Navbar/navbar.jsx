import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, getDocs, where } from 'firebase/firestore';
import { getStorage, ref, listAll } from 'firebase/storage';
import '../Navbar/navbar.css';
import { AuthContext } from '../../Context/auth';

function Navbar() {
  const [clientes, setClientes] = useState([]);
  const [quantidadeClientes, setQuantidadeClientes] = useState(0);
  const [clientesComArquivosCount, setClientesComArquivosCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { setLogado } = useContext(AuthContext);
  const auth = getAuth();
  const navigate = useNavigate();

  /* eslint-disable no-unused-vars */
  const handleVerificarPagos = async () => {
    try {
      const db = getFirestore();
      const q = query(collection(db, 'clientes'), where('userId', '==', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);

      const listaCli = [];

      querySnapshot.forEach((doc) => {
        listaCli.push({
          id: doc.id,
          cpf: doc.data().cpf,
          nome: doc.data().nome,
          email: doc.data().email,
          uf: doc.data().uf,
          fone: doc.data().fone,
          valor: doc.data().valor,
          data: doc.data().data
        });
      });

      setClientes(listaCli);
      setLoading(false);

      // Allow access to "Verificar Pagos" for all users
      console.log('Usuário autorizado para verificar pagos.');
      navigate('/app/home/pagos');
    } catch (error) {
      console.error('Erro ao obter dados:', error);
    }
  };

  const handleQuantidadeClientesComArquivos = async () => {
    try {
      const storage = getStorage();
      let clientesComArquivosCount = 0;

      for (const cliente of clientes) {
        const clientePath = `arquivos/${cliente.id}`;
        const clienteRef = ref(storage, clientePath);
        const filesList = await listAll(clienteRef);

        if (filesList.items.length > 0) {
          clientesComArquivosCount++;
        }
      }

      setClientesComArquivosCount(clientesComArquivosCount);
    } catch (error) {
      console.error('Erro ao obter a quantidade de clientes com arquivos:', error);
    }
  };

  const Logout = () => {
    setLogado(false);
    localStorage.removeItem("logado");
  };
  
  useEffect(() => {
    const storedClientes = localStorage.getItem('clientes');

    if (storedClientes) {
        setClientes(JSON.parse(storedClientes));
        setQuantidadeClientes(JSON.parse(storedClientes).length);
        setLoading(false);
    }

    handleQuantidadeClientesComArquivos();
}, []);

useEffect(() => {
    handleQuantidadeClientesComArquivos();
}, [clientes]); 


useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('ID do usuário:', user.uid);
        setLogado(true);
      } else {
        console.log('Nenhum usuário autenticado.');
        setLogado(false);
      }
    });

    return () => unsubscribe();
}, [auth, setLogado]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container-fluid">
        <a className="navbar-brand" href="/app/home">
          <img
            src="../../../img/mps.jpg"
            width="85"
            height="80"
            alt=""
          />
        </a>
    <div className="row exibicao">
        <h4 className="qtdClientes">
          <i className="fa-solid fa-user user-icon"></i>Agenciados: {quantidadeClientes}
        </h4>
        <h4 className="qtdClientesAss">
          <i className="fa-solid fa-file user-icon"></i>Assinados: {clientesComArquivosCount}
        </h4>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Alterna navegação"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse  d-lg-flex justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav active">
            <li className="nav-item ">
              <Link to="https://app2.pontomais.com.br/login" className="nav-link text-success" aria-current="page">
                <b><i className="fa-solid fa-clock icon-hora"></i> Ponto Mais</b>
              </Link>
            </li>
            <li className="nav-item bar"> | </li>
            <li className="nav-item ">
              <Link
                onClick={handleVerificarPagos}
                className="nav-link text-primary"
                aria-current="page"
              >
                <b>Verificar Pagos</b>
              </Link>
            </li>
            <li className="nav-item bar"> | </li>
            <li className="nav-item">
              <Link
                to="/app"
                onClick={Logout}
                className="nav-link text-danger"
                aria-current="page"
              >
                <b>Sair</b>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;