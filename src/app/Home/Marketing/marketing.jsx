import React, { useState, useEffect } from "react";
import Navbar4 from "../../Componentes/Navbar/navbar4";
import ListaClienteMarketing from "../../Listas/listamarketing.jsx";
import './marketing.css'
import { getAuth } from 'firebase/auth';
import { collection, getFirestore, getDocs, query, where } from 'firebase/firestore';
import 'firebase/firestore';
function Marketing() {
    const [clientes, setClientes] = useState([]);
    const [busca, setBusca] = useState('');
    const [texto, setTexto] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantidadeClientes, setQuantidadeClientes] = useState(0);
    const [showConcluidos, setShowConcluidos] = useState(false);
    const auth = getAuth();
    const user = auth.currentUser;
    useEffect(() => {
      const fetchData = async () => {
        try {
          const db = getFirestore();
          let q;
          if (showConcluidos) {
            q = query(collection(db, 'clientes'), where('concluido', '==', true));
          } else {
            q = query(collection(db, 'clientes'), where('encaminharCliente', '==', true));
          }
          const querySnapshot = await getDocs(q);
          const listaCli = [];
          querySnapshot.forEach((doc) => {
            const cliente = {
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
                encaminharCliente: doc.data().encaminharCliente
            };
        
            // Converter todos os valores do cliente para letras minúsculas e remover espaços em branco
            const clienteLowerCase = Object.fromEntries(Object.entries(cliente).map(([key, value]) => [key, value.toString().toLowerCase().trim()]));
        
            // Converter o texto de busca para letras minúsculas e remover espaços em branco
            const buscaLowerCase = busca.toLowerCase().trim();
        
            // Verificar se algum dos valores do cliente contém o texto de busca
            if (
                Object.values(clienteLowerCase).some(value => value.includes(buscaLowerCase))
            ) {
                listaCli.push(cliente);
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
    }, [busca, showConcluidos, user]);
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
                    <h1>Fila do Marketing</h1>
                    <div className="row">
                        <div className="col-4 buttons">
                            <button
                                className="btn btn-success btn-cli"
                                type="button"
                                onClick={handleShowConcluidos}
                            >
                                <i className="fa-solid fa-check"></i> {showConcluidos ? 'Todos' : 'Concluídos'}
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
export default Marketing;