// import React, {useState} from "react";
// import { Link, Navigate } from 'react-router-dom';
// import './novaconta.css';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// function NovaConta() {

//   const auth = getAuth();
//   const [email, setEmail] = useState('');
//   const [senha, setSenha] = useState('');
//   const [mensagem, setMensagem] = useState('');
//   const [sucesso, setSucesso] = useState('');

//   function CadastrarUsuario(){
//     setMensagem('');

//     if (!email || !senha){
//       setMensagem('Informe todos os campos');
//       return;
//     }

//     createUserWithEmailAndPassword(auth, email, senha)
//     .then(resultado =>{
//       setSucesso('S')
//     }).catch(error =>{
//       setSucesso('N')
//       if(error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
//         setMensagem('A senha deve ter pelo menos 6 caracteres.')
//       } else if(error.message === 'Firebase: Error (auth/invalid-email).'){
//         setMensagem('Email inválido')
//       } else if(error.message === 'Firebase: Error (auth/email-already-in-use).'){
//         setMensagem('O email já está em uso.')
//       } else {
//         setMensagem('Erro ao criar conta'+ error.message)
//       }
//     })
//   }


//   return <div className="d-flex align-items-centes text-center form-container">
//     <form className="form-signin">
//       <img className="mb-4 icon" src="https://pps.whatsapp.net/v/t61.24694-24/393984921_966894648142334_7763156479348690755_n.jpg?ccb=11-4&oh=01_AdT8NQL8xI8Ob_CdyEEN3P4-7xaAkMxTWxz0jLZuOPMKqw&oe=6582DEC2&_nc_sid=e6ed6c&_nc_cat=110" alt="" height="" width="75" />
//       <h1 className="h3 mb-3 fw-normal">Criar Conta</h1>

//       <div className="form-floating">
//         <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="E-mail" />
//       </div>
//       <div className="form-floating formulario">
//         <input onChange={(e) => setSenha(e.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Senha" />
//       </div>

//       <button onClick={CadastrarUsuario} className="btn btn-primary w-100 py-2" type="button">Criar Conta</button>

//       {mensagem.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{mensagem}</div> : null}
//       {sucesso === 'S' ?  <Navigate to='/app/home' /> : null}

//       <div className="login-links mt-5">
//         <Link to="/app" className="mx-3">Já tenho uma conta</Link>
//       </div>
//       <p className="mt-5 mb-3 text-body-secondary">&copy; Desenvolvido por Grupo Maps</p>
//     </form>
//   </div>
// }
// export default NovaConta;