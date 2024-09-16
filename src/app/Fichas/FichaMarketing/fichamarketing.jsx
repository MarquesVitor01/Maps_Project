import React, { useState, useEffect } from "react";
import './fichamarketing.css'
import { Link, Navigate, useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';

function FichaMarketing() {
    const [cliente, setCliente] = useState(null);
    const [totalParcelas, setTotalParcelas] = useState(0);
    const [totalPago, setTotalPago] = useState(0);
    const [mensagem, setMensagem] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [mostrarParcelas, setMostrarParcelas] = useState(false);
    const [clientes, setClientes] = useState([]); // Adicionando o estado para os clientes

    const db = getFirestore();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clientesCollectionRef = collection(db, 'clientes');
                const clientesSnapshot = await getDocs(clientesCollectionRef);
                const clientesData = clientesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setClientes(clientesData);
            } catch (error) {
                console.error('Erro ao obter dados dos clientes:', error);
            }
        };
        fetchData();
    }, [db]);

    const AlterarCliente = async () => {
        try {
            const senhaDigitada = prompt("Digite sua senha:");
            if (senhaDigitada === '@') {
                await updateDoc(doc(db, 'clientes', id), cliente);
                setMensagem('');
                setSucesso('S');
            } else {
                setMensagem('Senha incorreta');
            }
        } catch (erro) {
            setMensagem('Erro ao atualizar cliente');
            setSucesso('N');
            console.error('Erro ao atualizar cliente:', erro);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clienteDocRef = doc(db, 'clientes', id);
                const docSnapshot = await getDoc(clienteDocRef);
                if (docSnapshot.exists()) {
                    const clienteData = docSnapshot.data();
                    setCliente(clienteData);
                } else {
                    setMensagem('Cliente não encontrado');
                }
            } catch (error) {
                setMensagem('Erro ao obter dados do cliente');
                console.error('Erro ao obter dados do cliente:', error);
            }
        };
        fetchData();
    }, [db, id]);

   

    
    return (
        <div>
            {cliente && (
                <div className="backgroundPagamento">
                    <form className="box">
                        <div className="box1">
                            <div className="title">
                                <h1><u>FICHA DO MARKETING</u></h1>
                            </div>
                        </div>
                        <div>
                            <div className="caixa-cobrador">
                                <div className="input-group-prendend">
                                    <span className="input-group-text">CNPJ:</span>
                                </div>
                                <input value={cliente.cpf || ''} disabled id="date" type="text" placeholder="CNPJ do cliente." className="form-control" />
                            </div>
                            <div className="caixa-cobrador">
                                <div className="input-group-prendend">
                                    <span className="input-group-text">Razão:</span>
                                </div>
                                <input value={cliente.razao || ''} disabled id="date" placeholder="Numero de telefone." type="text" className="form-control" />
                            </div>
                            <div className="caixa-cobrador">
                                <div className="input-group-prendend">
                                    <span className="input-group-text">Nome Fantasia:</span>
                                </div>
                                <input value={cliente.fantasia || ''} disabled id="date" type="text" placeholder="CNPJ do cliente." className="form-control" />
                            </div>
                            <div className="caixa-cobrador">
                                <div className="input-group-prendend">
                                    <span className="input-group-text">Operador:</span>
                                </div>
                                <input value={cliente.operador || ''} disabled id="date" type="text" placeholder="CNPJ do cliente." className="form-control" />
                            </div>
                            <div className="caixa-cobrador">
                                <div className="input-group-prendend">
                                    <span className="input-group-text">Telefone:</span>
                                </div>
                                <input value={cliente.fone || ''} disabled id="date" placeholder="Numero de telefone." type="text" className="form-control" />
                            </div>
                            <div className="caixa-cobrador">
                                <div className="input-group-prendend">
                                    <span className="input-group-text">WhatsApp:</span>
                                </div>
                                <input value={cliente.whats || ''} disabled onChange={(e) => setCliente({ ...cliente, valor: e.target.value })} id="date" placeholder="Valor do plano." type="text" className="form-control" />
                            </div>
                            <div className="caixa-cobrador">
                                <div className="input-group-prendend">
                                    <span className="input-group-text">Valor:</span>
                                </div>
                                <input value={cliente.valor || ''} disabled onChange={(e) => setCliente({ ...cliente, valor: e.target.value })} id="date" placeholder="Valor do plano." type="text" className="form-control" />
                            </div>
                            <div className="caixa-cobrador">
                                <div className="input-group-prendend">
                                    <span className="input-group-text">Vencimento:</span>
                                </div>
                                <input value={cliente.venc2 || ''} disabled id="date" placeholder="Data de vencimento." type="text" className="form-control" />
                            </div>
                            <div className="caixa-cobrador">
                                <div className="input-group-prendend">
                                    <span className="input-group-text">Link Google:</span>
                                </div>
                                <input value={cliente.link || ''} disabled id="date" type="text" className="form-control" />
                            </div>
                            <div className="caixa-cobrador">
                                <div className="input-group-prendend">
                                    <span className="input-group-text">Link Cartão Digital:</span>
                                </div>
                                <input value={cliente.linkCartaoDigital || ''}  id="date" placeholder="Insira o link do Cartão Digital." type="text" className="form-control" />
                            </div>
                            <div className="caixa-cobrador">
                                <div className="input-group-prendend">
                                    <span className="input-group-text">Link Logotipo:</span>
                                </div>
                                <input value={cliente.linkLogo || ''}  id="date" placeholder="Insira o link da Logotipo." type="text" className="form-control" />
                            </div>
                            <div className="caixa-cobrador">
                                <div className="input-group-prendend">
                                    <span className="input-group-text">Link Qrcode:</span>
                                </div>
                                <input value={cliente.linkQr || ''}  id="date" placeholder="Insira o link do Qr code." type="text" className="form-control" />
                            </div>
                            <div className="caixa-cobrador">
                                <div className="input-group-prendend">
                                    <span className="input-group-text">Nome do Designer:</span>
                                </div>
                                <input value={cliente.designer || ''}  id="date" placeholder="Insira o nome do designer." type="text" className="form-control" />
                            </div>
                            <div className="caixa-cobrador">
                                <div className="input-group-prendend">
                                    <span className="input-group-text">Data da conclusão:</span>
                                </div>
                                <input value={cliente.conclusao || ''}  id="date" placeholder="Insira a data de conclusão." type="date" className="form-control" />
                            </div>
                            <div className="divMkt">
                                <h5>Os serviços já foram realizados?</h5>
                            </div>
                            <div className="encaminhar row">
                                <div className="form-check mb-3">
                                    <input checked={cliente.realizadoSim} onChange={(e) => setCliente({ ...cliente, concluidoSim: e.target.checked })} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked"><b>Sim</b></label>
                                </div>
                                <div className="form-check mb-3">
                                    <input checked={cliente.realizadoNao} onChange={(e) => setCliente({ ...cliente, concluidoNao: e.target.checked })} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked"><b>Não</b></label>
                                </div>
                            </div>
                        </div>
                        {mensagem.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{mensagem}</div> : null}
                        {sucesso === 'S' ? <Navigate to='/app/financeiromapsempresas' /> : null}
                    </form>
                </div>
            )}
            <div className="voltar row">
                <Link to="/app/marketingmapsempresas" className="btn btn-warning btn-acao">Voltar</Link>
                <button onClick={AlterarCliente} type="button" className="btn btn-primary btn-acao">Salvar</button>
            </div>
        </div>
    );
}

export default FichaMarketing;