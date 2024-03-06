import React, { useState, useEffect } from "react";
import { Link, Navigate } from 'react-router-dom';
import Navbar from "../../Componentes/Navbar/navbar";
import ListaCliente from "../../Listas/listacliente";
import './vendas.css'
import { getAuth } from 'firebase/auth';
import { collection, getFirestore, getDocs, doc, deleteDoc, query, where } from 'firebase/firestore';
import 'firebase/firestore';
import SweetAlert from "react-bootstrap-sweetalert";
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
    const [arquivosSelecionados, setArquivosSelecionados] = useState({})
    const auth = getAuth();
    const user = auth.currentUser;
    const deleteUser = (id) => {
        const db = getFirestore();
        const clienteDocRef = doc(db, 'clientes', id);
        if (user.uid === 'qZcIK0QqohSn5HYl7ppC5Mldnd73') {
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
              if ((user && user.uid === 'W4OmQKw6gWTnWioUENmEpPjwb4m1') || (user && user.uid === 'yezea9eucLS9O1Pyl1LDzGXNTkE2') || (user && user.uid === 'aWFWUvSEOxYmBBsJiTZR7KLD2X23') || (user && user.uid === '3RmT5lBN8bhHt6pdHyOq9oBW6yD3') || (user && user.uid === 'fzPJ8yp4OJPAvGcBXP0aVD0TYe62')) {
                q = query(collection(db, 'clientes'));
              } else if (user) {
                q = query(collection(db, 'clientes'), where('userId', '==', user.uid));
              }
              if (q) {
                const querySnapshot = await getDocs(q);      
                const listaCli = [];     
                querySnapshot.forEach((doc) => {
                    const lowercaseBusca = busca.toLowerCase(); // Convertendo a busca para minúsculas
                    const lowercaseNome = doc.data().nome.toLowerCase(); // Convertendo o nome do documento para minúsculas
                    const lowercaseEmail = doc.data().email.toLowerCase(); // Convertendo o email do documento para minúsculas
                    const lowercaseCPF = doc.data().cpf.toLowerCase(); // Convertendo o CPF do documento para minúsculas
                    const lowercaseRazao = doc.data().razao.toLowerCase(); // Convertendo a razão social do documento para minúsculas
            
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
                        });
                    }
                });
                setClientes(listaCli);
                setQuantidadeClientes(listaCli.length);
                setLoading(false);
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
    }, [busca, excluido, user]);
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
            const month = new Date(cliente.data).getMonth() + 1; // +1 porque os meses em JavaScript são indexados a partir de zero
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

    const handleDownloadXML = () => {
        // Criar o conteúdo do XML com base nos dados dos clientes
        const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
          <clientes>
            ${clientes.map(cliente => `
              <cliente>
                <cpf>${cliente.cpf}</cpf>
                <nome>${cliente.nome}</nome>
                <email>${cliente.email}</email>
                <estado>${cliente.uf}</estado>
                <telefone>${cliente.fone}</telefone>
                <operador>${cliente.operador}</operador>
                <valor>${cliente.valor}</valor>
                <data>${cliente.data}</data>
                <vencimento>${cliente.venc2}</vencimento>
                <cobrador>${cliente.cobrador}</cobrador>
              </cliente>
            `).join('')}
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
            <div className="background7">
                <div className="container-fluid titulo">
                    <h1>Lista de Clientes</h1>
                    <div className="row">
                        <div className="col-4 buttons">
                            <Link to='/app/home/novocliente' className="btn btn-primary btn-cli" type="button">
                                <i className="fa-solid fa-plus"></i> Clientes
                            </Link>
                            <button onClick={handleDownloadXML} className="btn btn-danger btn-cli" type="button" id="button-addon2">
                                <i className="fa-solid fa-file-pdf"></i> Relatório de vendas
                            </button>
                            <button onClick={handleMostrarScript} className="btn btn-cli" type="button" id="button-addon2">
                                <i className="fa-solid fa-scroll"></i> Script
                            </button>
                            {isScriptModalVisible && (
                                <ScriptModal onClose={handleFecharScriptModal} />
                            )}
                            <button onClick={openModal} className="btn btn-success btn-cli" type="button" id="button-addon2">
                                Relatório Mensal
                            </button>
                        </div>
                        {showModal && (
                            <MonthlyReportModal
                                salesByMonth={salesByMonth}
                                onClose={closeModal}
                            />
                        )}
                        <div className="col-8 pesquisa">
                            <div className="input-group mb-3 ">
                                <input
                                    onChange={(e) => setTexto(e.target.value)}
                                    onKeyDown={handleKeyDown} // Adicionando o evento onKeyDown
                                    type="text"
                                    className="form-control"
                                    placeholder="Pesquisar por descrição"
                                    aria-describedby="button-addon2"
                                />
                                <button
                                    onClick={() => setBusca(texto)}
                                    className="btn btn-primary"
                                    type="button"
                                    id="button-addon2"
                                >
                                    <i className="fa-solid fa-magnifying-glass"></i> Pesquisar
                                </button>
                            </div>
                        </div>
                    </div>
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
        </div>
    );
}
export default Vendas;