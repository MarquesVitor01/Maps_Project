import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Navbar/navbar.css';
import { AuthContext } from '../../Acesso/Context/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';
function Navbar2() {
  const { setLogado } = useContext(AuthContext);
  const [isAdmUser, setIsAdmUser] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const db = getFirestore();
          const userId = user.uid;
          let q;
          const userAllViwer = ((userId === 'JErLzWpMaDhnK7FQCNyWxovFGF92') || (userId === 'Hk5ute6UesQM6R438MyBu6Cc9TF2') || (userId === 'W4OmQKw6gWTnWioUENmEpPjwb4m1') || (userId === 'yezea9eucLS9O1Pyl1LDzGXNTkE2') ||  (userId === '3RmT5lBN8bhHt6pdHyOq9oBW6yD3') || (userId === 'fzPJ8yp4OJPAvGcBXP0aVD0TYe62'));
          if (userAllViwer) {
            setIsAdmUser(true);
          } else {
            setIsAdmUser(false);
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
    return () => unsubscribe();
  }, [auth]);
  function Logout() {
    setLogado(false);
    localStorage.removeItem('logado');
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/app/financeiromapsempresas">
          <img src="../../../img/mps.jpg" width="85" height="80" alt="" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Alterna navegação">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse  d-lg-flex justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav active">
          <li className="nav-item ">
            <Link to={'https://app2.pontomais.com.br/login'} aria-current="page" className="btn  btn-nav btn-nav-ct0 btn-success" type="button" id="button-addon2">
                <i className="fa-solid fa-check"></i><b> PONTO MAIS</b>
              </Link>
            </li>
            {isAdmUser && (
              <>
                <li className="nav-item ">
                  <Link to="/app/home" aria-current="page" className="btn  btn-nav btn-nav-ct" type="button" id="button-addon2">
                  <i className="fa-solid fa-arrow-rotate-left"></i><b> VOLTAR</b>
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link to="/app" onClick={Logout} className="btn btn-danger btn-nav" aria-current="page"><b><i className="fa-solid fa-right-from-bracket"></i> SAIR </b></Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar2;