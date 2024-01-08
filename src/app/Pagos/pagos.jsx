import React, { useState, useEffect } from "react";
import Navbar2 from "../Componentes/Navbar/navbar2";
import ListaCliente2 from "../Componentes/ListaCliente/listacliente2";
import '../Pagos/pagos.css';
import { collection, getFirestore, getDocs, query } from 'firebase/firestore';
import 'firebase/firestore';
import clientesPDF2 from "../Reports/Clientes/cleintes2";
import { getAuth } from 'firebase/auth';

function Pagos() {
    const [clientes, setClientes] = useState([]);
    const [busca, setBusca] = useState('');
    const [texto, setTexto] = useState('');
    const [loading, setLoading] = useState(true);
    const [quantidadeClientes, setQuantidadeClientes] = useState(0);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const auth = getAuth();
          const user = auth.currentUser;
  
          if (user && user.uid === 'xVCyJZJSEGhd0tk7YZem4dLVI8E2') {
            const db = getFirestore();
            const clientesRef = collection(db, 'clientes');
            const q = query(clientesRef);
  
            const snapshot = await getDocs(q);
  
            const listaCli = snapshot.docs.map(doc => ({
              id: doc.id,
              cpf: doc.data().cpf,
              nome: doc.data().nome,
              email: doc.data().email,
              uf: doc.data().uf,
              fone: doc.data().fone,
              valor: doc.data().valor
            }));
  
            setClientes(listaCli);
            setQuantidadeClientes(listaCli.length);
            setLoading(false);
  
            // Armazenar os clientes localmente
            localStorage.setItem('clientes', JSON.stringify(listaCli));
          } else {
            // Usuário não autorizado
            console.error('Acesso não autorizado para verificar todos os clientes.');
            // Pode redirecionar ou lidar com isso de alguma outra maneira, como mostrar uma mensagem de erro.
          }
        } catch (error) {
          console.error('Erro ao obter dados:', error);
          // Lide com o erro de alguma forma apropriada
        }
      };
  
      fetchData();
    }, [busca]);

    useEffect(() => {
      // Recuperar os clientes do localStorage ao carregar a página
      const storedClientes = localStorage.getItem('clientes');

      if (storedClientes) {
          setClientes(JSON.parse(storedClientes));
          setQuantidadeClientes(JSON.parse(storedClientes).length);
          setLoading(false);
      }
  }, []); // Executar apenas uma vez ao carregar a página
  

  return (
    <div>
      <Navbar2 />
      <div className="container-fluid titulo">
        <h1>Situação do cliente</h1>
        <div className="row">
          <div className="col-4">
            <button onClick={(e) => clientesPDF2(clientes)} className="btn btn-danger btn-cli" type="button" id="button-addon2">
              <i className="fa-solid fa-file-pdf"></i> Gerar PDF
            </button>
          </div>
          <div className="col-8">
            <div className="input-group mb-3">
              <input onChange={(e) => setTexto(e.target.value)} type="text" className="form-control" placeholder="Perguntar por nome" aria-describedby="button-addon2" />
              <button onClick={(e) => setBusca(texto)} className="btn btn-primary" type="button" id="button-addon2">
                <i className="fa-solid fa-magnifying-glass"></i> Pesquisar
              </button>
            </div>
          </div>
        </div>
        <ListaCliente2 arrayClientes={clientes} />
      </div>
    </div>
  );
}

export default Pagos;