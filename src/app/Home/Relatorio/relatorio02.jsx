import React, { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot, query, doc, setDoc, serverTimestamp, getDoc, getDocs } from 'firebase/firestore';
import './relatoriovendas.css';

const Relatorio02 = () => {
    const [clientesAdicionadosHoje, setClientesAdicionadosHoje] = useState(0);
    const [clientesPorOperador, setClientesPorOperador] = useState({});
    const [totalVendasDiarias, setTotalVendasDiarias] = useState(0);
    const [totalVendas, setTotalVendas] = useState(0);
    const [meta, setMeta] = useState(384);
    const [todasAsVendas, setTodasAsVendas] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getFirestore();
                const querySnapshot = await getDocs(collection(db, 'clientes'));
                const startDate = new Date('2024-05-15').toISOString().split('T')[0];
                const today = new Date().toISOString().split('T')[0];
                
                let clientesHoje = 0;
                const clientesPorOperadorDiario = {};
                const todasAsVendas = {};
                let totalDesdeData = 0;
        
                querySnapshot.forEach(doc => {
                    const cliente = doc.data();
                    todasAsVendas[cliente.operador] = (todasAsVendas[cliente.operador] || 0) + 1;
                    
                    if (cliente.data >= startDate) {
                        totalDesdeData++;
                    }
                    if (cliente.data === today) {
                        clientesHoje++;
                        if (cliente.operador in clientesPorOperadorDiario) {
                            clientesPorOperadorDiario[cliente.operador]++;
                        } else {
                            clientesPorOperadorDiario[cliente.operador] = 1;
                        }
                    }
                });
        
                setClientesAdicionadosHoje(clientesHoje);
                setClientesPorOperador(clientesPorOperadorDiario);
                setTotalVendas(totalDesdeData);
        
                await atualizarTotalVendas(totalDesdeData);
        
                const novaMeta = 384 - totalDesdeData;
                setMeta(novaMeta);
        
            } catch (error) {
                console.error('Erro ao obter dados:', error);
            }
        };
        
        fetchData();

        const db = getFirestore();
        const q = query(collection(db, 'clientes'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const today = new Date().toISOString().split('T')[0];
            let clientesHoje = 0;
            snapshot.forEach((doc) => {
                const cliente = doc.data();
                if (cliente.data === today) {
                    clientesHoje++;
                }
            });
            setClientesAdicionadosHoje(clientesHoje);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const getTotalVendasFromDatabase = async () => {
        try {
            const db = getFirestore();
            const docRef = doc(db, 'total_vendas', 'total');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data().total || 0;
            }
            return 0;
        } catch (error) {
            console.error('Erro ao obter total de vendas do banco de dados:', error);
            return 0;
        }
    };

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
        <div className="bg-principal align-middle text-center">
            <div className="text-parte-fora">
                <h2 className="bg-h2 font-weight-bold">META DE VENDAS: 384 </h2>
                <h2 className="bg-h2 font-weight-bold">AINDA FALTAM: {meta} </h2>
                <h2 className="bg-h2 font-weight-bold">VENDAS FEITAS: {totalVendas} </h2>
                <div>
                    <button className="btn-voltar07 btn btn-danger" onClick={() => window.history.back()}>Voltar</button>
                </div>
            </div>
        </div>
    );
};

export default Relatorio02;