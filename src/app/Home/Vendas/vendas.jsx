import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from 'react-router-dom';
import Navbar from "../../Componentes/Navbar/navbar";
import ListaCliente from "../../Listas/listacliente";
import './vendas.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getFirestore, getDocs, doc, deleteDoc, query, where, addDoc } from 'firebase/firestore';
import 'firebase/firestore';
import SweetAlert from "react-bootstrap-sweetalert";
import { AuthContext } from '../../Acesso/Context/auth';

const ScriptModal = ({ onClose }) => {
    return (
        <div className="script-modal over">
            <div className="script-modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <br />
                <p>Olá, Bom dia. O meu nome é _____, faço parte do Grupo Maps. O motivo do meu contato é
                    referente a inclusão e a divulgação dos seus serviços dentro da plataforma de busca do google
                    maps. Eu só vou precisar validar com o senhor algumas informações que vão ficar disponiveis
                    pros seus clientes, tudo bem?
                    O nome fantasia é esse mesmo___?
                    o endereço cadastrado seria____?
                    o numero pro cliente entrar em contato com o senhor é esse mesmo que estamos nos falando
                    ou teria outro? Ele seria whatsapp?
                    Qua seria o horário de funcionamento? De segunda a sexta?
                    o email é___
                    Certo, vou estar falando agora o seu cnpj e a razao social e o senhor me confirma se está
                    correto.
                    Perfeito. O marketing vai entrar em contato com o senhor atraves do whatsapp e por lá é
                    importante o senhor estar encaminhando até 30 fotos e 5 vídeos do seu serviço mensalmente
                    pra estarmos atualizando a sua página. Caso o senhor tenha redes sociais, como facebook ou
                    instagram, o senhor pode estar nos encaminhando o link para incluirmos na sua página. Além
                    disso, também conseguimos criar um cartão interativo digital e uma logotipo para a sua
                    empresa. Teria também uma divulgação, onde o senhor consegue escolher 5 bairros e
                    municipios mais próximos para a divulgação da sua página. O senhor tem alguma dúvida até
                    aqui?
                    Referente a todo esse processo de criação, atualização e divulgação da sua página, gera um
                    investimento no valor de 39,90 mensalmente, válido por 1 ano, com a data de vencimento
                    somente para o dia ____
                    Lembrando que esse investimento é realizado somente após o senhor verificar todas as
                    atualizações, ou seja, primeiro o senhor vera todos os serviços prestados e só depois irá
                    realizar o investimento.
                    Como a empresa do senhor é uma empresa privada, vamos encaminhar no seu whatsapp um
                    termo de autorização onde o senhor vai estar autorizando os nossos serviços.</p>
            </div>
        </div>
    );
};
const MonthlyReportModal = ({ salesByMonth, onClose }) => {
    return (
        <div className="script-modal over">
            <div className="script-modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Relatório Mensal</h2>
                <ul>
                    {Object.entries(salesByMonth).map(([month, count]) => (
                        <li key={month}>Mês {month}: {count} vendas</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
function Vendas() {
    const [clientes, setClientes] = useState([]);
    const [busca, setBusca] = useState('');
    const [texto, setTexto] = useState('');
    const [excluido, setExcluido] = useState('');
    const [confirmacao, setConfirmacao] = useState(false);
    const [confirmacaoId, setConfirmacaoId] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantidadeClientes, setQuantidadeClientes] = useState(0);
    const [mediaNotas, setMediaNotas] = useState(0);
    const { setLogado } = useContext(AuthContext);
    const [isAdmUser, setIsAdmUser] = useState(false);
    const [quantidadePagos, setQuantidadePagos] = useState('');


    const auth = getAuth();
    const user = auth.currentUser;
    const deleteUser = (id) => {
        const db = getFirestore();
        const clienteDocRef = doc(db, 'clientes', id);
        if (user.uid === 'yezea9eucLS9O1Pyl1LDzGXNTkE2') {
            deleteDoc(clienteDocRef)
                .then(() => {
                    console.log('Documento excluído com sucesso:', id);
                    setExcluido(id);
                    setConfirmacao(false);
                })
                .catch((erro) => {
                    console.error('Erro ao excluir documento:', erro);
                    setError(erro);
                });
        } else {
            console.error('Usuário não tem permissão para excluir clientes.');
            setError('Você não tem permissão para excluir clientes.');
            alert('Você não tem permissão para excluir clientes.')
            setConfirmacao(false);
        }
    };

    useEffect(() => {
        if (error) {
            const timeout = setTimeout(() => {
                setError(null);
                <Navigate to='/app/home'></Navigate>
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [error]);
    const confirmDeleteUser = (id) => {
        setConfirmacaoId(id);
        setConfirmacao(true);
    };
    const calcularMediaNotas = (clientes) => {
        const totalNotas = clientes.reduce((acc, cliente) => {
            if (cliente.nota) {
                return acc + parseInt(cliente.nota);
            }
            return acc;
        }, 0);
        const media = clientes.length > 0 ? totalNotas / clientes.length : 0;
        localStorage.setItem('mediaNotas', media.toString()); // Armazenar a média das notas em localStorage
        return media;
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log('ID do usuário:', user.uid);
                setLogado(true);
                // Verificar se o usuário é um administrador
                if (user.uid === 'yezea9eucLS9O1Pyl1LDzGXNTkE2') {
                    setIsAdmUser(true); // Definir a variável de administrador como true
                }

            } else {
                console.log('Nenhum usuário autenticado.');
                setLogado(false);
            }
        });
        return () => unsubscribe();
    }, [auth, setLogado]);

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

                const userSuper = ((user.uid === 'Hk5ute6UesQM6R438MyBu6Cc9TF2') || (user.uid === '3RmT5lBN8bhHt6pdHyOq9oBW6yD3') || (user.uid === 'fzPJ8yp4OJPAvGcBXP0aVD0TYe62') || (user.uid === 'yezea9eucLS9O1Pyl1LDzGXNTkE2'));

                if (userSuper) {
                    q = query(collection(db, 'clientes'));
                } else if (user) {
                    q = query(collection(db, 'clientes'), where('userId', '==', user.uid));
                }
                if (q) {
                    const querySnapshot = await getDocs(q);
                    const listaCli = [];
                    querySnapshot.forEach((doc) => {
                        const data = doc.data(); // Obtenha os dados do documento
                        if (data) { // Verifique se os dados existem
                            const lowercaseBusca = busca.toLowerCase();
                            const lowercaseNome = (data.nome || '').toLowerCase();
                            const lowercaseOperador = (data.operador || '').toLowerCase();
                            const lowercaseEmail = (data.email || '').toLowerCase();
                            const lowercaseCPF = (data.cpf || '').toLowerCase();
                            const lowercaseRazao = (data.razao || '').toLowerCase();

                            if (
                                lowercaseNome.indexOf(lowercaseBusca) >= 0 ||
                                lowercaseEmail.indexOf(lowercaseBusca) >= 0 ||
                                lowercaseCPF.indexOf(lowercaseBusca) >= 0 ||
                                lowercaseRazao.indexOf(lowercaseBusca) >= 0 || 
                                lowercaseOperador.indexOf(lowercaseBusca) >= 0
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
                                    razao: doc.data().razao,
                                    simPago: doc.data().simPago,
                                    dataPagamento: doc.data().dataPagamento,
                                    nota: doc.data().nota || '100%',
                                    venc2: doc.data().venc2,
                                    validade: doc.data().validade,
                                    whats: doc.data().whats,
                                    plano: doc.data().plano,
                                    fantasia: doc.data().fantasia,
                                });
                            }
                        }
                    });
                    setClientes(listaCli);
                    listaCli.forEach(async (cliente) => {
                        if (!cliente.nota) {
                            await addDoc(collection(db, 'clientes'), { id: cliente.id, nota: '100%' });
                        }
                    });

                    // Calcular a média das notas
                    const media = calcularMediaNotas(listaCli);
                    setMediaNotas(media);

                    // Contar o número de clientes pagos
                    const contadorPagos = listaCli.filter(cliente => cliente.simPago).length;
                    setQuantidadeClientes(listaCli.length);
                    setQuantidadePagos(contadorPagos);

                    // Armazenar clientes no localStorage
                    localStorage.setItem('clientes', JSON.stringify(listaCli));

                }
            } catch (error) {
                console.error('Erro ao obter dados:', error);
                setError(error);
            }
        };
        if (user) {
            fetchData();
        }
    }, [busca, excluido, user, isAdmUser]);

    useEffect(() => {
        const storedClientes = localStorage.getItem('clientes');
        if (storedClientes) {
            setClientes(JSON.parse(storedClientes));
            setQuantidadeClientes(JSON.parse(storedClientes).length);
            setLoading(false);
        }
    }, []);
    const [isScriptModalVisible, setScriptModalVisible] = useState(false);
    const handleMostrarScript = () => {
        setScriptModalVisible(true);
    };
    const handleFecharScriptModal = () => {
        setScriptModalVisible(false);
    };
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };
    const countSalesByMonth = (clientes) => {
        const salesByMonth = {};
        clientes.forEach(cliente => {
            const month = new Date(cliente.data).getMonth() + 1;
            if (salesByMonth[month]) {
                salesByMonth[month]++;
            } else {
                salesByMonth[month] = 1;
            }
        });
        return salesByMonth;
    };
    const salesByMonth = countSalesByMonth(clientes);
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setBusca(texto);
        }
    };
    function formatarData(data) {
        if (typeof data === 'string' && data.includes('-')) {
            const partes = data.split('-');
            return `${partes[2]}-${partes[1]}-${partes[0]}`;
        } else {
            return 'Data inválida';
        }
    }
    const escapeXML = (unsafe) => {
        if (typeof unsafe !== 'string') {
            return ''; // Retorna uma string vazia se o valor for undefined ou não for uma string
        }
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");
    };
    
    
    const handleDownloadXML = () => {
        // Criar o conteúdo do XML com base nos dados dos clientes
        const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
          <clientes>
            ${clientes.map(cliente => `
              <cliente>
                <cpf>${escapeXML(cliente.cpf)}</cpf>
                <razao>${escapeXML(cliente.razao)}</razao>
                <nome>${escapeXML(cliente.nome)}</nome>
                <email>${escapeXML(cliente.email)}</email>
                <telefone>${escapeXML(cliente.fone)}</telefone>
                <whats>${escapeXML(cliente.whats)}</whats>
                <operador>${escapeXML(cliente.operador)}</operador>
                <valor>${escapeXML(cliente.valor)}</valor>
                <data>${escapeXML(formatarData(cliente.data))}</data>
                <validade>${escapeXML(cliente.validade)}</validade>
                <pago>${escapeXML(cliente.simPago ? "sim" : "não")}</pago>
                <vencimento>${escapeXML(formatarData(cliente.venc2))}</vencimento>
                <dataPagamento>${escapeXML(formatarData(cliente.dataPagamento))}</dataPagamento>
                <cobrador>${escapeXML(cliente.cobrador)}</cobrador>
              </cliente>`).join('')}
          </clientes>`;
    
        // Converter o XML em Blob
        const blob = new Blob([xmlContent], { type: 'application/xml' });
    
        // Criar o URL do Blob
        const url = URL.createObjectURL(blob);
    
        // Criar um link para download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'clientes.xml';
    
        // Simular o clique no link para iniciar o download    
        link.click();
    
        // Limpar o URL do Blob após o download
        URL.revokeObjectURL(url);
    };
    
    

    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const checkTimeAndShowPopup = () => {
            const now = new Date();
            if (now.getHours() === 12 && now.getMinutes() === 0) {
                setShowPopup(true);
            }
        };
        checkTimeAndShowPopup();

        const intervalId = setInterval(() => {
            checkTimeAndShowPopup();
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);

    const closePopup = () => {
        setShowPopup(false);
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLogado(true);
            } else {
                console.log('Nenhum usuário autenticado.');
                setLogado(false);
            }
        });
        return () => unsubscribe();
    }, [auth, setLogado]);
    useEffect(() => {
        // console.log('Média de notas:', mediaNotas);
    }, [mediaNotas]);
    
    return (
        
        <div>
            {showPopup && (
                <SweetAlert
                    title="Horário do Almoço!"
                    onConfirm={closePopup}
                >
                    Bom apetite e não se esqueça de bater o ponto 😉
                </SweetAlert>
            )}

            <Navbar />

            <div className="container-fluid titulo">
                <div className="row lista-vendas">
                    <h1><b>LISTA DE VENDAS</b></h1>
                    <div className="col-5 pesquisa">
                        <div className="input-group mb-3">
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
                            <a href="/app/home/novocliente">
                                <button className="btn  btn-new2 btn-primary" type="button">
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </a>

                            <button onClick={handleDownloadXML} className="btn  btn-new2 btn-danger" type="button" id="button-addon2">
                                <i className="fa-solid fa-file-pdf"></i>
                            </button>
                            <button onClick={handleMostrarScript} className="btn  btn-new2 btn-warning" type="button" id="button-addon2">
                                <i className="fa-solid fa-scroll"></i>
                            </button>
                            {isScriptModalVisible && (
                                <ScriptModal onClose={handleFecharScriptModal} />
                            )}
                            <button onClick={openModal} className="btn  btn-new2 btn-success" type="button" id="button-addon2">
                                <i className="fa-solid fa-calendar-days"></i>
                            </button>
                            <a href="/app/home/relatorioprincipal">
                                <button className="btn  btn-new2 btn-secondary" type="button">
                                <i className="fa-solid fa-table"></i>                                </button>
                            </a>

                        </div>
                        <div className="row exibicao">
                            <h4 className="qtdClientesAss">
                                <i className="fa-solid fa-star"></i> {mediaNotas.toFixed(2)}
                            </h4>
                            <h4 className="qtdClientesAss">
                                <i className="fa-solid fa-user "></i><b> CLIENTES: {quantidadeClientes}</b>
                            </h4>
                            <h4>
                                <i className="fa-solid fa-dollar-sign"></i><b>PAGOS: {quantidadePagos}</b>
                            </h4>
                        </div>
                        <div className="txtAss row">


                        </div>
                        {showModal && (
                            <MonthlyReportModal
                                salesByMonth={salesByMonth}
                                onClose={closeModal}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="background7">
                <div className="container-fluid titulo">


                    <ListaCliente arrayClientes={clientes} clickDelete={confirmDeleteUser} />
                    {confirmacao ?
                        <SweetAlert
                            warning
                            showCancel
                            showCloseButton
                            confirmBtnText="Sim"
                            confirmBtnBsStyle="danger"
                            cancelBtnText="Não"
                            cancelBtnBsStyle="ligth"
                            title="Exclusão"
                            onConfirm={() => deleteUser(confirmacaoId)}
                            onCancel={() => setConfirmacao(false)}
                            reverseButtons={true}
                        >
                            Deseja excluir o cliente selecionado?
                        </SweetAlert> : null}
                </div>
            </div>
            <a href="https://chat.google.com/" className="back-to-top">
            <i className="fa-regular fa-comment"></i> </a>
        </div>
        

    );
}
export default Vendas;