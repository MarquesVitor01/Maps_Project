import React, { useState, useEffect } from "react";
import './fichapagamento.css'
import { Link, Navigate, useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

function FichaPagamento() {
    const [cliente, setCliente] = useState(null);
    const [mensagem, setMensagem] = useState('');
    const [sucesso, setSucesso] = useState('');
    const db = getFirestore();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clienteDocRef = doc(db, 'clientes', id);
                const docSnapshot = await getDoc(clienteDocRef);
                if (docSnapshot.exists()) {
                    setCliente(docSnapshot.data());
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

    return (
        <div>
            {cliente && (
                <div className="backgroundPagamento">
                    <form className="box">
                        <div className="box1">
                            <div className="title">
                                <h1><u>FICHA DO PAGAMENTO</u></h1>
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
                                    <span className="input-group-text">Telefone:</span>
                                </div>
                                <input value={cliente.fone || ''} disabled id="date" placeholder="Numero de telefone." type="text" className="form-control" />
                            </div>
                            <div className="caixa-cobrador">
                                <div className="input-group-prendend">
                                    <span className="input-group-text">Valor:</span>
                                </div>
                                <input value={cliente.valor || ''} onChange={(e) => setCliente({ ...cliente, valor: e.target.value })} id="date" placeholder="Valor do plano." type="text" className="form-control" />
                            </div>
                            <div className="caixa-cobrador">
                                <div className="input-group-prendend">
                                    <span className="input-group-text">Vencimento:</span>
                                </div>
                                <input value={cliente.venc2 || ''} disabled id="date" placeholder="Data de vencimento." type="text" className="form-control" />
                            </div>
                            <div className="divMkt">
                                <h5>O cliente possui acordo com a cobrança?</h5>
                            </div>
                            <div className="encaminhar row">
                                <div className="form-check mb-3">
                                    <input checked={cliente.concluidoSim} onChange={(e) => setCliente({ ...cliente, concluidoSim: e.target.checked })} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked"><b>Sim</b></label>
                                </div>
                                <div className="form-check mb-3">
                                    <input checked={cliente.concluidoNao} onChange={(e) => setCliente({ ...cliente, concluidoNao: e.target.checked })} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked"><b>Não</b></label>
                                </div>
                            </div>
                            <div className="caixa-cobrador">
                                <div className="input-group-prendend">
                                    <span className="input-group-text">Cobrador:</span>
                                </div>
                                <input value={cliente.cobrador || ''} disabled id="date" placeholder="Cobrador." type="text" className="form-control" />
                            </div>
                            <div className="caixa-cobrador">
                                <div className="input-group-prendend">
                                    <span className="input-group-text">Observação:</span>
                                </div>
                                <input value={cliente.obsMonitoria || ''} onChange={(e) => setCliente({ ...cliente, obsMonitoria: e.target.value })} id="date" type="text" placeholder="Insira informações" className="form-control" />
                            </div>
                            <div className="divMkt">
                                <h5>O cliente realizou o pagamento?</h5>
                            </div>
                            <div className="encaminhar row">
                                <div className="form-check mb-3">
                                    <input checked={cliente.simPago} onChange={(e) => setCliente({ ...cliente, simPago: e.target.checked })} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked"><b>Sim</b></label>
                                </div>
                                <div className="form-check mb-3">
                                    <input checked={cliente.naoPago} onChange={(e) => setCliente({ ...cliente, naoPago: e.target.checked })} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked"><b>Não</b></label>
                                </div>
                            </div>
                            <div className="caixa-cobrador">
                                <div className="input-group-prendend">
                                    <span className="input-group-text">Data de Pagamento:</span>
                                </div>
                                <input value={cliente.dataPagamento || ''} onChange={(e) => setCliente({ ...cliente, dataPagamento: e.target.value })} id="date" placeholder="Data de vencimento." type="date" className="form-control" />
                            </div>
                        </div>
                        {mensagem.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{mensagem}</div> : null}
                        {sucesso === 'S' ? <Navigate to='/app/financeiromapsempresas' /> : null}
                    </form>
                </div>
            )}
            <div className="voltar row">
                <Link to="/app/financeiromapsempresas" className="btn btn-warning btn-acao">Voltar</Link>
                <button onClick={AlterarCliente} type="button" className="btn btn-primary btn-acao">Salvar</button>
            </div>
        </div>
    );
}

export default FichaPagamento;