import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
function ListaCliente3(props) {

    const [additionalInfo, setAdditionalInfo] = useState(() => {
        const storedInfo = localStorage.getItem('additionalInfo');
        return storedInfo ? JSON.parse(storedInfo) : {};
    });
    const deleteInfo = (clienteId) => {
        Swal.fire({
            title: 'Tem certeza que deseja excluir informações?',
            html: `
                <input type="password" id="senha-exclusao" class="swal2-input" placeholder="Senha de Exclusão">
            `,
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        }).then((result) => {
            if (result.isConfirmed) {
                const senhaDigitada = document.getElementById('senha-exclusao').value;
                const senhaCorreta = '@1V?$9En9o#1qa';

                if (senhaDigitada === senhaCorreta) {
                    setAdditionalInfo((prevInfo) => {
                        const updatedInfo = { ...prevInfo };
                        delete updatedInfo[clienteId];
                        return updatedInfo;
                    });
                    localStorage.setItem('additionalInfo', JSON.stringify({ ...additionalInfo, [clienteId]: null }));
                    Swal.fire('Informações excluídas!', '', 'success');
                } else {
                    Swal.fire('Senha incorreta!', 'Você não tem permissão para excluir informações.', 'error');
                }
            }
        });
    };
    const addInfoManually = async (clienteId) => {
        const result = await Swal.fire({
            title: 'Adicionar Informações',
            html: `
                <input type="text" id="info-input" class="swal2-input" placeholder="Informações">
                <input type="text" id="name-input" class="swal2-input" placeholder="Seu Nome">
            `,
            showCancelButton: true,
            confirmButtonText: 'Adicionar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const infoInput = document.getElementById('info-input').value;
                const nameInput = document.getElementById('name-input').value;
                return { info: infoInput, name: nameInput };
            },
        });
        if (result.isConfirmed) {
            const { info, name } = result.value;
            if (!info || !name) {
                Swal.fire({
                    icon: 'error',
                    title: 'Preencha todas as informações',
                    text: 'Você precisa fornecer tanto as informações quanto o seu nome.',
                });
                return;
            }
            setAdditionalInfo((prevInfo) => ({ ...prevInfo, [clienteId]: { info, name } }));
            localStorage.setItem('additionalInfo', JSON.stringify({ ...additionalInfo, [clienteId]: { info, name } }));
        }
    };

    const sortedClientes = props.arrayClientes.sort((b, a) => new Date(b.venc2) - new Date(a.venc2));
    // const formatarData = (venc2) => {
    //     const partes = venc2.split("-");
    //     return `${partes[2]}/${partes[1]}/${partes[0]}`;
    // };
    const [filtroDataVenda, setFiltroDataVenda] = useState(""); // Estado para armazenar a data de filtro
    function formatarData(data) {
        if (typeof data === 'string' && data.includes('-')) {
          const partes = data.split('-');
          console.log(partes); // Adicionando este console.log para depurar
          return `${partes[2]}-${partes[1]}-${partes[0]}`;
        } else {
          console.log('Data inválida:', data); // Adicionando este console.log para depurar
          return 'Data inválida';
        }
      }
    return (<>
    <div className="row divAss">
      <div className="divDate">
          <p className="text-center">DATA DA VENDA:</p>
          <input
            type="date"
            value={filtroDataVenda}
            onChange={(e) => setFiltroDataVenda(e.target.value)}
            className="form-control date date-config"
          />
        </div>
      </div>
        <table className="table table-hover table-bordered">
            <thead>
                <tr className="table-primari text-light">
                    <th scope="col" className="text-center col-acao">CNPJ/CPF</th>
                    <th scope="col" className="text-center col-acao">NOME</th>
                    <th scope="col" className="text-center col-acao">E-MAIL</th>
                    <th scope="col" className="text-center col-acao">UF</th>
                    <th scope="col" className="text-center col-acao">TELEFONE</th>
                    <th scope="col" className="text-center col-acao">VALOR</th>
                    <th scope="col" className="text-center col-acao">VENCIMENTO</th>
                    <th scope="col" className="col-acao text-center">PAGAMENTO</th>
                    <th scope="col" className="text-center col-acao">ACORDO</th>

                </tr>
            </thead>
            <tbody>
                {sortedClientes.filter((cliente) => !filtroDataVenda || cliente.venc2 == filtroDataVenda).map((cliente) => {
                    const additionalInfoData = additionalInfo[cliente.id] || {};
                    const vencimento = new Date(cliente.venc2);
                    const hoje = new Date();
                    const isVencimentoPassado = vencimento < hoje;
                    const isSimPagoFalso = !cliente.simPago;

                    if (isVencimentoPassado && isSimPagoFalso) {
                        return (
                            <tr key={cliente.id} className="table-light" >
                                <th scope="row" className="align-middle">
                                    <Link to={`/app/home/fichacliente/${cliente.id}`}><i className="fa-solid fa-list icone-acao1"></i></Link>
                                    {cliente.cpf}
                                </th>
                                <td className="align-middle text-center">{cliente.nome || 'N/A'}</td>
                                <td className="align-middle text-center">{cliente.email || 'N/A'}</td>
                                <td className="align-middle text-center">{cliente.uf || 'N/A'}</td>
                                <td className="align-middle text-center">{cliente.fone || 'N/A'}</td>
                                <td className="align-middle text-center">{cliente.valor || 'N/A'}</td>
                                <td className="align-middle text-center">{formatarData(cliente.venc2)}</td>
                                <td className="align-middle text-center">{cliente.simPago ? 'Sim' : 'Não'}</td>

                                <td className="align-middle text-center">
                                    <Link to={`/app/home/fichagestaomapsempresas/${cliente.id}`} className="btn btn-primary btn-cliG2" type="button" id="button-addon2"><i className="fa-solid fa-money-check-dollar green"></i></Link>
                                    <button onClick={() => addInfoManually(cliente.id)}>
                                        Adicionar Informações
                                    </button>
                                    {additionalInfoData.info && (
                                        <div>
                                            <strong>Informações:</strong> {additionalInfoData.info}
                                            <br />
                                            <strong>Adicionado por:</strong> {additionalInfoData.name}
                                            <br />
                                            <button onClick={() => deleteInfo(cliente.id)}>
                                                Excluir Informações
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        );
                    } else {
                        return null;
                    }
                })}
            </tbody>
        </table>
        </>

    );
}
export default ListaCliente3;