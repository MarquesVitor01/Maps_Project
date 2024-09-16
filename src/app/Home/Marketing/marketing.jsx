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
        const storedClientes = localStorage.getItem('clientes');
        if (storedClientes) {
            setClientes(JSON.parse(storedClientes));
            setQuantidadeClientes(JSON.parse(storedClientes).length);
            setLoading(false);
        }
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
            <div className="container-fluid titulo">
                <div className="row lista-vendas">
                    <h1><b> MARKETING</b></h1>
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
                                <i className="fa-solid fa-check"></i> {showConcluidos ? 'Todos' : 'Concluídos'}

                            </button>
                        </div>
                        <div className="row exibicao3">
                            <h4 >
                                <i className="fa-solid fa-user "></i><b> CLIENTES: {quantidadeClientes}</b>
                            </h4>
                        </div>
                        {/* <div className="txtAss row">

                            <div className="divAgenciados">
                                <h1>
                                    <i className="fa-solid fa-dollar-sign"></i><b>PAGOS: {quantidadePagos}</b>
                                </h1>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="background7">
                <div className="container-fluid titulo">
                    <ListaClienteMarketing arrayClientes={clientes} />
                </div>
            </div>
        </div>
    );
}
export default Marketing;