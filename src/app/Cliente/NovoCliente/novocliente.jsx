import React, { useState, useEffect, useRef } from "react";
import './novocliente.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import { isEmpty } from 'lodash';
import html2pdf from "html2pdf.js";
import QRCode from 'qrcode.react';
import axios from 'axios';
import qrCode from 'qrcode';
function NovoCliente() {
    const [cob, setCob] = useState('');
    const [nomeCob, setNomeCob] = useState('');
    const [clientes, setClientes] = useState([]);
    const [loader, setLoader] = useState(false);
    const [formState, setFormState] = useState({ qrCode: 'Your QR Code Data Here' });
    const [plano, setPlano] = useState('Escolha');
    const [data, setData] = useState('');
    const [naoPago, setNaoPago] = useState('');
    const [simPago, setSimPago] = useState('');
    const [concluidoNao, setConcluidoNao] = useState('');
    const [concluidoSim, setConcluidoSim] = useState('');
    const [dataPagamento, setDataPagamento] = useState('');
    const [encaminharClienteCobranca, setEncaminharClienteCobranca] = useState(false);
    const [naoEncaminharClienteCobranca, setNaoEncaminharClienteCobranca] = useState(false);
    const [numeroContrato, setNumeroContrato] = useState('');
    const [bairro, setBairro] = useState('');
    const [obs, setObs] = useState('');
    const [funcionamento, setFuncionamento] = useState('');
    const [venc2, setVenc2] = useState('');
    const [valor, setValor] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCep] = useState('');
    const [operador, setOperador] = useState('');
    const [uf, setUf] = useState('');
    const [site, setSite] = useState('');
    const [whats, setWhats] = useState('');
    const [endereco, setEndereco] = useState('');
    const [razao, setRazao] = useState('');
    const [apresentacao, setApresentacao] = useState('');
    const [google, setGoogle] = useState('');
    const [dadosEmpresa, setDadosEmpresa] = useState('')
    const [prop, setProp] = useState('');
    const [conf, setConf] = useState('');
    const [venc, setVenc] = useState('');
    const [importanteDado, setImportanteDado] = useState('');
    const [cpf, setCpf] = useState('');
    const [link, setLink] = useState('');
    const [nome, setNome] = useState('');
    const [sociais, setSociais] = useState('');
    const [fantasia, setFantasia] = useState('');
    const [parcelas, setParcelas] = useState('1');
    const [cobrador, setCobrador] = useState('');
    const [email, setEmail] = useState('');
    const [fone, setFone] = useState('');
    const [representante, setRepresentante] = useState('');
    const [renovSim, setRenovSim] = useState(true);
    const [renovNao, setRenovNao] = useState(false);
    const [encaminharCliente, setEncaminharCliente] = useState(false);
    const [naoEncaminharCliente, setNaoEncaminharCliente] = useState(false);
    const [servicosRealizados, setServicosRealizados] = useState(false)
    const [vencimentoCobranca, setVencimentoCobranca] = useState('');
    const [dataCobranca, setDataCobranca] = useState('');
    const [obsMonitoria, setObsMonitoria] = useState('');
    const [produtosNao, setProdutosNao] = useState(false);
    const [produtosSim, setProdutosSim] = useState(false);
    const [confirmNao, setConfirmNao] = useState(false);
    const [confirmSim, setConfirmSim] = useState(false);
    const [informNao, setInformNao] = useState(false);
    const [informSim, setInformSim] = useState(false);
    const [pagamentoSim, setPagamentoSim] = useState(false);
    const [pagamentoNao, setPagamentoNao] = useState(false);
    const [clienteSim, setClienteSim] = useState(false);
    const [clienteNao, setClienteNao] = useState(false);
    const [envioSim, setEnvioSim] = useState(false);
    const [envioNao, setEnvioNao] = useState(false);
    const [namesSim, setNamesSim] = useState(false);
    const [namesNao, setNamesNao] = useState(false);
    const [grupoSim, setGrupoSim] = useState(false);
    const [grupoNao, setGrupoNao] = useState(false);
    const [dataAuditoriaSIm, setDataAuditoriaSIm] = useState(false);
    const [dataAuditoriaNao, setDataAuditoriaNao] = useState(false);
    const [artigoSim, setArtigoSim] = useState(false);
    const [artigoNao, setArtigoNao] = useState(false);
    const [compromissoSim, setCompromissoSim] = useState(false);
    const [compromissoNao, setCompromissoNao] = useState(false);
    const [fichaCorretaSim, setFichaCorretaSim] = useState(false)
    const [fichaCorretaNao, setFichaCorretaNao] = useState(false);
    const [nomeAuditoriaSim, setNomeAuditoriaSim] = useState(false);
    const [nomeAuditoriaNao, setNomeAuditoriaNao] = useState(false);
    const [descontosSim, setDescontosSim] = useState(false);
    const [descontosNao, setDescontosNao] = useState(false);
    const [nomeMonitor, setNomeMonitor] = useState('');
    const [ramal, setRamal] = useState('')
    const [googleNao, setGoogleNao] = useState(false);
    const [googleSim, setGoogleSim] = useState(false);
    const [apresentacaoSim, setApresentacaoSim] = useState(false);
    const [apresentacaoNao, setApresentacaoNao] = useState(false);
    const [siteSim, setSiteSim] = useState(false);
    const [siteNao, setSiteNao] = useState(false);
    const [dataMonitoria, setDataMonitoria] = useState('');
    const [declaro, setDeclaro] = useState(true);
    const [auditor, setAuditor] = useState('');
    const [confirmCNPJ, setConfirmCnpj] = useState('');
    const [validade, setValidade] = useState('');
    const [equipe, setEquipe] = useState('G MARKETING DIGITAL');
    const [mensagem, setMensagem] = useState('');
    const [nota, setNOta] = useState(100);
    const [cargo, setCargo] = useState('');
    const [celular, setCelular] = useState('');
    const [modelo, setModelo] = useState('');
    const [email2, setEmail2] = useState('');
    const [formaPagamento, setFormaPagamento] = useState('');

    const [sucesso, setSucesso] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
            navigate('/app/home/novocliente');
            return;
        }
        const db = getFirestore();
        const q = query(collection(db, 'clientes'), where('userId', '==', user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const clientesData = [];
            snapshot.forEach((doc) => {
                clientesData.push({ id: doc.id, ...doc.data() });
            });
            setClientes(clientesData);
        });
        return () => {
            unsubscribe();
        };
    }, [navigate]);
    const db = getFirestore();
    // const clienteJaExiste = async (cpf) => {
    //     const querySnapshot = await getDocs(query(collection(db, 'clientes'), where('cpf', '==', cpf)));
    //     return !isEmpty(querySnapshot.docs);
    // };
    async function cadastrarCliente() {
        try {
            if (nome.length === 0) {
                setMensagem('Informe o nome do autorizante 😤');
                return;
            } else if (operador.length === 0) {
                setMensagem('Informe o nome do operador 😤');
                return;
            } else if (cpf.length === 0) {
                setMensagem('Informe o CNPJ ou CPF do cliente 😤');
                return;
            }
            else if (email.length === 0) {
                setMensagem('Informe o email do cliente 😤');
                return;
            }
            else if (modelo.length === 0) {
                setMensagem('Informe o modelo de venda 😤');
                return;
            }
            const clienteData = {
                nomeCob,
                cob,
                nome,
                nota,
                email,
                fone,
                numeroContrato,
                razao,
                cpf,
                fantasia,
                endereco,
                bairro,
                uf,
                cidade,
                cep,
                whats,
                obs,
                funcionamento,
                valor,
                plano,
                renovNao,
                renovSim,
                validade,
                data,
                representante,
                venc2,
                cargo,
                operador,
                site,
                link,
                sociais,
                dataCobranca,
                vencimentoCobranca,
                cobrador,
                parcelas,
                prop,
                venc,
                importanteDado,
                apresentacao,
                google,
                dadosEmpresa,
                conf,
                naoEncaminharCliente,
                encaminharCliente,
                servicosRealizados,
                produtosNao,
                produtosSim,
                confirmNao,
                confirmSim,
                informNao,
                informSim,
                pagamentoSim,
                pagamentoNao,
                clienteSim,
                clienteNao,
                envioSim,
                envioNao,
                namesSim,
                namesNao,
                grupoSim,
                grupoNao,
                dataAuditoriaSIm,
                dataAuditoriaNao,
                artigoSim,
                artigoNao,
                compromissoSim,
                compromissoNao,
                fichaCorretaSim,
                fichaCorretaNao,
                nomeAuditoriaSim,
                nomeAuditoriaNao,
                descontosSim,
                descontosNao,
                nomeMonitor,
                ramal,
                googleNao,
                googleSim,
                apresentacaoSim,
                apresentacaoNao,
                dataMonitoria,
                auditor,
                confirmCNPJ,
                obsMonitoria,
                siteNao,
                siteSim,
                concluidoNao,
                concluidoSim,
                dataPagamento,
                simPago,
                naoPago,
                naoEncaminharClienteCobranca,
                encaminharClienteCobranca,
                equipe,
                declaro,
                celular,
                email2,
                modelo,
                formaPagamento,
                qrCode: formState.qrCode, // Adicione o campo do QR Code aqui

            };
            const auth = getAuth();
            const userId = auth.currentUser.uid;
            clienteData.userId = userId;
            // const clienteExistente = await clienteJaExiste(cpf);
            // if (clienteExistente) {
            //     setMensagem('Cliente já cadastrado.');
            //     return;
            // }
            const novoClienteRef = await addDoc(collection(db, 'clientes'), clienteData);
            setFormState({
                nome: '',
                email: '',
                fone: '',
                numeroContrato: '',
                razao: '',
                cpf: '',
                fantasia: '',
                endereco: '',
                bairro: '',
                uf: '',
                cidade: '',
                cep: '',
                whats: '',
                obs: '',
                funcionamento: '',
                valor: '',
                plano: '',
                renovNao: '',
                renovSim: '',
                validade: '',
                data: '',
                representante: '',
                venc2: '',
                cargo: '',
                operador: '',
                site: '',
                link: '',
                sociais: '',
                cobrador: '',
                vencimentoCobranca: '',
                dataCobranca: '',
                parcelas: '',
                nota: '',
                prop: '',
                venc: '',
                importanteDado: '',
                apresentacao: '',
                google: '',
                dadosEmpresa: '',
                conf: '',
                naoEncaminharCliente: '',
                encaminharCliente: '',
                servicosRealizados: '',
                produtosNao: '',
                produtosSim: '',
                confirmNao: '',
                confirmSim: '',
                informNao: '',
                informSim: '',
                pagamentoSim: '',
                pagamentoNao: '',
                clienteSim: '',
                clienteNao: '',
                envioSim: '',
                envioNao: '',
                namesSim: '',
                namesNao: '',
                grupoSim: '',
                grupoNao: '',
                dataAuditoriaSIm: '',
                dataAuditoriaNao: '',
                artigoSim: '',
                artigoNao: '',
                compromissoSim: '',
                compromissoNao: '',
                fichaCorretaSim: '',
                fichaCorretaNao: '',
                nomeAuditoriaSim: '',
                nomeAuditoriaNao: '',
                descontosSim: '',
                descontosNao: '',
                nomeMonitor: '',
                ramal: '',
                googleNao: '',
                googleSim: '',
                apresentacaoSim: '',
                apresentacaoNao: '',
                dataMonitoria: '',
                auditor: '',
                confirmCNPJ: '',
                obsMonitoria: '',
                siteNao: '',
                siteSim: '',
                concluidoNao: '',
                concluidoSim: '',
                dataPagamento: '',
                simPago: '',
                naoPago: '',
                naoEncaminharClienteCobranca: '',
                encaminharClienteCobranca: '',
                equipe: '',
                declaro: '',
                celular: '',
                email2: '',
                modelo: '',
                formaPagamento: '',
                qrCode: '',
            });
            setMensagem('');
            setSucesso('S');
            console.log('Novo cliente criado com ID:', novoClienteRef.id);
            // sendSms();
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            setMensagem('Ocorreu um erro ao cadastrar o cliente. Por favor, tente novamente.');
            setSucesso('N');
        }
    }
    const [checkboxes, setCheckboxes] = useState({
        atualizacao: true,
        criacao: false,
        anuncio: false,
        cartaoDigital: true,
        logotipo: true,
    });

    const handleCheckboxChange = (checkboxId) => {
        setCheckboxes((prevCheckboxes) => ({
            ...prevCheckboxes,
            [checkboxId]: !prevCheckboxes[checkboxId],
        }));
    };
    const handleDownloadPDF = () => {
        // Seleciona os elementos que você deseja incluir no PDF
        const elementos = document.querySelectorAll(".element");

        // Cria um novo documento HTML para armazenar o conteúdo
        const docHTML = document.createElement("div");

        // Adiciona cada elemento selecionado ao documento HTML
        elementos.forEach((elemento) => {
            // Clona o elemento principal
            const elementoClonado = elemento.cloneNode(true);

            // Busca a div com a classe 'inf' dentro do elemento principal
            const divArea = elementoClonado.querySelector(".areaqr");

            // Se a div 'areaqr' não for encontrada, pule para o próximo elemento
            if (!divArea) return;

            elementoClonado.classList.add("pdf-element");


            // Cria uma div para conter o QR Code
            const divElement = document.createElement("div");
            divElement.className = "qr-code";

            // Gera o QR Code como uma imagem
            const qrCodeValue = formState.qrCode;
            qrCode.toDataURL(qrCodeValue, { type: 'image/jpeg' })
                .then(dataUrl => {
                    // Cria um elemento de imagem com o QR Code
                    const img = document.createElement("img");
                    img.src = dataUrl;

                    // Adiciona o elemento de imagem à div
                    divElement.appendChild(img);

                    // Insere a div do QR Code dentro da div 'inf'
                    divArea.appendChild(divElement);
                })
                .catch(error => {
                    console.error('Erro ao gerar QR Code:', error);
                });

            // Adiciona o elemento principal clonado ao documento HTML
            docHTML.appendChild(elementoClonado);
        });

        const elementosClonados = docHTML.querySelectorAll(".element");
        elementosClonados.forEach((elementoClonado) => {
            elementoClonado.style.textAlign = "center"; // Centraliza o conteúdo
            elementoClonado.style.fontSize = "10px"; // Define um tamanho de fonte menor (alterado para 10px)
            elementoClonado.style.lineHeight = "1.2"; // Define a altura da linha para evitar o texto sobreposto
            // Adicione outras propriedades de estilo conforme necessário para reduzir o tamanho das informações
        });

        const options = {
            filename: `${razao}.pdf`,
            image: { type: 'jpeg', quality: 1 }, // Melhora a qualidade da imagem
            html2canvas: { scale: 2 }, // Aumenta a escala para melhorar a qualidade da imagem
            jsPDF: {
                format: 'a4',
                margin: { top: 40, right: 40, bottom: 40, left: 40 } // Define margens em todos os lados
            }
        };

        // Usa o html2pdf para converter o documento HTML em PDF e fazer o download
        html2pdf().set(options).from(docHTML).save();
    };
    const handleScan = (data) => {
        if (data) {
            setScannedData(data);
            setCameraActive(false); // Desativar a câmera quando um QR code for escaneado

            setFormState({
                ...formState,
                qrCode: data.text,
            });
        }
    };

    const handleError = (err) => {
        console.error(err);
    };
    const [scannedData, setScannedData] = useState(null);
    const [cameraActive, setCameraActive] = useState(true);

    const [response, setResponse] = useState('');

    // const sendSms = async () => {
    //     const payload = {
    //       Sender: "G Marketing Digital", // Pode ser um nome ou número
    //       Receivers: whats, // Número de telefone do destinatário
    //       Content: "Mensagem enviada com sucesso" // Conteúdo da mensagem
    //     };

    //     const options = {
    //       method: 'POST',
    //       url: 'http://localhost:3001/send-sms',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       data: payload
    //     };

    //     try {
    //       console.log('Sending SMS with payload:', payload); // Logando o payload
    //       const res = await axios(options);
    //       setResponse(res.data);
    //     } catch (error) {
    //       console.error('Error sending SMS:', error);
    //       setResponse('Error sending SMS');
    //     }
    //   };

    return <div>
        <div className="background">
            <div className="element contrato container-fluid titulo-2 " id="formId">
                <div>
                    <div className="logo ">
                        <img src="../../../img/tag.png" alt="" />
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td className="baixo baixo-menor">
                                    <p><b>CONTRATO Nº</b></p>
                                    <input className="form-control" onChange={(e) => setNumeroContrato(e.target.value)} type="text" id="contrato" placeholder="Nº" />
                                </td>
                                <td className="baixo ">
                                    <p><b>DATA</b></p>
                                    <input onChange={(e) => setData(e.target.value)} id="date" type="date" className="form-control" />
                                </td>
                                <td className="baixo ">
                                    <p><b>OPERADOR</b></p>
                                    <input onChange={(e) => setOperador(e.target.value)} id="text" type="text" className="form-control" placeholder="Operador" />
                                </td>
                                <td className="baixo baixo-medio">
                                    <p><b>EQUIPE</b></p>
                                    <input onChange={(e) => setEquipe(e.target.value)} value={equipe} id="text" type="text" className="form-control" placeholder="Equipe" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="acessoriaNew ">
                        <div className="input-group row">
                            <h2 className="font-weight-bold frase col-sm-6">
                                <u>VALIDO POR:</u>
                            </h2>
                            <div className="col-sm-4 select-validade">
                                <select className="custom-select d-block escolha-select form-select form-select-sm" onChange={(e) => setValidade(e.target.value)} id="estado" required>
                                    <option value="">{validade}</option>
                                    <option value="Cancelamento">Cancelamento</option>
                                    <option value="1 mês">1 mês</option>
                                    <option value="3 meses">3 meses</option>
                                    <option value="6 meses">6 meses</option>
                                    <option value="1 ano">1 ano</option>
                                </select>
                            </div>
                            <div className="col-sm-4">
                                <select className="custom-select d-block escolha-select form-select form-select-sm" onChange={(e) => setModelo(e.target.value)} id="estado" required>
                                    <option value="">{modelo}</option>
                                    <option value="renovacao">Renovação</option>
                                    <option value="base">Base</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="linha3">
                        <h3 className="">
                            DADOS DA EMPRESA
                        </h3>
                    </div>
                    <form className="caixa2 ">
                        <div className="row">
                            <div className="col-md-6 ">
                                <label className="d-flex align-items-center justify-content-center lblInfo" htmlFor="lblInfo"><b>RAZÃO SOCIAL:</b></label>
                                <input
                                    type="text"
                                    id="razaoSocial"
                                    name="razaoSocial"
                                    onChange={(e) => setRazao(e.target.value)}
                                    className="form-control"
                                    placeholder="Razão social"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="lblInfo"><b>CNPJ/CPF:</b></label>
                                <input
                                    type="text"
                                    id="razaoSocial"
                                    name="razaoSocial"
                                    onChange={(e) => setCpf(e.target.value)}
                                    className="form-control"
                                    placeholder="CNPJ/CPF"
                                />
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="lblInfo"><b>NOME FANTASIA:</b></label>
                                <input
                                    type="text"
                                    id="nomeFantasia"
                                    name="nomeFantasia"
                                    onChange={(e) => setFantasia(e.target.value)}
                                    className="form-control"
                                    placeholder="Nome Fantasia"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="lblInfo"><b>ENDEREÇO COMERCIAL:</b></label>
                                <input
                                    type="text"
                                    id="nomeFantasia"
                                    name="nomeFantasia"
                                    onChange={(e) => setEndereco(e.target.value)}
                                    className="form-control"
                                    placeholder="Endereço"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="lblInfo"><b>BAIRRO:</b></label>
                                <input
                                    type="text"
                                    id="nomeFantasia"
                                    name="nomeFantasia"
                                    onChange={(e) => setBairro(e.target.value)}
                                    className="form-control"
                                    placeholder="Bairro"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="lblInfo "><b>CEP:</b></label>
                                <input
                                    type="text"
                                    id="razaoSocial"
                                    name="razaoSocial"
                                    onChange={(e) => setCep(e.target.value)}
                                    className="form-control"
                                    placeholder="Cep"
                                />
                            </div>


                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="nomeFantasia"><b>ESTADO:</b></label>
                                <input
                                    type="text"
                                    id="nomeFantasia"
                                    name="nomeFantasia"
                                    onChange={(e) => setUf(e.target.value)}
                                    className="form-control"
                                    placeholder="Estado"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="razaoSocial"><b>CIDADE:</b></label>
                                <input
                                    type="text"
                                    id="razaoSocial"
                                    name="razaoSocial"
                                    onChange={(e) => setCidade(e.target.value)}
                                    className="form-control"
                                    placeholder="Cidade"
                                />
                            </div>
                        </div>
                        <div className="contact">
                            <h2 className="d-flex align-items-center justify-content-center">
                                <b><u>CONTATOS DA EMPRESA;</u></b>
                            </h2>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="nomeFantasia"><b>TELEFONE FIXO:</b></label>
                                <input
                                    type="text"
                                    id="nomeFantasia"
                                    name="nomeFantasia"
                                    onChange={(e) => setFone(e.target.value)}
                                    className="form-control"
                                    placeholder="Telefone"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="horario"><b>CELULAR:</b></label>
                                <input
                                    type="text"
                                    id="nomeFantasia"
                                    name="nomeFantasia"
                                    onChange={(e) => setCelular(e.target.value)}
                                    className="form-control"
                                    placeholder="Horario de funcionamento"
                                />
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="razaoSocial"><b>WHATSAPP COMERCIAL:</b></label>
                                <input
                                    type="text"
                                    id="razaoSocial"
                                    name="razaoSocial"
                                    onChange={(e) => setWhats(e.target.value)}
                                    className="form-control"
                                    placeholder="WhatsApp"
                                />
                            </div>
                        </div>
                        <div className="contact">
                            <h2 className="d-flex align-items-center justify-content-center">
                                <b><u>E-MAIL PARA RECEBER AS NOTIFICAÇÕES E AVALIAÇÕES DOS CLIENTES;</u></b>
                            </h2>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="razaoSocial"><b>1º E-MAIL:</b></label>
                                <input
                                    type="text"
                                    id="razaoSocial"
                                    name="razaoSocial"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control"
                                    placeholder="E-mail"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="razaoSocial"><b>2º E-MAIL:</b></label>
                                <input
                                    type="text"
                                    id="razaoSocial"
                                    name="razaoSocial"
                                    onChange={(e) => setEmail2(e.target.value)}
                                    className="form-control"
                                    placeholder="E-mail"
                                />
                            </div>
                        </div>
                        <div className="contact">
                            <h2 className="d-flex align-items-center justify-content-center">
                                <b><u>HORARIO DE FUNCIONAMENTO;</u></b>
                            </h2>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <input
                                    type="text"
                                    id="nomeFantasia"
                                    name="nomeFantasia"
                                    onChange={(e) => setFuncionamento(e.target.value)}
                                    className="form-control"
                                    placeholder="Horario de funcionamento"
                                />
                            </div>
                        </div>
                        <div className="contact">
                            <h2 className="d-flex align-items-center justify-content-center">
                                <b><u>SERVIÇOS ADCIONAIS;</u></b>
                            </h2>
                        </div>
                        <div className="row">
                            <div className=" divAnuncio form-group temSite col-md-5">
                                <label htmlFor="temSite" className="form-check-label"><b>CRIAÇÃO E DESENVOLVIMENTO DE WEB SITE</b></label>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        id="temSite"
                                        name="temSite"
                                        checked={siteSim}
                                        onChange={(e) => setSiteSim(e.target.checked)}
                                        className="form-check-input"
                                    />
                                </div>
                            </div>
                            <div className="divAnuncio form-group temSite col-md-7.">
                                <label htmlFor="temLojaFisica" className="form-check-label"><b>ANUNCIOS PATROCINADOS FACEBOOK/INSTAGRAM E GOOGLE ADS</b></label>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        id="temLojaFisica"
                                        name="temLojaFisica"
                                        checked={siteNao}
                                        onChange={(e) => setSiteNao(e.target.checked)}
                                        className="form-check-input"
                                    />
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="razaoSocial"><b>LINK DA PÁGINA GOOGLE PARA INSERÇÃO DO SITE:</b></label>
                                <input
                                    type="text"
                                    id="razaoSocial"
                                    name="razaoSocial"
                                    onChange={(e) => setLink(e.target.value)}
                                    className="form-control"
                                    placeholder="Link"
                                />
                            </div>
                            <div className="col-md-12">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="nomeFantasia"><b>OBSERVAÇÕES:</b></label>
                                <textarea
                                    type="text"
                                    id="nomeFantasia"
                                    name="nomeFantasia"
                                    onChange={(e) => setObs(e.target.value)}
                                    className="form-control"
                                    placeholder="Observações"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="nomeFantasia"><b>NOME DO RESPONSÁVEL:</b></label>
                                <input
                                    type="text"
                                    id="nomeFantasia"
                                    name="nomeFantasia"
                                    onChange={(e) => setNome(e.target.value)}
                                    className="form-control"
                                    placeholder="Autorizante"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="nomeFantasia"><b>CARGO:</b></label>
                                <input
                                    type="text"
                                    id="nomeFantasia"
                                    name="nomeFantasia"
                                    onChange={(e) => setCargo(e.target.value)}
                                    className="form-control"
                                    placeholder="Cargo"
                                />
                            </div>

                        </div>
                    </form>

                    <div className="escrever2 row ">
                        <h5>
                            ASSINATURA DA CONTRATADA:
                        </h5>
                        <img src="../../../img/assinatura-maps.jpg" alt="" />
                    </div>
                    <div className="logo ">
                        <img src="../../../img/tag.png" alt="" />
                    </div>
                    <div className="cond ">
                        <p className=" font-weight-bold "><u className="text-primary">CONDIÇÕES</u>; 1º- ESTOU CIENTE QUE PARA CRIAÇÃO OU ATUALIZAÇÃO DA MINHA PAGÍNA DEVO ENCAMINHAR PARA A EMPRESA CONTRATADA QUANDO SOLICITADO POR PARTE DA EQUIPE DE SUPORTE TODAS AS INFORMAÇÕES NECESSARIAS. 2º- ASSUMO TAMBÉM A TOTAL RESPONSABILIDADE E AUTORIZO QUE A EMPRESA CONTRATADA DIVULGUE OS MEUS DADOS COMERCIAIS NO SITE DE BUSCA. 3º- SOBRE AS CONDIÇÕES ASSUMO AS OBRIGAÇÕES COM ESTA PRESTAÇÃO DE SERVIÇOS DE MARKETING DIGITAL REALIZADA PELA EMPRESA G MAPS CONTACT CENTER LTDA CNPJ; 40.407.753/0001-30 TENDO CIÊNCIA DO VALOR DE R$
                            <input className="txtAcordo txtCond" onChange={(e) => setValor(e.target.value)} value={valor} type="text" placeholder="" />. 4º SABENDO QUE O NÃO PAGAMENTO PODE GERAR A NEGATIVAÇÃO DO CPF/CNPJ JUNTO AOS ORGÃOS COMPETENTES (SERASA/CARTÓRIO) E QUE <u>O ACEITE DOS SERVIÇOS FOI REALIZADA DE FORMA VERBAL CONFORME O ARTIGO 107 DO CODIGO CIVIL LEI 10406 DE 10 DE JANEIRO DE 2002 E QUE A CÓPIA DESTE CONTRATO FOI ENCAMINHADA PARA O E-MAIL PRINCIPAL INFORMADO ACIMA.</u> 5º-TODAS AS SOLICITAÇÕES DEVERÃO SER ENCAMINHADAS PARA O DEPARTAMENTO DE MARKETING ATRAVÉS DO E-MAIL OU WHATSAPP AQUI DISPONIBILIZADOS. 6º- A CONTRATADA ASSUME AS OBRIGAÇÕES JUNTO A CONTRATANTE DE CONCLUIR E ENTREGAR OS SERVIÇOS PRESTADOS DENTRO DO PERIODO DE ATÉ 72HORAS UTEIS.
                        </p>
                        <div className="row faixa-arrow">
                            <div className="flecha-amarela">
                                <i className="fa-solid fa-arrow-right" style={{ color: "#FFD43B" }}></i>
                            </div>
                            <div className="linha-verde ">
                                <a href="https://docs.google.com/document/d/16LfzgC0AeCyj98f4hQftWszwba0_fLSk/edit?usp=sharing&ouid=114492622142866276581&rtpof=true&sd=true">
                                    <img src="../../../img/Imagem2.jpg" alt="" />
                                </a>
                            </div>

                            <div className="flecha-amarela">
                                <i className="fa-solid fa-arrow-left" style={{ color: "#FFD43B" }}></i>
                            </div>
                            <div className="direitos1">
                                <p className="font-weight-bold">
                                    <u> CLIQUE NA IMAGEM A CIMA PARA VERIFICAR OS TERMOS</u>
                                </p>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center renovacao" >
                            <div className="form-check col-md-1 mb-3">
                                <input onChange={(e) => setDeclaro(e.target.checked)} checked={declaro} className="form-check-input" type="checkbox" id="flexCheckDefault" />
                            </div>
                            <p className="col-md-11. mb-3">
                                <b>DECLARO TER LIDO OS TERMOS DE USO ESTANDO EM PLENA E TOTAL CONCORDÂNCIA.</b>
                            </p>
                        </div>
                        <div className="row d-flex justify-content-center renova" >
                            <p className="col-md-3 mb-3">
                                <b>Renovação automatica</b>
                            </p>
                            <div className="form-check col-md-1 mb-3">
                                <input onChange={(e) => setRenovSim(e.target.checked)} checked={renovSim} className="form-check-input" type="checkbox" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    <b>Sim</b>
                                </label>
                            </div>
                            <div className="form-check mb-3">
                                <input onChange={(e) => setRenovNao(e.target.checked)} checked={renovNao} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Não</b>
                                </label>
                            </div>
                        </div>
                        <div className="linha3">
                            <h3 className="">
                                BÔNUS
                            </h3>
                        </div>
                        <div className="row atualizacao">

                            <div className="custom-control custom-checkbox col-md-1.7 mb-3">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="criacao"
                                    checked={checkboxes.criacao}
                                    onChange={() => handleCheckboxChange("criacao")}
                                />
                                <label className="custom-control-label" htmlFor="criacao">
                                    Criação
                                </label>
                            </div>
                            <p className=" mb-3 font-weight-bold">-</p>

                            <div className="custom-control custom-checkbox col-md-1.7 mb-3">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="anuncio"
                                    checked={checkboxes.anuncio}
                                    onChange={() => handleCheckboxChange("anuncio")}
                                />
                                <label className="custom-control-label" htmlFor="anuncio">
                                    Anúncio
                                </label>
                            </div>
                            <p className=" mb-3 font-weight-bold">-</p>

                            <div className="custom-control custom-checkbox col-md-1.7 mb-3">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="cartaoDigital"
                                    checked={checkboxes.cartaoDigital}
                                    onChange={() => handleCheckboxChange("cartaoDigital")}
                                />
                                <label className="custom-control-label" htmlFor="cartaoDigital">
                                    Cartão Digital
                                </label>
                            </div>
                            <p className=" mb-3 font-weight-bold">-</p>

                            <div className="custom-control custom-checkbox col-md-1.7 mb-3">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="logotipo"
                                    checked={checkboxes.logotipo}
                                    onChange={() => handleCheckboxChange("logotipo")}
                                />
                                <label className="custom-control-label" htmlFor="logotipo">
                                    Logotipo
                                </label>
                            </div>
                        </div>
                        <div className="direitos1">
                            <p className="font-weight-bold">
                                <u className="u-direito1">
                                    como acordado segue o plano no valor de
                                    <input className="txtAcordo" onChange={(e) => setValor(e.target.value)} value={valor} type="text" placeholder="" />
                                    a ser pago em  
                                    <select className="txtAcordo select_acordo form-select-sm" onChange={(e) => setParcelas(e.target.value)} id="estado" required>
                                        <option value="">{parcelas}</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>

                                    </select>
                                    parcelas via <select className=" txtAcordo select_acordo form-select-sm" onChange={(e) => setFormaPagamento(e.target.value)} id="estado" required>
                                        <option value="">{formaPagamento}</option>
                                        <option value="pix">pix</option>
                                        <option value="boleto">boleto</option>
                                        <option value="credito">crédito</option>

                                    </select>
                                    com o vencimento para o dia
                                    <input className="txtAcordo" onChange={(e) => setVenc2(e.target.value)} type="date" />
                                    .
                                </u>
                            </p>
                        </div>
                        <div className="cond">
                            <p className=" font-weight-bold ">O PAGAMENTO PODE SER FEITO ATRAVÉS DO BOLETO BANCÁRIO OU PIX QR-CODE DISPONÍVEL NO BOLETO, ENVIADO ATRAVÉS DO E-MAIL E WHATSAPP DO CONTRATANTE.
                            </p>
                        </div>
                        <div className="inf">
                            <h3><b>ACEITE REALIZADO DE FORMA VERBAL;</b></h3>
                            <h3><b>PARA VERIFICAR SUA ADESÃO</b></h3>
                            <h3><b>APONTE A CAMÊRA DO CELULAR PARA O QRCODE ABAIXO;</b></h3>
                            <div className="areaqr">
                                {/* Renderizar o componente do QR Code somente se houver dados escaneados */}
                                {scannedData && (
                                    <div className="qr-code">
                                        <QRCode value={formState.qrCode} />
                                    </div>
                                )}
                            </div>
                            {/* Renderiza a imagem do QR code, se disponível */}
                            <h3>
                                <b>CENTRAL DE ATENDIMENTO
                                    <br />
                                    (11) 4200-6110 / 0800 050 0069
                                    <br />
                                    <a href="mailto:Marketing@grupomapsempresas.com.br">Marketing@grupomapsempresas.com.br</a>
                                    <br />
                                    <a href="mailto:Contato@grupomapsempresas.com.br">Contato@grupomapsempresas.com.br</a>
                                    <br />
                                    PARA ATENDIMENTO VIA WHATSAPP BASTA CLICAR NO ICONE ABAIXO;
                                    <br />
                                </b>
                            </h3>
                            <div className="logo-whats">
                                <a href="https://wa.link/jqyx3x">
                                    <img src="../../../img/whats.png" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {mensagem.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{mensagem}</div> : null}
                {sucesso === 'S' ? <Navigate to='/app/home' /> : null}
            </div>

        </div>
        <div className="row salvar">
            <Link to="/app/home" className="btn btn-warning btn-acao">Cancelar</Link>
            <button onClick={cadastrarCliente} type="button" className="btn btn-primary btn-acao">Salvar</button>
            {/* <button className="btn btn-danger btn-cli" onClick={handleDownloadPDF} disabled={loader}>
                <i className="fa-solid fa-file-pdf"></i>{loader ? <span>Baixando</span> : <span>Baixar PDF</span>}
            </button> */}

        </div>
    </div >
}
export default NovoCliente;