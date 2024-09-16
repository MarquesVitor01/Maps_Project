import React, { useState, useEffect } from "react";
import Navbar2 from "../../Componentes/Navbar/navbar2";
import ListaCobranca from "../../Listas/listacobranca";
import './cobranca.css';
import { collection, getFirestore, getDocs, query } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
function Cobranca() {
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState('');
  const [texto, setTexto] = useState('');
  const [exibirPagos, setExibirPagos] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;
  const [quantidadeClientes, setQuantidadeClientes] = useState(0);


  useEffect(() => {
    const storedClientes = localStorage.getItem('clientes');
    if (storedClientes) {
      setClientes(JSON.parse(storedClientes));
      setQuantidadeClientes(JSON.parse(storedClientes).length);
      setLoading(false);
    }
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const clientesRef = collection(db, 'clientes');
        let q;
        q = query(collection(db, 'clientes'));
        if (q) {
          const querySnapshot = await getDocs(q);
          const listaCli = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data(); // Obtenha os dados do documento
            if (data) { // Verifique se os dados existem
              const lowercaseBusca = busca.toLowerCase();
              const lowercaseNome = (data.nome || '').toLowerCase(); // Verifique e converta para minúsculas
              const lowercaseEmail = (data.email || '').toLowerCase();
              const lowercaseCPF = (data.cpf || '').toLowerCase();
              const lowercaseRazao = (data.razao || '').toLowerCase();

              if (
                lowercaseNome.indexOf(lowercaseBusca) >= 0 ||
                lowercaseEmail.indexOf(lowercaseBusca) >= 0 ||
                lowercaseCPF.indexOf(lowercaseBusca) >= 0 ||
                lowercaseRazao.indexOf(lowercaseBusca) >= 0
              ) {
                listaCli.push({
                  id: doc.id,
                  cpf: doc.data().cpf,
                  nome: doc.data().nome,
                  email: doc.data().email,
                  uf: doc.data().uf,
                  fone: doc.data().fone,
                  operador: doc.data().operador,
                  valor: doc.data().valor,
                  data: doc.data().data,
                  cobrador: doc.data().cobrador,
                  venc2: doc.data().venc2,
                  dataPagamento: doc.data().dataPagamento,
                  simPago: doc.data().simPago,
                  dataEncaminhamento: doc.data().dataEncaminhamento,
                });
              }
            }
          })

          setClientes(listaCli);
          setLoading(false);
          setQuantidadeClientes(listaCli.length);
          localStorage.setItem('clientes', JSON.stringify(listaCli));
        }
      } catch (error) {
        console.error('Erro ao obter dados:', error);
        setError(error);
      }
    };
    fetchData();
  }, [busca]);
  useEffect(() => {
    const storedClientes = localStorage.getItem('clientes');

    if (storedClientes) {
      setClientes(JSON.parse(storedClientes));
      setQuantidadeClientes(JSON.parse(storedClientes).length);
      setLoading(false);
    }
  }, []);
  const handleExibirPagos = () => {
    setExibirPagos(!exibirPagos);
  };
  const handleSearch = () => {
    setBusca(texto);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setBusca(texto);
    }
  };
  return (
    <div>
      <Navbar2 />
      <div className="container-fluid titulo">
        <div className="row lista-vendas">
          <h1><b> COBRANÇA</b></h1>
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
              <a href="/app/home/novocob">
                <button className="btn  btn-new2 btn-primary" type="button">
                  <i className="fa-solid fa-plus"></i>
                </button>
              </a>
            </div>
            </div>
            </div>
            </div>
          <div className="background7">
            <div className="container-fluid titulo">
              <ListaCobranca arrayClientes={clientes} exibirPagos={exibirPagos} />
            </div>
          </div>
        </div>
        );
}
        export default Cobranca;