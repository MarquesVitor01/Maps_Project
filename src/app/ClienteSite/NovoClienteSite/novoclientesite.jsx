import React, { useState, useEffect, useRef } from "react";
import './novoclientesite.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import { isEmpty } from 'lodash';
import html2pdf from "html2pdf.js";
import QRCode from 'qrcode.react';
import QrReader from 'react-qr-scanner';
import qrCode from 'qrcode';
function NovoClienteSite() {
    const [clientessite, setClientesSite] = useState([]);
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
    const [equipeSite, setEquipeSite] = useState('Desenvolvimento Digital');
    const [mensagem, setMensagem] = useState('');
    const [nota, setNOta] = useState(100);
    const [cargo, setCargo] = useState('');
    const [celular, setCelular] = useState('');
    const [email2, setEmail2] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [sp, setSp] = useState('São Paulo');
    const [descricao, setDescricao] = useState('');
    const [cores, setCores] = useState('');
    const [logoSim, setLogoSim] = useState('');
    const [logoNao, setLogoNao] = useState('');
    const [dominio, setDominio] = useState('');
    const [boleto, setBoleto] = useState('');
    const [credito, setCredito] = useState('');
    const [pix, setPix] = useState('');
    const [face, setFace] = useState('');
    const [tkt, setTkt] = useState('');
    const [youtube, setYoutube] = useState('');
    const [insta, setInsta] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
            navigate('/app/home/novosite');
            return;
        }
        const db = getFirestore();
        const q = query(collection(db, 'clientessite'), where('userId', '==', user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const clientesData = [];
            snapshot.forEach((doc) => {
                clientesData.push({ id: doc.id, ...doc.data() });
            });
            setClientesSite(clientesData);
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
            const clienteData = {
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
                equipeSite,
                declaro,
                celular,
                email2,
                qrCode: formState.qrCode, // Adicione o campo do QR Code aqui
                sp,
                descricao,
                cores,
                dominio,
                face,
                youtube,
                tkt,
                insta,                    
                logoSim,
                logoNao,
            };
            const auth = getAuth();
            const userId = auth.currentUser.uid;
            clienteData.userId = userId;
            // const clienteExistente = await clienteJaExiste(cpf);
            // if (clienteExistente) {
            //     setMensagem('Cliente já cadastrado.');
            //     return;
            // }
            const novoClienteRef = await addDoc(collection(db, 'clientessite'), clienteData);
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
                equipeSite: '',
                declaro: '',
                celular: '',
                email2: '',
                qrCode: '',
                sp: '',
                descricao: '',
                cores: '',
                dominio: '',
                face: '',
                insta: '',
                tkt: '',
                youtube: '',
                logoSim: '',
                logoNao: '',
            });
            setMensagem('');
            setSucesso('S');
            console.log('Novo cliente criado com ID:', novoClienteRef.id);
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

            // Se a div 'areaqr' não for encontrada, pule para o próximo elemento

            elementoClonado.classList.add("pdf-element");


            // Cria uma div para conter o QR Code
            const divElement = document.createElement("div");
            divElement.className = "divEsq3";

            // Gera o QR Code como uma imagem


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


    return <div>
        <div className="background">
            <div className="element contrato container-fluid titulo-03 " id="formId">
                <div>
                    <div className="row divLogo">
                        <div className="logo-site ">
                            <img src="../../../img/imagem-site.png" alt="" />
                        </div>
                        <div className="logo-site2 ">
                            <img src="../../../img/imagem3-site.png" alt="" />
                        </div>
                    </div>


                    <table>
                        <tbody>
                            <tr>
                                <td className="baixo2 baixo-menor">
                                    <p><b>CONTRATO Nº</b></p>
                                    <input className="form-control" onChange={(e) => setNumeroContrato(e.target.value)} type="text" id="contrato" placeholder="Nº" />
                                </td>
                                <td className="baixo2 ">
                                    <p><b>DATA</b></p>
                                    <input onChange={(e) => setData(e.target.value)} id="date" value={data} type="date" className="form-control" />
                                </td>
                                <td className="baixo2 ">
                                    <p><b>OPERADOR</b></p>
                                    <input onChange={(e) => setOperador(e.target.value)} id="text" type="text" className="form-control" placeholder="Operador" />
                                </td>
                                <td className="baixo2 baixo-medio">
                                    <p><b>EQUIPE</b></p>
                                    <input onChange={(e) => setEquipeSite(e.target.value)} value={equipeSite} id="text" type="text" className="form-control" placeholder="Equipe" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="acessoriaNew ">
                        <div className="input-group">
                            <h2 className="font-weight-bold frase col-sm-6">
                                <u>HOSPEDAGEM POR 1 ANO</u>
                            </h2>
                            <div className="select-validade1">
                                <input
                                    type="text"
                                    id="razaoSocial"
                                    name="razaoSocial"
                                    value={sp}
                                    onChange={(e) => setSp(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="select-validade2">
                                <input onChange={(e) => setData(e.target.value)} value={data} id="date" type="date" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="linha3-site">
                        <h3 className="align-middle ">
                            <b>DADOS DA EMPRESA PARA CRIAÇÃO DO WEB-SITE</b>
                        </h3>
                    </div>
                    <form className="caixa3 ">
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
                            <div className="col-md-6">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="razaoSocial"><b>PÁGINA GOOGLE PARA INSERÇÃO DO SITE:</b></label>
                                <input
                                    type="text"
                                    id="razaoSocial"
                                    name="razaoSocial"
                                    onChange={(e) => setLink(e.target.value)}
                                    className="form-control"
                                    placeholder="Link"
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
                        {/* <div className="contact">
                            <h2 className="d-flex align-items-center justify-content-center">
                                <b><u>HORARIO DE FUNCIONAMENTO;</u></b>
                            </h2>
                        </div> */}
                        <div className="linha4-site">
                            <h3 className="">
                                <b>HORÁRIO DE FUNCIONAMENTO</b>
                            </h3>
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
                        <div className="linha5-site">
                            <h3 className="">
                                <b>OUTRAS INFORMAÇÕES</b>
                            </h3>
                        </div>
                        {/* <div className="contact">
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
                        </div> */}
                        <br />
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <label className="d-flex align-items-center justify-content-center" ><b>DESCRIÇÃO DA EMPRESA:</b></label>
                                <textarea
                                    id="razaoSocial"
                                    name="razaoSocial"
                                    onChange={(e) => setDescricao(e.target.value)}
                                    className="form-control"
                                    placeholder="Descrição"
                                />
                            </div>
                            {/* <div className="col-md-6">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="nomeFantasia"><b>OBSERVAÇÕES:</b></label>
                                <input
                                    type="text"
                                    id="nomeFantasia"
                                    name="nomeFantasia"
                                    onChange={(e) => setObs(e.target.value)}
                                    className="form-control"
                                    placeholder="Observações"
                                />
                            </div> */}
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="nomeFantasia"><b>PREFERÊNCIAS DE CORES PARA O SITE:</b></label>
                                <input
                                    type="text"
                                    id="nomeFantasia"
                                    name="nomeFantasia"
                                    onChange={(e) => setCores(e.target.value)}
                                    className="form-control"
                                    placeholder="Cores"
                                />
                            </div>


                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="nomeFantasia"><b>FACEBOOK:</b></label>
                                <input
                                    type="text"
                                    id="nomeFantasia"
                                    name="nomeFantasia"
                                    onChange={(e) => setFace(e.target.value)}
                                    className="form-control"
                                    placeholder="Informe a rede social"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="nomeFantasia"><b>INSTAGRAM:</b></label>
                                <input
                                    type="text"
                                    id="nomeFantasia"
                                    name="nomeFantasia"
                                    onChange={(e) => setInsta(e.target.value)}
                                    className="form-control"
                                    placeholder="Informe a rede social"
                                />
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="nomeFantasia"><b>YOUTUBE:</b></label>
                                <input
                                    type="text"
                                    id="nomeFantasia"
                                    name="nomeFantasia"
                                    onChange={(e) => setYoutube(e.target.value)}
                                    className="form-control"
                                    placeholder="Informe a rede social"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="nomeFantasia"><b>TIKTOK:</b></label>
                                <input
                                    type="text"
                                    id="nomeFantasia"
                                    name="nomeFantasia"
                                    onChange={(e) => setTkt(e.target.value)}
                                    className="form-control"
                                    placeholder="Informe a rede social"
                                />
                            </div>


                        </div>
                        <div className="row">
                            <div className="col-md-3 divDirLogo">
                                <label htmlFor="flexCheckChecked1"> <u><b>Possui logo:</b></u> </label>
                            </div>
                            <div className="col-md-2 divEsq">
                                <input onChange={(e) => setLogoSim(e.target.checked)} checked={logoSim} className="form-check-input" type="checkbox" id="flexCheckChecked1" />
                            </div>
                            <div className="col-md-3 divDir2">
                                <label htmlFor="flexCheckChecked2"><b>Sim</b></label>
                            </div>
                            <div className="col-md-2 divEsq">
                                <input onChange={(e) => setLogoNao(e.target.checked)} checked={logoNao} className="form-check-input" type="checkbox" id="flexCheckChecked2" />
                            </div>
                            <div className="col-md-3 divDir3">
                                <label htmlFor="flexCheckDefault"><b>Não</b></label>
                            </div>
                        </div>
                        <div className="linha5-site">
                            <h3 className="">
                                <b>OUTRAS INFORMAÇÕES</b>
                            </h3>
                        </div>
                        <div className="img-planos">
                            <img src="../../../img/imagem4-site.png" alt="" />
                        </div>
                        <div className="acessoriaNew1 ">
                            <div className="input-group">
                                <h2 className="font-weight-bold frase col-sm-6">
                                    DOMINIO ESCOLHIDO:
                                </h2>
                                <div className="select-validade1">
                                    <input
                                        type="text"
                                        id="razaoSocial"
                                        name="razaoSocial"
                                        onChange={(e) => setDominio(e.target.value)}
                                        className="form-control"
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="contact1">
                            <h2 className="d-flex align-items-center justify-content-center XX">
                                <b>SOBRE O PAGAMENTO DO DOMÍNIO FICA ACORDADO QUE PARA CRIAÇÃO DO SITE O CONTRATANTE DEVE EFETUAR O PAGAMENTO NO ATO DA CONTRATAÇÃO.</b>
                            </h2>
                        </div>
                        <div className="linha5-site">
                            <h3 className="">
                                <b>CONDIÇÕES DE PAGAMENTO </b>
                            </h3>
                        </div>
                        <br />
                        <div className="text-multi">
                            <h2>
                                <u className="font-weight-bold ">FICA ACORDADO ENTRE AS PARTES O VALOR DE: </u>
                                (1) Uma, parcela de 249,90 (Duzentos e Quarenta e nove reais e noventa centavos) para criação e desenvolvimento do Web Site.
                            </h2>
                        </div>
                        <br />
                        <div className="row Dir">
                            <div className="col-md-3 divDir">
                                <label htmlFor="flexCheckChecked1"><b>Forma de Pagamento: ( </b></label>
                            </div>
                            <div className="col-md-2 divEsq">
                                <input onChange={(e) => setPix(e.target.checked)} checked={pix} className="form-check-input" type="checkbox" id="flexCheckChecked1" />
                            </div>
                            <div className="col-md-3 divDir2">
                                <label htmlFor="flexCheckChecked2"><b>) A vista via PIX - ( </b></label>
                            </div>
                            <div className="col-md-2 divEsq">
                                <input onChange={(e) => setBoleto(e.target.checked)} checked={boleto} className="form-check-input" type="checkbox" id="flexCheckChecked2" />
                            </div>
                            <div className="col-md-3 divDir3">
                                <label htmlFor="flexCheckDefault"><b>) Boleto bancario( </b> </label>
                            </div>
                            <div className="col-md-3 divEsq3">
                                <input onChange={(e) => setCredito(e.target.checked)} checked={credito} className="form-check-input" type="checkbox" id="flexCheckDefault" />
                            </div>
                            <div className="col-md-3 divDir2">
                                <label htmlFor="flexCheckDefault"><b> ) Cartão de Crédito</b> </label>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-3 divDir5">
                                <label htmlFor="flexCheckChecked1"><u><b>Vencimento para o dia: </b></u></label>
                            </div>
                            <div className="col-md-2 divEsq8">
                                <input onChange={(e) => setVenc2(e.target.value)} value={venc2} type="date" />
                            </div>
                            <div className="col-md-3 divDir2">
                                <label htmlFor="flexCheckChecked2"><u><b>Data da entrega do SITE.</b></u></label>
                            </div>
                        </div>
                        <div className="linha5-site">
                            <h3 className="">
                                <b>SOBRE AS MANUTENÇÕES </b>
                            </h3>
                        </div>
                        <br />
                        <div className="text-multi">
                            <h2>
                                <u className="font-weight-bold ">FICA ACORDADO ENTRE AS PARTES O PAGAMENTO NO VALOR DE: </u>
                                R$99,90 (Noventa e nove reais e noventa centavos)
                                para cada manutenção do site quando solicitado por parte da contratante.
                            </h2>
                        </div>
                        <div className="text-multi text-center">
                            <h2>
                                <u className="font-weight-bold ">CLIQUE NO BOTÃO TERMOS DE USO PARA CONFERIR AS INFORMAÇÕES.</u>
                            </h2>
                        </div>
                        <div className="row faixa-arrow">
                            <div className="linha-verde3 ">
                                <a href="https://drive.google.com/file/d/1kwkX4XkoGx2jztBVUDPl8vwBL5v4yRNe/view">
                                    <img src="../../../img/termosimg.jpg" alt="" />
                                </a>
                            </div>
                        </div>
                        <div className="text-multi text-center">
                            <h2>
                                <u className="font-weight-bold ">DECLARO TER LIDO E ESTOU EM PLENA E TOTAL CONCORDÂNCIA COM AS CLAÚSULAS E CONDIÇÕES MENCIONADAS ACIMA.</u>
                            </h2>
                        </div>
                        <br />
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
                                    placeholder="Informe se possui logo"
                                />
                            </div>

                        </div>
                        <br /><br />
                        <div className="text-multi text-center">
                            <h2 className="font-weight-bold ">
                                ASSINATURA DO CONTRATANTE: ___________________________________________
                            </h2>
                        </div>
                        <br />
                        <div className="inf">
                            <h2><b>EMPRESA RESPONSÁVEL PELO DESENVOLVIMENTO DO SITE </b></h2>
                            <h2><b>G M CONTACT CENTER LTDA
                            </b></h2>
                            <h2><b>CNPJ: 40.407.753/0001-30 </b></h2>
                            <br />
                            <h2>
                                <b>CENTRAL DE ATENDIMENTO 0800 580 2766

                                    <br />
                                    0800 580 2766
                                    <br />
                                    <a href="mailto:Marketing@grupomapsempresas.com.br">Contato@grupomapsempresas.com.br</a>
                                    <br />
                                    <a href="mailto:Contato@grupomapsempresas.com.br">Marketing@grupomapsempresas.com.br</a>

                                </b>
                            </h2>

                        </div>
                        <div className="imgFooter">
                            <img src="../../../img/imagem4.png" alt="" />
                        </div>
                    </form>
                    <br />






















                    <div className="areaqr">
                    </div>
                </div>
                {mensagem.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{mensagem}</div> : null}
                {sucesso === 'S' ? <Navigate to='/app/homesite' /> : null}
            </div>

        </div>
        <div className="row salvar">
            <Link to="/app/homesite" className="btn btn-warning btn-acao">Cancelar</Link>
            <button onClick={cadastrarCliente} type="button" className="btn btn-primary btn-acao">Salvar</button>
            <button className="btn btn-danger btn-cli" onClick={handleDownloadPDF} disabled={loader}>
                <i className="fa-solid fa-file-pdf"></i>{loader ? <span>Baixando</span> : <span>Baixar PDF</span>}
            </button>
        </div>
    </div >
}
export default NovoClienteSite;