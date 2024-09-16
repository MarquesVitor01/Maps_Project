import React, { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import './relatoriovendas.css';

const RelatorioVendas = () => {
    const [clientesAdicionadosHoje, setClientesAdicionadosHoje] = useState(0);
    const [clientesPorOperador, setClientesPorOperador] = useState({});
    const [totalVendas, setTotalVendas] = useState(0);
    const [meta, setMeta] = useState(384);

    useEffect(() => {
        const db = getFirestore();
        const clientesCollection = collection(db, 'clientes');
    
        const unsubscribeClientes = onSnapshot(clientesCollection, async (querySnapshot) => {
            const today = new Date().toISOString().split('T')[0];
            let clientesHoje = 0;
            const clientesPorOperador = {};
    
            querySnapshot.forEach(doc => {
                const cliente = doc.data();
                if (cliente.data === today) {
                    clientesHoje++;
                    if (cliente.operador in clientesPorOperador) {
                        clientesPorOperador[cliente.operador]++;
                    } else {
                        clientesPorOperador[cliente.operador] = 1;
                    }
                }
            });
    
            setClientesAdicionadosHoje(clientesHoje);
            setClientesPorOperador(clientesPorOperador);
    
            const total = Object.values(clientesPorOperador).reduce((acc, cur) => acc + cur, 0);
            setTotalVendas(total);
    
            await atualizarTotalVendas(total);
    
            const novaMeta = 384 - total;
            setMeta(novaMeta);
        });
    
        const totalVendasRef = doc(db, 'total_vendas', 'total');
        const unsubscribeTotalVendas = onSnapshot(totalVendasRef, (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setTotalVendas(data.total);
            }
        });
    
        return () => {
            unsubscribeClientes();
            unsubscribeTotalVendas();
        };
    }, []);

    const atualizarTotalVendas = async (total) => {
        try {
            const db = getFirestore();
            const docRef = doc(db, 'total_vendas', 'total');
            await setDoc(docRef, { total, timestamp: serverTimestamp() }, { merge: true });
        } catch (error) {
            console.error('Erro ao atualizar total de vendas:', error);
        }
    };

    return (
        <div className="parte-fora">

            <div className="background-tela-venda row ">
                <div className="meia-tela">
                    <h2 className="bg-h1 font-weight-bold">VENDAS DO DIA: {clientesAdicionadosHoje}</h2>

                    {Object.entries(clientesPorOperador).map(([operador, quantidade]) => (
                        <p className="bg-p font-weight-bold" key={operador}>{operador}: {quantidade}</p>
                    ))}
                    <br />
                </div>
                {/* <div className="meia-tela">
                    <h2 className="bg-h1 font-weight-bold">TOTAL DE VENDAS: {totalVendas}</h2>

                    {Object.entries(clientesPorOperador).map(([operador, quantidade]) => (
                        <p className="bg-p font-weight-bold" key={operador + '_total'}>{operador}: {quantidade}</p>
                    ))}
                    <br />
                </div> */}

            </div>
            <div className="sss">
                <button className="btn-voltar08 btn btn-primary" onClick={() => window.history.back()}>Voltar</button>
            </div>
        </div>
    );
};

export default RelatorioVendas;