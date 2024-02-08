import React from "react";
import { Doughnut } from 'react-chartjs-2';
import '../Graficos/graficos.css'
const Dashboard = ({ clientes, exibirPagos }) => {
    const calcularSituacaoFinanceira = () => {
      const hoje = new Date();
      const totalClientes = clientes.length;  
      const clientesPagos = clientes.filter(cliente => cliente.pago);
      const valorTotalPagos = clientes.reduce((total, cliente) => {
        const valor = parseFloat(cliente.pago ? cliente.valor : 0);
        return isNaN(valor) ? total : total + valor;
      }, 0);
      const valorTotalAReceber = clientes.reduce((total, cliente) => {
        const valor = parseFloat(!cliente.pago ? cliente.valor : 0); // Alterado para considerar apenas clientes não pagos
        const dataVencimento = new Date(cliente.venc2);
        // Se o cliente não está pago e a data de vencimento é posterior à data de hoje, consideramos a receber
        if (!cliente.pago && dataVencimento >= hoje) {
          return isNaN(valor) ? total : total + valor;
        }
        return total;
      }, 0);
      const valorTotalInadimplente = clientes.reduce((total, cliente) => {
        const valor = parseFloat(!cliente.pago ? cliente.valor : 0); // Alterado para considerar apenas clientes não pagos
        const dataVencimento = new Date(cliente.venc2);
        // Se o cliente não está pago e a data de vencimento é anterior à data de hoje, consideramos inadimplente
        if (!cliente.pago && dataVencimento < hoje) {
          return isNaN(valor) ? total : total + valor;
        }
        return total;
      }, 0);
      return {
        totalClientes,
        clientesPagos: clientesPagos.length,
        clientesNaoPagos: totalClientes - clientesPagos.length,
        valorTotalPagos: valorTotalPagos.toFixed(2),
        valorTotalAReceber: valorTotalAReceber.toFixed(2),
        valorTotalInadimplente: valorTotalInadimplente.toFixed(2),
      };
    };
  const situacaoFinanceira = calcularSituacaoFinanceira();
  const data = {
    labels: ['Pagos', 'Não Pagos'],
    datasets: [
      {
        data: [situacaoFinanceira.clientesPagos, situacaoFinanceira.clientesNaoPagos],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };
  return (
    <div>
      <h2>Situação Financeira - Resumo</h2>
      <div className="row valores">
      <div className="pagos font-weight-bold">
      <p>Valor a receber: {situacaoFinanceira.valorTotalAReceber}</p>
      </div>
        <div className="pagos font-weight-bold">
      <p>Valor Pago: {situacaoFinanceira.valorTotalPagos}</p>
      </div>
      <div className="pagos font-weight-bold">
      <p>Valor Inadimplente: {situacaoFinanceira.valorTotalInadimplente}</p>
      </div>
      </div>
      <div style={{ width: '70%', margin: 'auto' }} className="doug">
        <Doughnut data={data} />
      </div>
    </div>
  );
};
export default Dashboard;