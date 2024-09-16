import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import './comprovantes.css'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import 'firebase/firestore'
function Comprovantes() {
    const navigate = useNavigate();
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

    const handleClick = (e) => {
        e.preventDefault();
        AlterarCliente(); // Chama a função AlterarCliente
        navigate(-1);    // Navega de volta uma página
      };
    
    return (
        <div>
             {cliente && (
            <div className="background9">
                <form className="box">
                    <div className="title">
                        <h1>
                            Anexo de comprovantes
                        </h1>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label className="d-flex align-items-center justify-content-center" htmlFor="nomeFantasia"><b>Nome:</b></label>
                            <input
                                type="text"
                                id="nomeFantasia"
                                name="nomeFantasia"
                                value={cliente.nomeCob || ''} 
                                onChange={(e) => setCliente({ ...cliente, nomeCob: e.target.value })}
                                className="form-control"
                                placeholder="Observações"
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="d-flex align-items-center justify-content-center" htmlFor="nomeFantasia"><b>Link:</b></label>
                            <input
                                type="text"
                                id="nomeFantasia"
                                name="nomeFantasia"
                                value={cliente.cob || ''} 
                                onChange={(e) => setCliente({ ...cliente, cob: e.target.value })}
                                className="form-control"
                                placeholder="Observações"
                            />
                        </div>
                    
                    </div>
                    {mensagem.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{mensagem}</div> : null}
                    {sucesso === 'S' ? <Navigate to='/app/financeiromapsempresas' /> : null}
                </form>
            </div>
            )}
            <div className="voltar row">
                <Link onClick={() => navigate(-1)} className="btn btn-warning btn-acao">Voltar</Link>
                <Link to="/app/financeiromapsempresas" onClick={handleClick} type="button" className="btn btn-primary btn-acao">Salvar</Link>
            </div>
        </div>
    );
}

export default Comprovantes;