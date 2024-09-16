import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { collection, getFirestore, getDocs, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import 'firebase/firestore';
import './graficos.css';
import "animate.css/animate.min.css"; 
const Dashboard = () => {
  const [clientes, setClientes] = useState([]);
  const [totalPago, setTotalPago] = useState(0);
  const [totalNaoPago, setTotalNaoPago] = useState(0);
  const [clientesPagos, setClientesPagos] = useState(0);
  const [clientesNaoPagos, setClientesNaoPagos] = useState(0);
  const pieChartRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const q = query(collection(db, 'clientes'));
        const querySnapshot = await getDocs(q);
        const listaCli = [];
        let clientesPagosCount = 0;
        let clientesNaoPagosCount = 0;
        querySnapshot.forEach((doc) => {
          listaCli.push({
            id: doc.id,
            cpf: doc.data().cpf,
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
          });
          if (doc.data().simPago) {
            clientesPagosCount++;
          } else {
            clientesNaoPagosCount++;
          }
        });
        setClientes(listaCli);
        setClientesPagos(clientesPagosCount);
        setClientesNaoPagos(clientesNaoPagosCount);
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const pago = clientes.reduce((acc, cliente) => {
      return cliente.simPago ? acc + parseFloat(cliente.valor) : acc;
    }, 0);
    const naoPago = clientes.reduce((acc, cliente) => {
      return cliente.simPago ? acc : acc + parseFloat(cliente.valor);
    }, 0);
    setTotalPago(pago);
    setTotalNaoPago(naoPago);
    if (pieChartRef.current !== null) {
      pieChartRef.current.destroy();
    }
    const ctx = document.getElementById('pieChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Pago', 'Não Pago'],
        datasets: [{
          data: [pago, naoPago],
          backgroundColor: ['#36A2EB', '#FF6384'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
    pieChartRef.current = chart;
  }, [clientes]);
  return (
    <div className="dashboard-container">
      <div className="chart-container">
        <canvas id="pieChart"></canvas>
      </div>
      <div className="info">
        <p>Total Pago: {clientesPagos}, sendo equivalente a R${totalPago.toFixed(2)} pagos.</p>
        <p>Total Não Pago: {clientesNaoPagos}, sendo equivalente a R${totalNaoPago.toFixed(2)} não pago.</p>
        <p>Total de Clientes: {clientes.length}</p>
      </div>
      <div className="button-container">
        <Link to="/app/financeiromapsempresas" className="btn btn-warning btn-acao">Voltar</Link>
      </div>
    </div>
  )
};
export default Dashboard;