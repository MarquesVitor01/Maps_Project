import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, getDocs, addDoc, where, query } from 'firebase/firestore';
import '../Navbar/navbar.css';
import { AuthContext } from '../../Acesso/Context/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
function Navbar() {
  const [quantidadeClientes, setQuantidadeClientes] = useState(0);
  const [mediaNotas, setMediaNotas] = useState(0);
  const { setLogado } = useContext(AuthContext);
  const auth = getAuth();
  const [isAdmUser, setIsAdmUser] = useState(false);
  const calcularMediaNotas = (clientes) => {
    const totalNotas = clientes.reduce((acc, cliente) => {
      if (cliente.nota) {
        return acc + parseInt(cliente.nota); // Convertemos a nota para número inteiro
      }
      return acc;
    }, 0);
    return clientes.length > 0 ? totalNotas / clientes.length : 0;
  };

  const handleVerificarPagos = async () => {
    try {
      const db = getFirestore();
      const userId = auth.currentUser?.uid;
      const userAllViwer = ((userId === 'JErLzWpMaDhnK7FQCNyWxovFGF92') || (userId === 'Hk5ute6UesQM6R438MyBu6Cc9TF2') || (userId === 'W4OmQKw6gWTnWioUENmEpPjwb4m1') || (userId === "JiQlIYtqE6X4cuhAefF655384L42") || (userId === 'yezea9eucLS9O1Pyl1LDzGXNTkE2') || (userId === 'aWFWUvSEOxYmBBsJiTZR7KLD2X23') || (userId === '3RmT5lBN8bhHt6pdHyOq9oBW6yD3') || (userId === 'fzPJ8yp4OJPAvGcBXP0aVD0TYe62'));
      const userMaster = ((userId === 'JErLzWpMaDhnK7FQCNyWxovFGF92') || (userId === 'Hk5ute6UesQM6R438MyBu6Cc9TF2') || (userId === 'yezea9eucLS9O1Pyl1LDzGXNTkE2') || (userId === '3RmT5lBN8bhHt6pdHyOq9oBW6yD3') || (userId === 'fzPJ8yp4OJPAvGcBXP0aVD0TYe62'));
      if (userMaster) {
        setIsAdmUser(true)
      }
      let q;
      if (userAllViwer) {
        q = collection(db, 'clientes');
      } else {
        q = query(collection(db, 'clientes'), where('userId', '==', userId));
      }
      const querySnapshot = await getDocs(q);
      const clientes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        cpf: doc.data().cpf,
        nome: doc.data().nome,
        email: doc.data().email,
        uf: doc.data().uf,
        fone: doc.data().fone,
        valor: doc.data().valor,
        data: doc.data().data,
        nota: doc.data().nota || '100%', // Definindo '100%' como nota padrão para novos clientes
      }));
      clientes.forEach(async (cliente) => {
        if (!cliente.nota) {
          await addDoc(collection(db, 'clientes'), { id: cliente.id, nota: '100%' });
        }
      });

      // Calculando a média das notas para novos clientes
      const media = calcularMediaNotas(clientes);
      setMediaNotas(media);
      setQuantidadeClientes(clientes.length);
    } catch (error) {
      console.error('Erro ao obter dados:', error);
    }
  };
  const Logout = () => {
    setLogado(false);
    localStorage.removeItem('logado');
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
  }, [auth, setLogado]);
  useEffect(() => {
    // console.log('Média de notas:', mediaNotas);
  }, [mediaNotas]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container-fluid">
        <a className="navbar-brand" href="/app/home">
          <img src="../../../img/mps.jpg" width="85" height="80" alt="" />
        </a>

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
          <ul className="navbar-nav active ">
            <li className="nav-item ">
              <Link to={'https://app2.pontomais.com.br/login'} aria-current="page" className="btn  btn-nav btn-nav-ct0 btn-success" type="button" id="button-addon2">
                <i className="fa-solid fa-check"></i><b> PONTO MAIS</b>
              </Link>
            </li>
            {isAdmUser && (
              <>
                <li className="nav-item ">
                  <Link to={'/app/home/relatoriototal'} aria-current="page" className=" btn   btn-nav btn-nav-ct" type="button" id="button-addon2">
                  <i className="fa-solid fa-table"></i> <b> RELATÓRIO</b>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link to={'/app/monitoriamapsempresas'} aria-current="page" className=" btn   btn-nav btn-nav-ct" type="button" id="button-addon2">
                    <i className="fa-regular fa-clipboard"></i><b> MONITORIA</b>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link to={'/app/marketingmapsempresas'} aria-current="page" className=" btn   btn-nav btn-nav-ct" type="button" id="button-addon2">
                    <i className="fa-regular fa-folder"></i><b> MARKETING</b>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link to={'/app/financeiromapsempresas'} aria-current="page" className="btn  btn-nav btn-nav-ct" type="button" id="button-addon2">
                    <i className="fa-solid fa-dollar-sign"></i><b> FINANCEIRO</b>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link to={'/app/gestaomapsempresas'} aria-current="page" className=" btn   btn-nav btn-nav-ct" type="button" id="button-addon2">
                    <i className="fa-solid fa-lock"></i><b> GESTÃO</b>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link to={'/app/cobrancamapsempresas'} aria-current="page" className="btn  btn-nav btn-nav-ct" type="button" id="button-addon2">
                    <i className="fa-solid fa-comments-dollar"></i><b> COBRANÇA </b>
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link to={'/app'}
                onClick={Logout}
                aria-current="page" className=" btn btn-danger btn-nav" type="button" id="button-addon2"
              >
                <b><i className="fa-solid fa-right-from-bracket"></i> SAIR </b>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;