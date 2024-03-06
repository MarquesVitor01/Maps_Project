import React, { useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import '../Graficos/graficos.css';

const Dashboard = ({ clientes }) => {
    const [valorTotalTodasParcelasPagas, setValorTotalTodasParcelasPagas] = useState(0);

    useEffect(() => {
        const calcularValorTotalTodasParcelasPagas = () => {
            // Recuperar dados do localStorage
            const storedValues = localStorage.getItem('valoresPagos');
            if (storedValues) {
                const valoresPagos = JSON.parse(storedValues);
                // Calcular o valor total de todas as parcelas pagas
                let total = 0;
                Object.values(valoresPagos).forEach(cliente => {
                    Object.values(cliente).forEach(valor => {
                        total += valor;
                    });
                });
                setValorTotalTodasParcelasPagas(total);
            }
        };

        calcularValorTotalTodasParcelasPagas();
    }, []);

    const calcularSituacaoFinanceira = () => {
        const hoje = new Date();
        const totalClientes = clientes.length;  
        const clientesPagos = clientes.filter(cliente => cliente.pago);
        const valorTotalPagos = clientes.reduce((total, cliente) => {
            const valor = parseFloat(cliente.pago ? cliente.valor : 0);
            return isNaN(valor) ? total : total + valor;
        }, 0);
        const valorTotalAReceber = clientes.reduce((total, cliente) => {
            const valor = parseFloat(!cliente.pago ? cliente.valor : 0);
            const dataVencimento = new Date(cliente.venc2);
            if (!cliente.pago && dataVencimento >= hoje) {
                return isNaN(valor) ? total : total + valor;
            }
            return total;
        }, 0);
        const valorTotalInadimplente = clientes.reduce((total, cliente) => {
            const valor = parseFloat(!cliente.pago ? cliente.valor : 0);
            const dataVencimento = new Date(cliente.venc2);
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
            valorTotalTodasParcelasPagas: valorTotalTodasParcelasPagas.toFixed(2), // Nova propriedade
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
                    <p>Valor Pago: {situacaoFinanceira.valorTotalTodasParcelasPagas}</p>
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