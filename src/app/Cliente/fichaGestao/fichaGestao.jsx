import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from 'react-router-dom';
import './fichaGestao.css'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import 'firebase/firestore'

function FichaGestao() {
    const [cliente, setCliente] = useState(null);
    const [mensagem, setMensagem] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [dataEncaminhamento, setDataEncaminhamento] = useState('');

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
                <div className="background9">
                    <form className="box">
                        <div className="title">
                            <h1>
                                Encaminhar
                            </h1>
                        </div>
                        <div>
                            <div className="caixa-cobrador">
                                <div className="input-group-prendend">
                                    <span className="input-group-text">Nome do cobrador:</span>
                                </div>
                                <select className="custom-select d-block" onChange={(e) => setCliente({ ...cliente, cobrador: e.target.value})} value={cliente.cobrador} id="estado" required>
                                    <option value="">Escolha</option>
                                    <option value="Isabela Eugenio">Isabela Eugenio</option>
                                    <option value="Edson Miguel">Edson Miguel</option>
                                    <option value="Giovana Blandino">Giovana Blandino</option>
                                    <option value="Nataniele">Nataniele</option>
                                    <option value="Yasmin Gomes">Ana Clara</option>
                                    <option value="Evilly">Evilly</option>
                                    <option value="Jonathan">Jonathan</option>
                                    <option value="Matheus">Matheus</option>
                                </select>
                            </div>
                            <div className="col-md-12">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="nomeFantasia"><b>Data que esta sendo encaminhado:</b></label>
                                <input
                                    type="date"
                                    id="nomeFantasia"
                                    name="nomeFantasia"
                                    onChange={(e) => setCliente({ ...cliente, dataEncaminhamento: e.target.value})}
                                    value={cliente.dataEncaminhamento}
                                    className="form-control"
                                    placeholder="Observações"
                                />
                            </div>
                            {/* <div className="caixa-cobrador">
                            <div className="input-group-prendend">
                                <span className="input-group-text">Data da cobrança:</span>
                            </div>
                            <input onChange={(e) => setDataCobranca(e.target.value)} value={dataCobranca} id="date" type="date" className="form-control" />
                        </div>
                        <div className="caixa-cobrador">
                            <div className="input-group-prendend">
                                <span className="input-group-text">Data de Vencimento:</span>
                            </div>
                            <input onChange={(e) => setVencimentoCobranca(e.target.value)} value={vencimentoCobranca} id="date" type="date" className="form-control" />
                        </div> */}
                        </div>
                        {mensagem.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{mensagem}</div> : null}
                        {sucesso === 'S' ? <Navigate to='/app/gestaomapsempresas' /> : null}
                    </form>

                </div>
            )}
            <div className="voltar row">
                <Link to="/app/gestaomapsempresas" className="btn btn-warning btn-acao">Voltar</Link>
                <button onClick={AlterarCliente} type="button" className="btn btn-primary btn-acao">Salvar</button>
            </div>
        </div>
    );
}

export default FichaGestao;