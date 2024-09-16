import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from 'react-router-dom';
import './fichaFinanceiro.css'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import 'firebase/firestore'
function FichaFinanceiro() {
    const [encaminharClienteCobranca, setEncaminharClienteCobranca] = useState(false);
    const [naoEncaminharClienteCobranca, setNaoEncaminharClienteCobranca] = useState(false);
    const [cobrador, setCobrador] = useState('');
    const [dataEncaminhamento, setDataEncaminhamento] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [sucesso, setSucesso] = useState('');
    const db = getFirestore();
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('ID do Cliente:', id);
                const clienteDocRef = doc(db, 'clientes', id);
                console.log('Referência do Documento:', clienteDocRef);
                const docSnapshot = await getDoc(clienteDocRef);
                console.log('Snapshot do Documento:', docSnapshot.data());
                if (docSnapshot.exists()) {
                    const dados = docSnapshot.data();
                    setCobrador(dados.cobrador);
                    setEncaminharClienteCobranca(dados.encaminharClienteCobranca);
                    setNaoEncaminharClienteCobranca(dados.naoEncaminharClienteCobranca);
                    setDataEncaminhamento(dados.dataEncaminhamento);

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
                await updateDoc(doc(db, 'clientes', id), {
                    cobrador: cobrador,
                    naoEncaminharClienteCobranca: naoEncaminharClienteCobranca,
                    encaminharClienteCobranca: encaminharClienteCobranca,
                    dataEncaminhamento: dataEncaminhamento
                });
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
            <div className="background9">
                <form className="box">
                    <div className="title">
                        <h1>
                            Itens do Financeiro
                        </h1>
                    </div>
                    <div>
                        <div className="caixa-cobrador">
                            <div className="input-group-prendend">
                                <span className="input-group-text">Nome do cobrador:</span>
                            </div>
                            <select className="custom-select d-block" onChange={(e) => setCobrador(e.target.value)} value={cobrador} id="estado" required>
                                <option value="">Nenhum</option>
                                <option value="Jonathan">Jonathan</option>
                                <option value="Ana Clara">Ana Clara</option>
                                <option value="Karolina Salgado">Karolina Salgado</option>
                                <option value="Adriana">Adriana</option>
                                <option value="Allan Bruno">Allan Bruno</option>
                                <option value="Bruno Santos">Bruno Santos</option>
                                <option value="Matheus">Matheus</option>
                                <option value="Evilly">Evilly</option>
                                <option value="Isabela Eugenio">Isabela Eugenio</option>
                                <option value="Nataniele">Nataniele</option>
                                <option value="Miguel">Miguel</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="nomeFantasia"><b>Data que esta sendo encaminhado:</b></label>
                                <input
                                    type="date"
                                    id="nomeFantasia"
                                    name="nomeFantasia"
                                    onChange={(e) => setDataEncaminhamento(e.target.value)}
                                    className="form-control"
                                    placeholder="Observações"
                                />
                            </div>
                        <div className="divMkt">
                            <h5>
                                Encaminhar cliente para a cobrança?
                            </h5>
                        </div>
                        <div className="encaminhar row">
                            <div className="form-check mb-3">
                                <input onChange={(e) => setEncaminharClienteCobranca(e.target.checked)} checked={encaminharClienteCobranca} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Sim</b>
                                </label>
                            </div>
                            <div className="form-check mb-3">
                                <input onChange={(e) => setNaoEncaminharClienteCobranca(e.target.checked)} checked={naoEncaminharClienteCobranca} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Não</b>
                                </label>
                            </div>
                        </div>
                    </div>
                    {mensagem.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{mensagem}</div> : null}
                    {sucesso === 'S' ? <Navigate to='/app/financeiromapsempresas' /> : null}
                </form>
            </div>
            <div className="voltar row">
                <Link to={() => window.history.back()} className="btn btn-warning btn-acao">Voltar</Link>
                <Link to="/app/financeiromapsempresas" onClick={AlterarCliente} type="button" className="btn btn-primary btn-acao">Salvar</Link>
            </div>
        </div>
    );
}

export default FichaFinanceiro;