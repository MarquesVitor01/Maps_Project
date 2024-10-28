import React, { useState, useEffect, useRef } from "react";
import Navbar2 from "../../Componentes/Navbar/navbar2";
import ListaCliente2 from "../../Listas/listapagos";
import './financeiro.css';
import Dashboard from "../../Componentes/Graficos/graficos";
import { collection, getFirestore, getDocs, query, where } from 'firebase/firestore';
import 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useReactToPrint } from "react-to-print";
import 'chart.js/auto';

function Pagos() {
  const [loader, setLoader] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState('');
  const [texto, setTexto] = useState('');
  const [loading, setLoading] = useState(true);
  const [exibirPagos, setExibirPagos] = useState(false);
  const [totalValor, setTotalValor] = useState(0);
  const [error, setError] = useState(null);
  const [cobradoresInfo, setCobradoresInfo] = useState({});
  const auth = getAuth();
  const user = auth.currentUser;
  const [pagamentosPorDia, setPagamentosPorDia] = useState({});
  const [pagamentosPorMes, setPagamentosPorMes] = useState({});
  const [pagamentosPorAno, setPagamentosPorAno] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        const db = getFirestore();
        const clientesRef = collection(db, 'clientes');
        const q = query(clientesRef);
        const snapshot = await getDocs(q);
        const listaCli = snapshot.docs.map(doc => ({
          id: doc.id,
          cpf: doc.data().cpf,
          cnpj: doc.data().cnpj,
          nome: doc.data().nome,
          email: doc.data().email,
          uf: doc.data().uf,
          fone: doc.data().fone,
          valor: doc.data().valor,
          venc2: doc.data().venc2,
          pago: doc.data().pago || false,
          cobrador: doc.data().cobrador || 'Sem cobrança',
          data: doc.data().data,
          parcelas: doc.data().parcelas,
          encaminharClienteFinanceiro: doc.data().encaminharClienteFinanceiro,
          simPago: doc.data().simPago,
          dataPagamento: doc.data().dataPagamento,
          cnpj: doc.data().cnpj
        }));
        const clientesPagos = listaCli.filter(cliente => cliente.pago);
        const info = {};
        const pagamentosPorDia = {};
        const pagamentosPorMes = {};
        const pagamentosPorAno = {};
        clientesPagos.forEach(cliente => {
          if (!info[cliente.cobrador]) {
            info[cliente.cobrador] = {
              quantidade: 0,
              valorTotal: 0
            };
          }
          info[cliente.cobrador].quantidade++;
          info[cliente.cobrador].valorTotal += parseFloat(cliente.valor);
          const dataPagamento = new Date(cliente.data);
          const dia = dataPagamento.getDate();
          const chaveDia = `${dia}/${dataPagamento.getMonth() + 1}/${dataPagamento.getFullYear()}`;
          if (!pagamentosPorDia[chaveDia]) {
            pagamentosPorDia[chaveDia] = 0;
          }
          pagamentosPorDia[chaveDia]++;
          const chaveMes = `${dataPagamento.getMonth() + 1}/${dataPagamento.getFullYear()}`;
          if (!pagamentosPorMes[chaveMes]) {
            pagamentosPorMes[chaveMes] = 0;
          }
          pagamentosPorMes[chaveMes]++;
          const chaveAno = `${dataPagamento.getFullYear()}`;
          if (!pagamentosPorAno[chaveAno]) {
            pagamentosPorAno[chaveAno] = 0;
          }
          pagamentosPorAno[chaveAno]++;
        });
        setCobradoresInfo(info);
        setPagamentosPorDia(pagamentosPorDia);
        setPagamentosPorMes(pagamentosPorMes);
        setPagamentosPorAno(pagamentosPorAno);
        const totalValor = clientesPagos.reduce((total, cliente) => total + parseFloat(cliente.valor), 0);
        setTotalValor(totalValor);
        setClientes(listaCli);
        localStorage.setItem('clientes', JSON.stringify(listaCli));
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      }
    };
    fetchData();
  }, [busca]);
  useEffect(() => {
    const storedClientes = localStorage.getItem('clientes');
    if (storedClientes) {
      setClientes(JSON.parse(storedClientes));
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    setShowDashboard(false);
  }, []);
  const handleExibirPagos = () => {
    setExibirPagos(!exibirPagos);
  };
  const [showDashboard, setShowDashboard] = useState(false);
  const handleShowDashboard = () => {
    setShowDashboard(!showDashboard);
  };
  const [showConcluidos, setShowConcluidos] = useState(false);
  const [quantidadeClientes, setQuantidadeClientes] = useState(0);

  useEffect(() => {
    const storedClientes = localStorage.getItem('clientes');
    if (storedClientes) {
      setQuantidadeClientes(JSON.parse(storedClientes).length);
      setClientes(JSON.parse(storedClientes));
      setLoading(false);
    }
    const fetchData = async () => {
      try {
        const db = getFirestore();
        let q;
        if (showConcluidos) {
          q = query(collection(db, 'clientes'), where('simPago', '==', true));
        } else {
          q = query(collection(db, 'clientes'));
        }
        if (q) {
          const querySnapshot = await getDocs(q);
          const listaCli = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data(); // Obtenha os dados do documento

            if (data) { // Verifique se os dados existem
              const lowercaseBusca = busca.toLowerCase();
              const lowercaseNome = (data.nome || '').toLowerCase(); // Verifique e converta para minúsculas
              const lowercaseEmail = (data.email || '').toLowerCase();
              const lowercaseCPF = (data.cpf || '').toLowerCase();
              const lowercaseCNPJ = (data.cnpj || '').toLowerCase();
              const lowercaseRazao = (data.razao || '').toLowerCase();
            if (
              lowercaseNome.indexOf(lowercaseBusca) >= 0 ||
              lowercaseEmail.indexOf(lowercaseBusca) >= 0 ||
              lowercaseCPF.indexOf(lowercaseBusca) >= 0 ||
              lowercaseCNPJ.indexOf(lowercaseBusca) >= 0 ||
              lowercaseRazao.indexOf(lowercaseBusca) >= 0
            ) {
              listaCli.push({
                id: doc.id,
                cpf: doc.data().cpf,
          cnpj: doc.data().cnpj,
          nome: doc.data().nome,
                email: doc.data().email,
                uf: doc.data().uf,
                fone: doc.data().fone,
                valor: doc.data().valor,
                data: doc.data().data,
                venc2: doc.data().venc2,
                cobrador: doc.data().cobrador,
                parcelas: doc.data().parcelas,
                encaminharClienteFinanceiro: doc.data().encaminharClienteFinanceiro,
                simPago: doc.data().simPago,
                dataPagamento: doc.data().dataPagamento,
                operador: doc.data().operador,
                simPago: doc.data().simPago,
                cnpj: doc.data().cnpj
              });
            }
          }});
          const info = {};
          listaCli.forEach(cliente => {
            if (!info[cliente.cobrador]) {
              info[cliente.cobrador] = {
                quantidade: 0,
                valorTotal: 0
              };
            }
            info[cliente.cobrador].quantidade++;
            info[cliente.cobrador].valorTotal += parseFloat(cliente.valor);
          });
          setCobradoresInfo(info);
          setClientes(listaCli);
          setQuantidadeClientes(listaCli.length);

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
  }, [busca, showConcluidos, user]);
  
  useEffect(() => {
    const storedClientes = localStorage.getItem('clientes');
    if (storedClientes) {
        setClientes(JSON.parse(storedClientes));
        setQuantidadeClientes(JSON.parse(storedClientes).length);
        setLoading(false);
    }
}, []);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const contentDocument = useRef();
  const handlePrint = useReactToPrint({
    content: () => contentDocument.current,
  });
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setBusca(texto);
    }
  };
  const handleShowConcluidos = () => {
    setShowConcluidos(!showConcluidos);
  };
  function formatarData(data) {
    if (typeof data === 'string' && data.includes('-')) {
      const partes = data.split('-');
      return `${partes[2]}-${partes[1]}-${partes[0]}`;
    } else {
      return 'Data inválida';
    }
  }
  const handleDownloadXML = () => {
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
      <clientes>
        ${clientes.map(cliente => `
          <cliente>
            <cpf>${cliente.cpf}</cpf>
            <telefone>${cliente.fone}</telefone>
            <operador>${cliente.operador}</operador>
            <valor>${cliente.valor}</valor>
            <data>${formatarData(cliente.data)}</data>
            <vencimento>${formatarData(cliente.venc2)}</vencimento>
            <cobrador>${cliente.cobrador}</cobrador>
            <pago>${cliente.simPago ? 'Sim' : 'Não'}</pago>
            <dataPagamento>${formatarData(cliente.dataPagamento)}</dataPagamento>
          </cliente>
        `).join('')}
      </clientes>`;
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'relatório.xml';
    link.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div>
      <Navbar2 />
      <div className="container-fluid titulo">
        <div className="row lista-vendas">
          <h1><b>FINANCEIRO</b></h1>
          <div className="col-5 pesquisa">
            <div className="input-group mb-3 ">
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
            <button onClick={handleShowConcluidos} className="btn  btn-new2 btn-success" type="button" id="button-addon2">
                <i className="fa-solid fa-dollar-sign"></i> {showConcluidos ? 'TODOS' : 'PAGOS'}
              </button>
              <a href="/app/financeirodash">
                <button className="btn  btn-new2 btn-warning" type="button">
                <i className="fa-solid fa-chart-pie"></i>                </button>
              </a>
              <button onClick={handleDownloadXML} className="btn  btn-new2 btn-danger" type="button" id="button-addon2">
              <i className="fa-solid fa-file-pdf"></i>
              </button>
              <a href="/app/home/novocob">
                <button className="btn  btn-new2 btn-primary" type="button">
                  <i className="fa-solid fa-plus"></i>
                </button>
              </a>
            </div>
            <div className="row exibicao5">
              <h4 >
                <i className="fa-solid fa-user "></i><b> CLIENTES: {quantidadeClientes}</b>
              </h4>
            </div>
          </div>
        </div>
      </div>

          <div className="background7">
            <div className="container-fluid titulo">
              {showDashboard ? (
                <>
                  <Dashboard clientes={clientes} exibirPagos={exibirPagos} totalValor={totalValor} />
                </>
              ) : (
                <ListaCliente2 arrayClientes={clientes} exibirPagos={exibirPagos} />
              )}
            </div>
          </div>
        </div>

  );
}

export default Pagos;