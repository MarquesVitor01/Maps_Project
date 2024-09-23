import React, { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import operadores from "./operador";
import "./relatoriovendas.css";
import { useParams } from 'react-router-dom';

const ITEMS_PER_PAGE = 4;

const RelatorioVendas = () => {
  const [rankingRenovacao, setRankingRenovacao] = useState([]);
  const [rankingBase, setRankingBase] = useState([]);
  const [podioRenovacao, setPodioRenovacao] = useState([]);
  const [podioBase, setPodioBase] = useState([]);
  const [currentPageRenovacao, setCurrentPageRenovacao] = useState(1);
  const [currentPageBase, setCurrentPageBase] = useState(1);
  const [totalVendasRenovacao, setTotalVendasRenovacao] = useState(0); // Total de vendas Renovação
  const [totalVendasBase, setTotalVendasBase] = useState(0); // Total de vendas Base
  const [totalVendasDia, setTotalVendasDia] = useState(0); 
  const [mensagem, setMensagem] = useState('');

  const db = getFirestore();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clienteDocRef = doc(db, 'clientes', id);
        const docSnapshot = await getDoc(clienteDocRef);
        if (!docSnapshot.exists()) {
          setMensagem('Cliente não encontrado');
        }
      } catch (error) {
        setMensagem('Erro ao obter dados do cliente');
      }
    };
    fetchData();
  }, [db, id]);

  useEffect(() => {
    const db = getFirestore();
    const clientesCollection = collection(db, "clientes");

    const unsubscribeClientes = onSnapshot(clientesCollection, async (querySnapshot) => {
      const clientesPorOperadorRenovacao = {};
      const clientesPorOperadorBase = {};
      const today = new Date().toISOString().split("T")[0];

      const promessas = querySnapshot.docs.map(async (docSnapshot) => {
        const cliente = docSnapshot.data();
        if (cliente.data === today) {
          const operadorOriginal = cliente.operador;
          const operadorLimpo = operadorOriginal.replace(/\s/g, "");

          const clienteDocRef = doc(db, 'clientes', docSnapshot.id);
          const clienteDoc = await getDoc(clienteDocRef);

          if (clienteDoc.exists()) {
            const modeloCliente = clienteDoc.data().modelo;

            if (modeloCliente === 'renovacao') {
              if (operadorLimpo in clientesPorOperadorRenovacao) {
                clientesPorOperadorRenovacao[operadorLimpo].vendas++;
              } else {
                clientesPorOperadorRenovacao[operadorLimpo] = {
                  vendas: 1,
                  fotoUrl: operadores[operadorLimpo] || "",
                  operadorOriginal,
                };
              }
            } else if (modeloCliente === 'base') {
              if (operadorLimpo in clientesPorOperadorBase) {
                clientesPorOperadorBase[operadorLimpo].vendas++;
              } else {
                clientesPorOperadorBase[operadorLimpo] = {
                  vendas: 1,
                  fotoUrl: operadores[operadorLimpo] || "",
                  operadorOriginal,
                };
              }
            }
          }
        }
      });

      await Promise.all(promessas);

      const rankingArrayRenovacao = Object.entries(clientesPorOperadorRenovacao).map(
        ([operador, dados]) => ({
          operador,
          vendas: dados.vendas,
          fotoUrl: dados.fotoUrl,
          operadorOriginal: dados.operadorOriginal,
        })
      );
      rankingArrayRenovacao.sort((a, b) => b.vendas - a.vendas);
      setRankingRenovacao(rankingArrayRenovacao);
      setPodioRenovacao(rankingArrayRenovacao.slice(0, 3));

      const rankingArrayBase = Object.entries(clientesPorOperadorBase).map(
        ([operador, dados]) => ({
          operador,
          vendas: dados.vendas,
          fotoUrl: dados.fotoUrl,
          operadorOriginal: dados.operadorOriginal,
        })
      );
      rankingArrayBase.sort((a, b) => b.vendas - a.vendas);
      setRankingBase(rankingArrayBase);
      setPodioBase(rankingArrayBase.slice(0, 3));

      const totalVendasRenovacao = rankingArrayRenovacao.reduce(
        (acumulador, item) => acumulador + item.vendas, 0
      );
      const totalVendasBase = rankingArrayBase.reduce(
        (acumulador, item) => acumulador + item.vendas, 0
      );

      setTotalVendasRenovacao(totalVendasRenovacao);
      setTotalVendasBase(totalVendasBase);
      setTotalVendasDia(totalVendasRenovacao + totalVendasBase);
    });

    return () => {
      unsubscribeClientes();
    };
  }, []);

  const totalPagesRenovacao = Math.ceil(rankingRenovacao.length / ITEMS_PER_PAGE);
  const totalPagesBase = Math.ceil(rankingBase.length / ITEMS_PER_PAGE);

  const getCurrentItemsRenovacao = () => {
    const startIndex = (currentPageRenovacao - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return rankingRenovacao.slice(startIndex, endIndex);
  };

  const getCurrentItemsBase = () => {
    const startIndex = (currentPageBase - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return rankingBase.slice(startIndex, endIndex);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <section className="dashboard">
      <div className="row bg-relatorio">
      <button className="voltar" onClick={handleGoBack}>
        <i className="fa-solid fa-arrow-left"></i>
      </button>

      <div className="podio renovacao">
        <h3>Vendas Renovação: {totalVendasRenovacao}</h3>
        {podioRenovacao.length >= 3 && (
          <div id="ranking-renovacao" className="podio-total">
            {podioRenovacao.map((item, index) => (
              <div key={index} className={`podio-item ${index === 0 ? 'ouro' : index === 1 ? 'prata' : 'bronze'}`}>
                <img src={item.fotoUrl} alt={`Lugar ${index + 1}`} className="img-podio" />
                <h1>{item.operadorOriginal}</h1>
                <h2>{item.vendas}</h2>
              </div>
            ))}
          </div>
        )}
        <ul className="tabela-ranking">
          {getCurrentItemsRenovacao().map(({ operador, vendas, fotoUrl }) => (
            <li key={operador}>
              <img src={fotoUrl} alt={operador} className="foto-ranking" />
              <span className="nome-operador">{operador}</span>
              <h2 className="vendas-operador">{vendas}</h2>
            </li>
          ))}
        </ul>

        <div className="pagination">
          <button onClick={() => setCurrentPageRenovacao((prev) => Math.max(prev - 1, 1))} disabled={currentPageRenovacao === 1}>
            <i className="fa-solid fa-arrow-left text-dark"></i>
          </button>
          <span>{`Página ${currentPageRenovacao} de ${totalPagesRenovacao}`}</span>
          <button onClick={() => setCurrentPageRenovacao((prev) => Math.min(prev + 1, totalPagesRenovacao))} disabled={currentPageRenovacao === totalPagesRenovacao}>
            <i className="fa-solid fa-arrow-right text-dark"></i>
          </button>
        </div>
      </div>

      <div className="podio base">
        <h3>Vendas Base: {totalVendasBase}</h3>
        {podioBase.length >= 3 && (
          <div id="ranking-base" className="podio-total">
            {podioBase.map((item, index) => (
              <div key={index} className={`podio-item ${index === 0 ? 'ouro' : index === 1 ? 'prata' : 'bronze'}`}>
                <img src={item.fotoUrl} alt={`Lugar ${index + 1}`} className="img-podio" />
                <h1>{item.operadorOriginal}</h1>
                <h2>{item.vendas}</h2>
              </div>
            ))}
          </div>
        )}
        <ul className="tabela-ranking">
          {getCurrentItemsBase().map(({ operador, vendas, fotoUrl }) => (
            <li key={operador}>
              <img src={fotoUrl} alt={operador} className="foto-ranking" />
              <span className="nome-operador">{operador}</span>
              <h2 className="vendas-operador">{vendas}</h2>
            </li>
          ))}
        </ul>

        <div className="pagination">
          <button onClick={() => setCurrentPageBase((prev) => Math.max(prev - 1, 1))} disabled={currentPageBase === 1}>
            <i className="fa-solid fa-arrow-left text-dark"></i>
          </button>
          <span>{`Página ${currentPageBase} de ${totalPagesBase}`}</span>
          <button onClick={() => setCurrentPageBase((prev) => Math.min(prev + 1, totalPagesBase))} disabled={currentPageBase === totalPagesBase}>
            <i className="fa-solid fa-arrow-right text-dark"></i>
          </button>
        </div>
      </div>

      <div className="total-vendas">
        <h3>Total de Vendas: {totalVendasDia}</h3>
      </div>
      </div>
    </section>
  );
};

export default RelatorioVendas;
