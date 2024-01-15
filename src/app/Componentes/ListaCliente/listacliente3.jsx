import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { createRoot } from 'react-dom/client';

function ListaCliente3(props) {
    const [pagoStatus, setPagoStatus] = useState(() => {
        const storedStatus = localStorage.getItem('pagoStatus');
        return storedStatus ? JSON.parse(storedStatus) : {};
    });

    const [paymentDates, setPaymentDates] = useState(() => {
        const storedDates = localStorage.getItem('paymentDates');
        return storedDates ? JSON.parse(storedDates) : {};
    });



    const [acordoStatus, setAcordoStatus] = useState(() => {
        const storedStatus = localStorage.getItem('acordoStatus');
        return storedStatus ? JSON.parse(storedStatus) : {};
    });

    const [acordoDates, setAcordoDates] = useState(() => {
        const storedDates = localStorage.getItem('acordoDates');
        return storedDates ? JSON.parse(storedDates) : {};
    });

    useEffect(() => {
        const fetchPagoStatus = async () => {
            const db = getFirestore();

            for (const cliente of props.arrayClientes) {
                const clienteRef = doc(db, 'clientes', cliente.id);
                const clienteDoc = await getDoc(clienteRef);

                if (clienteDoc.exists()) {
                    const data = clienteDoc.data();
                    setPagoStatus((prevStatus) => ({
                        ...prevStatus,
                        [cliente.id]: data.pago || false,
                    }));
                }
            }
        };

        fetchPagoStatus();
    }, [props.arrayClientes]);

    useEffect(() => {
        const fetchAcordoStatus = async () => {
            const db = getFirestore();

            for (const cliente of props.arrayClientes) {
                const clienteRef = doc(db, 'clientes', cliente.id);
                const clienteDoc = await getDoc(clienteRef);

                if (clienteDoc.exists()) {
                    const data = clienteDoc.data();
                    setAcordoStatus((prevStatus) => ({
                        ...prevStatus,
                        [cliente.id]: data.acordo || false,
                    }));
                }
            }
        };

        fetchAcordoStatus();
    }, [props.arrayClientes]);


    const handlePagoChange = async (clienteId, newValue) => {
        const currentDate = new Date().toISOString();
        const newData = newValue ? { pago: true, dataPagamento: currentDate } : { pago: false, dataPagamento: null };

        Swal.fire({
            title: 'Confirmação',
            text: `O valor em aberto ${newValue ? 'está pago' : 'não está pago'}? Clique aqui para ${newValue ? 'marcar' : 'desmarcar'}!`,
            icon: 'question',
            showCancelButton: false,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        }).then(async (result) => {
            if (result.isConfirmed) {
                setPagoStatus((prevStatus) => ({ ...prevStatus, [clienteId]: newValue }));
                setPaymentDates((prevDates) => ({ ...prevDates, [clienteId]: currentDate }));

                const db = getFirestore();
                const clienteRef = doc(db, 'clientes', clienteId);
                await updateDoc(clienteRef, newData);

                // Save the payment dates to localStorage
                localStorage.setItem('paymentDates', JSON.stringify({ ...paymentDates, [clienteId]: currentDate }));

                console.log(`Status pago para o cliente ID ${clienteId} atualizado para ${newValue}`);
            } else {
                setPagoStatus((prevStatus) => ({ ...prevStatus, [clienteId]: false }));
                setPaymentDates((prevDates) => ({ ...prevDates, [clienteId]: null }));
                localStorage.setItem('paymentDates', JSON.stringify({ ...paymentDates, [clienteId]: null }));

                console.log(`Status pago para o cliente ID ${clienteId} atualizado para ${newValue}`);
            }
        });
    };

    const [selectedDate, setSelectedDate] = useState(null);

    const chooseDateManually = async () => {
        return new Promise((resolve) => {
          // Open a modal or use a prompt to get user input for the date
          Swal.fire({
            title: 'Escolha uma data para acordo',
            html: '<div id="datepicker-container"></div>',
            showCancelButton: false,
            confirmButtonText: 'Confirm',
            preConfirm: () => {
              // Return the selected date
              const selectedDate = document.getElementById('datepicker-container').value;
              resolve(selectedDate);
            },
            didOpen: () => {
              // Render the date picker in the modal
              const container = document.getElementById('datepicker-container');
              const root = createRoot(container);
              root.render(
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                />
              );
            },
          });
        });
      };

      useEffect(() => {
        const fetchAcordoStatus = async () => {
            const db = getFirestore();
            const storedAcordoDates = {};

            for (const cliente of props.arrayClientes) {
                const clienteRef = doc(db, 'clientes', cliente.id);
                const clienteDoc = await getDoc(clienteRef);

                if (clienteDoc.exists()) {
                    const data = clienteDoc.data();
                    setAcordoStatus((prevStatus) => ({
                        ...prevStatus,
                        [cliente.id]: data.acordo || false,
                    }));

                    // Fetch agreement dates from local storage
                    const storedDate = localStorage.getItem(`acordoDates_${cliente.id}`);
                    storedAcordoDates[cliente.id] = storedDate ? JSON.parse(storedDate) : null;
                }
            }

            // Set the accumulated agreement dates in state
            setAcordoDates(storedAcordoDates);
        };

        fetchAcordoStatus();
    }, [props.arrayClientes]);

      const handleAcordoChange = async (clienteId, newValue) => {
        const currentDate = new Date().toISOString();
        const newData = newValue
            ? { acordo: true, dataAcordo: currentDate }
            : { acordo: false, dataAcordo: null };
    
        Swal.fire({
            title: 'Confirmação',
            text: `Uma nova data para pagamento ${
                newValue ? 'foi acordada' : 'não foi acordada'
            }? Clique aqui para ${newValue ? 'marcar' : 'desmarcar'}!`,
            icon: 'question',
            showCancelButton: false,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        }).then(async (result) => {
            if (result.isConfirmed) {
                setAcordoStatus((prevStatus) => ({ ...prevStatus, [clienteId]: newValue }));
    
                if (newValue) {
                    // Open a date picker to manually choose the date
                    const selectedDate = await chooseDateManually();
                    setAcordoDates((prevDates) => ({ ...prevDates, [clienteId]: selectedDate || currentDate }));
                    newData.dataAcordo = selectedDate || currentDate;
    
                    // Save the agreement date to localStorage with a key including the clienteId
                    localStorage.setItem(`acordoDates_${clienteId}`, JSON.stringify(newData.dataAcordo));
                    console.log(`Saved acordo date for cliente ID ${clienteId}: ${newData.dataAcordo}`);
                } else {
                    setAcordoDates((prevDates) => ({ ...prevDates, [clienteId]: null }));
                    // Remove the agreement date from localStorage when newValue is false
                    localStorage.removeItem(`acordoDates_${clienteId}`);
                }
    
                const db = getFirestore();
                const clienteRef = doc(db, 'clientes', clienteId);
                await updateDoc(clienteRef, newData);
    
                console.log(`Status pago para o cliente ID ${clienteId} atualizado para ${newValue}`);
            } else {
                setAcordoStatus((prevStatus) => ({ ...prevStatus, [clienteId]: false }));
                setAcordoDates((prevDates) => ({ ...prevDates, [clienteId]: null }));
                // Remove the agreement date from localStorage if the user clicks 'Não'
                localStorage.removeItem(`acordoDates_${clienteId}`);
    
                console.log(`Status pago para o cliente ID ${clienteId} atualizado para ${newValue}`);
            }
        });
    };
     
    
    return (
        <table className="table table-hover table-bordered">
            <thead>
                <tr className="table-secondary">
                    <th scope="col">CNPJ/CPF</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Email</th>
                    <th scope="col">UF</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Vencimento</th>
                    <th scope="col">Acordo</th>
                    <th scope="col">Data do acordo</th>
                    <th scope="col">Pago</th>
                    <th scope="col">Data de Pagamento</th>
                </tr>
            </thead>
            <tbody>
                {props.arrayClientes.map((cliente) => {
                    const isPago = pagoStatus[cliente.id] || false;
                    const paymentDate = paymentDates[cliente.id] || null;

                    const isAcordo = acordoStatus[cliente.id] || false;
                    const acordoDate = acordoDates[cliente.id] || null;
                    // Se exibirPagos for verdadeiro e o cliente não estiver pago, pula para o próximo cliente
                    if (props.exibirPagos && !isPago) {
                        return null;
                    }

                    return (
                        <tr key={cliente.id} className="table-light">
                            <th scope="row">
                                <Link to={`/app/home/fichacliente/${cliente.id}`} className="fa-solid fa-list icone-acao1"></Link>
                                {cliente.cpf}
                            </th>
                            <td>{cliente.nome}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.uf}</td>
                            <td>{cliente.fone}</td>
                            <td>{cliente.valor}</td>
                            <td>{cliente.venc2}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={isAcordo}
                                    onChange={(e) => handleAcordoChange(cliente.id, e.target.checked)}
                                />
                            </td>
                            <td>
         <button onClick={chooseDateManually}  >Selecione do Acordo</button>

                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={isPago}
                                    onChange={(e) => handlePagoChange(cliente.id, e.target.checked)}
                                />
                            </td>
                            <td>
                                {isPago ? (
                                    <DatePicker
                                        selected={paymentDate ? new Date(paymentDate) : null}
                                        dateFormat="dd/MM/yyyy"
                                        onChange={(date) => {
                                            // Handle the date change (if needed)
                                        }}
                                        readOnly
                                    />
                                ) : null}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default ListaCliente3;