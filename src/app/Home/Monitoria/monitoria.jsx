import React, { useState, useEffect } from "react";
import Navbar4 from "../../Componentes/Navbar/navbar4";
import ListaClienteMarketing from "../../Listas/listamonitoria";
import './monitoria.css'
import { getAuth } from 'firebase/auth';
import { collection, getFirestore, getDocs, query, where } from 'firebase/firestore';
import 'firebase/firestore';
function Monitoria() {
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState('');
  const [texto, setTexto] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantidadeClientes, setQuantidadeClientes] = useState(0);
  const [showConcluidos, setShowConcluidos] = useState(false);
  const [showNotConcluidos, setShowNotConcluidos] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        let q;
        if (showConcluidos) {
          q = query(collection(db, 'clientes'), where('encaminharCliente', '==', true));
        } else if (showNotConcluidos) {
          q = query(collection(db, 'clientes'), where('encaminharCliente', '==', false));
        } else {
          q = query(collection(db, 'clientes'));
        }
        const querySnapshot = await getDocs(q);
        const listaCli = [];
        querySnapshot.forEach((doc) => {
          // Transformar a busca e os dados do cliente em minúsculas para tornar a pesquisa insensível a maiúsculas e minúsculas
          const lowercaseSearch = busca.toLowerCase();
          const lowercaseNome = doc.data().nome.toLowerCase();
          const lowercaseEmail = doc.data().email.toLowerCase();
          const lowercaseCpf = doc.data().cpf.toLowerCase();
          
          // Verificar se a busca está presente em qualquer parte do nome, email ou CPF
          if (
            lowercaseNome.includes(lowercaseSearch) ||
            lowercaseEmail.includes(lowercaseSearch) ||
            lowercaseCpf.includes(lowercaseSearch)
          ) {
            listaCli.push({
              id: doc.id,
              cpf: doc.data().cpf,
              nome: doc.data().nome,
              email: doc.data().email,
              uf: doc.data().uf,
              fone: doc.data().fone,
              valor: doc.data().valor,
              data: doc.data().data,
              operador: doc.data().operador,
              encaminharCliente: doc.data().encaminharCliente,
              naoEncaminharCliente: doc.data().naoEncaminharCliente,
              qrCode: doc.data().qrCode,
            });
          }
        });
        setClientes(listaCli);
        setQuantidadeClientes(listaCli.length);
        setLoading(false);
        localStorage.setItem('clientes', JSON.stringify(listaCli));
      } catch (error) {
        console.error('Erro ao obter dados:', error);
        setError(error);
      }
    };
    if (user) {
      fetchData();
    }
  }, [busca, showConcluidos, showNotConcluidos, user]);
  useEffect(() => {
    const storedClientes = localStorage.getItem('clientes');

    if (storedClientes) {
      setClientes(JSON.parse(storedClientes));
      setQuantidadeClientes(JSON.parse(storedClientes).length);
      setLoading(false);
    }
  }, []);
  const handleShowConcluidos = () => {
    setShowConcluidos(!showConcluidos);
  };
  const handleShowNotConcluidos = () => {
    setShowNotConcluidos(!showNotConcluidos);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setBusca(texto);
    }
  };
  return (
    <div>
      <Navbar4 />
      <div className="background6">
        <div className="container-fluid titulo">
          <div className="row lista-vendas">
            <h1><b>MONITORIA</b></h1>
            <div className="col-5 pesquisa">
              <div className="input-group mb-3 ">
                <input
                  onChange={(e) => setTexto(e.target.value)}
                  onKeyDown={handleKeyDown}
                  type="text"
                  className="form-control barra"
                  placeholder="Pesquisar por descrição"
                  aria-describedby="button-addon2"
                />
                <div className="botao-pesquisa-container ">
                  <button
                    onClick={() => setBusca(texto)}
                    className="btn  btn-pesquisa"
                    type="button"
                    id="button-addon2"
                  >
                    <b className="text-light"><i className="fa-solid fa-magnifying-glass "></i> Pesquisa</b>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="background01 div-baixo">
          <div className="container-fluid titulo ">
            <div className="row">
              <div className="col-4 buttons">
                <button onClick={handleShowConcluidos} className="btn  btn-new2 btn-danger" type="button" id="button-addon2">
                  {showConcluidos ? 'Todos' : 'Monitoria OK'}
                </button>
                <button onClick={handleShowNotConcluidos} className="btn  btn-new2 btn-warning" type="button" id="button-addon2">
                   {showNotConcluidos ? ' Todos' : ' Analisar'}
                </button>
              </div>
              <div className="row exibicao2">
                <h4 >
                  <i className="fa-solid fa-user "></i><b> CLIENTES: </b>
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="background7">
                <div className="container-fluid titulo">
        <ListaClienteMarketing arrayClientes={clientes} />
        </div>
        </div>
      </div>
    </div >
  );
}
export default Monitoria;