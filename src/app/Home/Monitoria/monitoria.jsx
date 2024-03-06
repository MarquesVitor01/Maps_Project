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
          } else if(showNotConcluidos) {
            q = query(collection(db, 'clientes'), where('encaminharCliente', '==', false));
          }
           else {
            q = query(collection(db, 'clientes'));
          }
          const querySnapshot = await getDocs(q);
          const listaCli = [];
          querySnapshot.forEach((doc) => {
            if (doc.data().nome.indexOf(busca) >= 0 || doc.data().email.indexOf(busca) >= 0 || doc.data().cpf.indexOf(busca) >= 0) {
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
                naoEncaminharCliente: doc.data().naoEncaminharCliente
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
                    <h1>Monitoria</h1>
                    <div className="row">
                        <div className="col-4 buttons">
                            <button
                                className="btn btn-success btn-cli"
                                type="button"
                                onClick={handleShowConcluidos}
                            >
                                <i className="fa-solid fa-check"></i> {showConcluidos ? 'Todos' : 'Monitoria OK'}
                            </button>
                            <button
                                className="btn btn-warning btn-cli"
                                type="button"
                                onClick={handleShowNotConcluidos}
                            >
                                 <i class="fa-solid fa-bell"></i>{showNotConcluidos ? 'Todos' : ' Vendas para analisar'}
                            </button>
                        </div>
                        <div className="col-8 pesquisa">
                            <div className="input-group mb-3 ">
                                <input
                                    onChange={(e) => setTexto(e.target.value)}
                                    onKeyDown={handleKeyDown} // Adicionando o evento onKeyDown
                                    type="text"
                                    className="form-control"
                                    placeholder="Pesquisar por nome"
                                    aria-describedby="button-addon2"
                                />
                                <button
                                    onClick={(e) => setBusca(texto)}
                                    className="btn btn-primary"
                                    type="button"
                                    id="button-addon2"
                                >
                                    <i className="fa-solid fa-magnifying-glass"></i> Pesquisar
                                </button>
                            </div>
                        </div>
                    </div>
                    <ListaClienteMarketing arrayClientes={clientes} />
                </div>
            </div>
        </div>
    );
}
export default Monitoria;