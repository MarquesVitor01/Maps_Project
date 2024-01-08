import React, { useContext } from 'react';
import { Link } from "react-router-dom"
import '../Navbar/navbar.css'
import { AuthContext } from '../../Context/auth';

function Navbar2() {
    const { setLogado } = useContext(AuthContext);

    function Logout() {
        setLogado(false);
        localStorage.removeItem("logado");
    }

    return <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
            <a className="navbar-brand" href="/app/home">
                <img src="../../../img/mps.jpg" width="85" height="80" alt="" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Alterna navegação">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse  d-lg-flex justify-content-end" id="navbarNavDropdown">
                <ul className="navbar-nav active">
                <li className="nav-item ">
                        <Link to="/app/home" className="nav-link text-primary" aria-current="page"><b>Voltar</b></Link>
                    </li>
                    <li className="nav-item bar"> | </li>
                    <li className="nav-item">
                        <Link to="/app" onClick={Logout} className="nav-link text-danger" aria-current="page"><b>Sair</b></Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

}
export default Navbar2;