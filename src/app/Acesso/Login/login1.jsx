import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import "../Login/login.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../Context/auth.jsx";
import "firebase/auth";
import firebase from "../Config/firebase.js";
function Login() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [sucesso, setSucesso] = useState("");
  const { setLogado } = useContext(AuthContext);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [redirectPath, setRedirectPath] = useState("");
  function LoginUsuario() {
    signInWithEmailAndPassword(auth, email, senha)
      .then(function (firebaseUser) {
        localStorage.setItem("logado", "S");
        setLogado(true);
        setSucesso("S");
        let redirectPath = "/app/paginadeescolhavendasgrupomapsempresas";
        if (
          email === "karoline.alves@grupomapscartaodigital.com.br" ||
          email === "daiany.v@grupomapscartaodigital.com.br" ||
          email === "gabriel.pinheiro@grupomapscartaodigital.com.br" ||
          email === "andressa.anastacia@grupomapscartaodigital.com.br"
        ) {
          redirectPath = "/app/marketingmapsempresas";
        } else if (
          email === "nataniele@grupomapscartaodigital.com.br" ||
          email === "jonathan@grupomapscartaodigital.com.br" ||
          email === "evilly@grupomapscartaodigital.com.br" ||
          email === "matheus@grupomapscartaodigital.com.br" ||
          email === "isabela@grupomapscartaodigital.com.br" ||
          email === "adriana@grupomapscartaodigital.com" ||
          email === "edson@grupomapscartaodigital.com.br"
        ) {
          redirectPath = "/app/cobrancamapsempresas";
        } else if (
          email === "grazielli@grupomapscartaodigital.com.br" ||
          email === "gabriela.cristina@grupomapscartaodigital.com.br" ||
          email === "robert.b@grupomapscartaodigital.com.br"
        ) {
          redirectPath = "/app/monitoriamapsempresas";
        } else if (
          email === "felipe@grupomapscartaodigital.com.br" ||
          email === "fabiane@grupomapscartaodigital.com.br" ||
          email === "robson.silva@grupomapscartaodigital.com.br" ||
          email === "talita@grupomapscartaodigital.com.br" ||
          email === "alef.thadeu@grupomapscartaodigital.com.br"
        ) {
          redirectPath = "/app/paginadeescolhagrupomapsempresas";
        }

        setRedirectToHome(true);
        setRedirectPath(redirectPath);
      })
      .catch(function (error) {
        localStorage.setItem("logado", "N");
        setLogado(false);
        setSucesso("N");
      });
  }
  function alterarEmail(event) {
    setEmail(event.target.value);
  }
  function alterarSenha(event) {
    setSenha(event.target.value);
  }
  function handleSubmit(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      LoginUsuario();
    }
  }
  return (
    <div className="d-flex align-items-centes text-center form-container">
      <form className="form-signin formulari">
        <img
          className="mb-4 icon"
          src="../../../img/mps.jpg"
          alt=""
          height=""
          width="90"
        />
        <h1 className="h3 mb-3 fw-normal">Login</h1>
        <div className="form-floating">
          <input
            onChange={alterarEmail}
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="E-mail"
          />
        </div>
        <div className="form-floating formulario1 ">
          <input
            onChange={alterarSenha}
            onKeyPress={handleSubmit}
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Senha"
          />
        </div>
        <div className="form-check text-start my-3">
          <input
            className="form-check-input"
            type="checkbox"
            value="remember-me"
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Lembrar
          </label>
        </div>
        <button
          onClick={LoginUsuario}
          className="btn btn-primary w-100 py-2"
          type="button"
        >
          Acessar
        </button>
        {sucesso === "N" ? (
          <div className="alert alert-danger mt-2" role="alert">
            Email ou senha inválida
          </div>
        ) : null}
        {sucesso === "S"
          ? redirectToHome && <Navigate to={redirectPath} />
          : null}
        <div className="login-links mt-5">
          <Link to="/app/resetsenha" className="mx-3 text-light">
            Esqueci minha senha
          </Link>
          {/* <Link to="/app/novaconta" className="mx-3">Criar conta</Link> */}
        </div>
        <p className="mt-5 mb-3 text-body-secondary">
          &copy; Desenvolvido por Grupo Maps
        </p>
      </form>
    </div>
  );
}
export default Login;
