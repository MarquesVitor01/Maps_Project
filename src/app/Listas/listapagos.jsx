import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import './listacliente.css';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';

function ListaPagos(props) {
  const [filtroDataVenda, setFiltroDataVenda] = useState(""); // Estado para armazenar a data de filtro
  const [pagoStatus, setPagoStatus] = useState(() => {
    const storedStatus = localStorage.getItem('pagoStatus');
    return storedStatus ? JSON.parse(storedStatus) : {};
  });
  const [paymentDates, setPaymentDates] = useState(() => {
    const storedDates = localStorage.getItem('paymentDates');
    return storedDates ? JSON.parse(storedDates) : {};
  });
  const [valoresPagos, setValoresPagos] = useState(() => {
    const storedValues = localStorage.getItem('valoresPagos');
    return storedValues ? JSON.parse(storedValues) : {};
  });

  useEffect(() => {
    localStorage.setItem('pagoStatus', JSON.stringify(pagoStatus));
    localStorage.setItem('paymentDates', JSON.stringify(paymentDates));
    localStorage.setItem('valoresPagos', JSON.stringify(valoresPagos));
  }, [pagoStatus, paymentDates, valoresPagos]);

  const fetchPagoStatus = async () => {
    const db = getFirestore();
    for (const cliente of props.arrayClientes) {
      const clienteRef = doc(db, 'clientes', cliente.id);
      const clienteDoc = await getDoc(clienteRef);
      if (clienteDoc.exists()) {
        const data = clienteDoc.data();
        setPagoStatus((prevStatus) => ({
          ...prevStatus,
          [cliente.id]: data.pago || [],
        }));
        setPaymentDates((prevDates) => ({
          ...prevDates,
          [cliente.id]: data.paymentDates || [],
        }));
      }
    }
  };

  const handlePagoChange = async (clienteId, parcelaIndex, newValue) => {
    const currentDate = new Date().toLocaleString('pt-BR', { timeZone: 'UTC' });
    const newData = newValue
      ? { pago: true, dataPagamento: (paymentDates[clienteId] && paymentDates[clienteId][parcelaIndex]) || currentDate }
      : { pago: false, dataPagamento: null };

    const { value: selectedDate } = await Swal.fire({
      title: 'Selecione a Data de Pagamento',
      html: '<input type="date" id="datepicker" class="swal2-input">',
      preConfirm: () => {
        const selectedDate = document.getElementById('datepicker').value;
        return selectedDate;
      }
    });

    if (selectedDate) {
      newData.dataPagamento = new Date(selectedDate).toISOString();
    }

    Swal.fire({
      title: 'Confirmação',
      text: `O valor em aberto ${newValue ? 'está pago' : 'não está pago'}? Clique aqui para ${newValue ? 'marcar' : 'desmarcar'}!`,
      icon: 'question',
      showCancelButton: false,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setPagoStatus((prevStatus) => ({
          ...prevStatus,
          [clienteId]: {
            ...prevStatus[clienteId],
            [parcelaIndex]: newValue,
          }
        }));
        setPaymentDates((prevDates) => ({
          ...prevDates,
          [clienteId]: {
            ...prevDates[clienteId],
            [parcelaIndex]: newData.dataPagamento,
          }
        }));
        // Atualize o estado dos valores pagos
        setValoresPagos(prevValues => {
          const novoValor = parseFloat(props.arrayClientes.find(cliente => cliente.id === clienteId).valor) || 0;
          const novosValores = { ...prevValues };
          if (!novosValores[clienteId]) {
            novosValores[clienteId] = {};
          }
          novosValores[clienteId][parcelaIndex] = newValue ? novoValor : 0;
          return novosValores;
        });
        const db = getFirestore();
        const clienteRef = doc(db, 'clientes', clienteId);
        await updateDoc(clienteRef, newData);
        console.log(`Status pago para o cliente ID ${clienteId}, parcela ${parcelaIndex} atualizado para ${newValue}`);
      }
    });
  };

  // Função para calcular o valor total
  const calcularValorTotal = () => {
    let total = 0;
    Object.values(valoresPagos).forEach(cliente => {
      Object.values(cliente).forEach(valor => {
        total += valor;
      });
    });
    return total;
  };

  return (
    <div>
      <input
        type="date"
        value={filtroDataVenda}
        onChange={(e) => setFiltroDataVenda(e.target.value)}
        className="form-control date"
      />
      <table className="table table-hover table-bordered">
        <thead>
          <tr className="table-secondary">
            <th scope="col" className="col-acao text-center" >CNPJ/CPF</th>
            <th scope="col" className="col-acao text-center">Nome</th>
            <th scope="col" className="col-acao text-center">Email</th>
            <th scope="col" className="col-acao text-center">UF</th>
            <th scope="col" className="col-acao text-center">Telefone</th>
            <th scope="col" className="col-acao text-center">Valor</th>
            <th scope="col" className="col-acao text-center">Cobrança</th>
            <th scope="col" className="col-acao text-center">Vencimento</th>
            <th scope="col" className="col-acao text-center">Parcelas</th>
            <th scope="col" className="col-acao text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.arrayClientes.filter((cliente) => {
            const parcelas = parseInt(cliente.parcelas) || 0;
            return (!filtroDataVenda || cliente.venc2 >= filtroDataVenda) || (cliente.venc2 >= filtroDataVenda && (props.exibirPagos ? parcelas > 0 : (Array.isArray(pagoStatus[cliente.id]) && pagoStatus[cliente.id].some(Boolean))));
          }).map((cliente) => {
            const parcelas = parseInt(cliente.parcelas) || 0;
            if (props.exibirPagos && parcelas === 0) {
              return null;
            }
            return (
              <tr key={cliente.id} className="table-light">
                <th scope="row">
                  <Link to={`/app/home/fichacliente/${cliente.id}`} className="fa-solid fa-list icone-acao1"></Link>
                  {cliente.cpf}
                </th>
                <td className="align-middle">{cliente.nome}</td>
                <td className="align-middle">{cliente.email}</td>
                <td className="align-middle">{cliente.uf}</td>
                <td className="align-middle">{cliente.fone}</td>
                <td className="align-middle">{cliente.valor}</td>
                <td className="align-middle">{cliente.cobrador || 'Sem cobrança'}</td>
                <td className="align-middle">{cliente.venc2}</td>
                <td className="align-middle">{cliente.parcelas}</td>
                <td>
                  {[...Array(parcelas)].map((_, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        checked={(pagoStatus[cliente.id] && pagoStatus[cliente.id][index]) || false}
                        onChange={(e) => handlePagoChange(cliente.id, index, e.target.checked)}
                      />
                      <DatePicker
                        selected={(paymentDates[cliente.id] && paymentDates[cliente.id][index]) ? new Date(paymentDates[cliente.id][index]).setDate(new Date(paymentDates[cliente.id][index]).getDate() + 1) : null}
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => {
                          // Nada a fazer aqui, apenas para exibição da data
                        }}
                      />
                    </div>
                  ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListaPagos;