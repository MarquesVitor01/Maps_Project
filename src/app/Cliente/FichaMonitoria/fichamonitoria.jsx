import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from 'react-router-dom';
import './fichamonitoria.css'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import 'firebase/firestore'
import QRCode from 'qrcode.react';
import QrReader from 'react-qr-scanner';
import qrCode from 'qrcode';

function FichaMonitoria() {
    const [valor, setValor] = useState('');
    const [venc2, setVenc2] = useState('');
    const [nota, setNota] = useState(0);
    const [apresentacaoSim, setApresentacaoSim] = useState(false);
    const [apresentacaoNao, setApresentacaoNao] = useState(false);
    const [google, setGoogle] = useState('');
    const [dadosEmpresa, setDadosEmpresa] = useState('')
    const [prop, setProp] = useState('');
    const [conf, setConf] = useState('');
    const [auditor, setAuditor] = useState('');
    const [venc, setVenc] = useState('');
    const [confirmCNPJ, setConfirmCnpj] = useState('');
    const [encaminharCliente, setEncaminharCliente] = useState(false);
    const [naoEncaminharCliente, setNaoEncaminharCliente] = useState(false);
    const [produtosNao, setProdutosNao] = useState(false);
    const [produtosSim, setProdutosSim] = useState(false);
    const [confirmNao, setConfirmNao] = useState(false);
    const [confirmSim, setConfirmSim] = useState(false);
    const [informSim, setInformSim] = useState(false);
    const [informNao, setInformNao] = useState(false);
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
    const [ramal, setRamal] = useState('');
    const [fone, setFone] = useState('');
    const [googleNao, setGoogleNao] = useState(false);
    const [googleSim, setGoogleSim] = useState(false);
    const [obsMonitoria, setObsMonitoria] = useState('');
    const [dataMonitoria, setDataMonitoria] = useState('');
    const [cpf, setCpf] = useState('');
    const [formState, setFormState] = useState({ qrCode: 'Your QR Code Data Here' });
    const [equipe, setEquipe] = useState('G MARKETING DIGITAL');
    const [celular, setCelular] = useState('');
    const [email2, setEmail2] = useState('');
    const [siteSim, setSiteSim] = useState(false);
    const [siteNao, setSiteNao] = useState(false);
    const [declaro, setDeclaro] = useState(true);
    const [mensagem, setMensagem] = useState('');
    const [sucesso, setSucesso] = useState('');
    const db = getFirestore();
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('ID do Cliente:', id);
                const clienteDocRef = doc(db, 'clientes', id);
                console.log('Referência do Documento:', clienteDocRef);
                const docSnapshot = await getDoc(clienteDocRef);
                console.log('Snapshot do Documento:', docSnapshot.data());
                if (docSnapshot.exists()) {
                    const dados = docSnapshot.data();
                    setNota(dados.nota);
                    setGoogle(dados.google);
                    setProp(dados.prop);
                    setVenc(dados.venc);
                    setDadosEmpresa(dados.dadosEmpresa);
                    setConf(dados.conf);
                    setEncaminharCliente(dados.encaminharCliente);
                    setNaoEncaminharCliente(dados.naoEncaminharCliente);
                    setDataMonitoria(dados.dataMonitoria);
                    setNomeMonitor(dados.nomeMonitor);
                    setConfirmCnpj(dados.confirmCNPJ);
                    setFone(dados.fone);
                    setRamal(dados.ramal);
                    setCpf(dados.cpf);
                    setAuditor(dados.auditor);
                    setApresentacaoSim(dados.apresentacaoSim);
                    setApresentacaoNao(dados.apresentacaoNao);
                    setGoogleSim(dados.googleSim);
                    setGoogleNao(dados.googleNao);
                    setProdutosNao(dados.produtosNao);
                    setProdutosSim(dados.produtosSim);
                    setConfirmSim(dados.confirmSim);
                    setConfirmNao(dados.confirmNao);
                    setPagamentoSim(dados.pagamentoSim);
                    setPagamentoNao(dados.pagamentoNao);
                    setInformSim(dados.informSim);
                    setInformNao(dados.informNao);
                    setClienteSim(dados.clienteSim);
                    setClienteNao(dados.clienteNao);
                    setNamesSim(dados.namesSim);
                    setNamesNao(dados.namesNao);
                    setEnvioSim(dados.envioSim);
                    setEnvioNao(dados.envioNao);
                    setNomeAuditoriaSim(dados.nomeAuditoriaSim);
                    setNomeAuditoriaNao(dados.nomeAuditoriaNao);
                    setDataAuditoriaSIm(dados.dataAuditoriaSIm);
                    setDataAuditoriaNao(dados.dataAuditoriaNao);
                    setArtigoSim(dados.artigoSim);
                    setArtigoNao(dados.artigoNao);
                    setGrupoSim(dados.grupoSim);
                    setGrupoNao(dados.grupoNao);
                    setCompromissoSim(dados.compromissoSim);
                    setCompromissoNao(dados.compromissoNao);
                    setFichaCorretaSim(dados.fichaCorretaSim);
                    setFichaCorretaNao(dados.fichaCorretaNao);
                    setDescontosSim(dados.descontosSim);
                    setDescontosNao(dados.descontosNao);
                    setObsMonitoria(dados.obsMonitoria);
                    setVenc2(dados.venc2);
                    setValor(dados.valor);
                    setSiteSim(dados.siteSim);
                    setSiteNao(dados.siteNao);
                    setCelular(dados.celular);
                    setEquipe(dados.equipe);
                    setDeclaro(dados.declaro);
                    setEmail2(dados.email2);
                } else {
                    setMensagem('Cliente não encontrado');
                }
            } catch (error) {
                setMensagem('Erro ao obter dados do cliente');
                console.error('Erro ao obter dados do cliente:', error);
            }
        };
        fetchData();
    }, [db, id]);

    const AlterarCliente = async () => {
        try {
            const senhaDigitada = prompt("Digite sua senha:");
            if (senhaDigitada === '@') { // Verifica se a senha está correta
                await updateDoc(doc(db, 'clientes', id), {
                    nota: nota,
                    prop: prop,
                    venc: venc,
                    google: google,
                    dadosEmpresa: dadosEmpresa,
                    conf: conf,
                    encaminharCliente: encaminharCliente, // Alterado para naoEncaminharCliente
                    naoEncaminharCliente: naoEncaminharCliente,
                    dataMonitoria: dataMonitoria,
                    nomeMonitor: nomeMonitor,
                    confirmCNPJ: confirmCNPJ,
                    fone: fone,
                    ramal: ramal,
                    cpf: cpf,
                    auditor: auditor,
                    apresentacaoNao: apresentacaoNao,
                    apresentacaoSim: apresentacaoSim,
                    googleNao: googleNao,
                    googleSim: googleSim,
                    produtosNao: produtosNao,
                    produtosSim: produtosSim,
                    informSim: informSim,
                    informNao: informNao,
                    pagamentoSim: pagamentoSim,
                    pagamentoNao: pagamentoNao,
                    clienteSim: clienteSim,
                    clienteNao: clienteNao,
                    namesSim: namesSim,
                    namesNao: namesNao,
                    envioSim: envioSim,
                    envioNao: envioNao,
                    nomeAuditoriaSim: nomeAuditoriaSim,
                    nomeAuditoriaNao: nomeAuditoriaNao,
                    dataAuditoriaSIm: dataAuditoriaSIm,
                    dataAuditoriaNao: dataAuditoriaNao,
                    fichaCorretaSim: fichaCorretaSim,
                    fichaCorretaNao: fichaCorretaNao,
                    descontosSim: descontosSim,
                    descontosNao: descontosNao,
                    obsMonitoria: obsMonitoria,
                    confirmSim: confirmSim,
                    confirmNao: confirmNao,
                    grupoSim: grupoSim,
                    grupoNao: grupoNao,
                    artigoSim: artigoSim,
                    artigoNao: artigoNao,
                    compromissoSim: compromissoSim,
                    compromissoNao: compromissoNao,
                    valor: valor,
                    venc2: venc2,
                    siteSim: siteSim,
                    siteNao: siteNao,
                    celular: celular,
                    equipe: equipe,
                    declaro: declaro,
                    email2: email2,
                    qrCode: formState.qrCode, // Adicione o campo do QR Code aqui
                });
                setMensagem('');
                setSucesso('S');
            } else {
                setMensagem('Senha incorreta');
            }
        } catch (erro) {
            setMensagem('Erro ao atualizar cliente');
            setSucesso('N');
            console.error('Erro ao atualizar cliente:', erro);
        }
    };
    const [display, setDisplay] = useState('');

    const handleClick = (value) => {
        setDisplay(display + value);
    };

    const calculate = () => {
        try {
            setDisplay(eval(display).toString());
        } catch (error) {
            setDisplay('Error');
        }
    };

    const clearDisplay = () => {
        setDisplay('');
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
    return (
        <div>
            <div className="background13">
                <form className="box">

                    <div className=" box1">
                        <div className="title">
                            <h1>
                                <u>De olho na qualidade</u>
                            </h1>
                        </div>

                        <div className="divNota">
                            <div className="divCaixaNOta">
                                <h1>
                                    Nota
                                </h1>
                                <select className="custom-select" onChange={(e) => setNota(e.target.value)} value={nota} id="estado" required>
                                    <option value="100">100%</option>
                                    <option value="90">90%</option>
                                    <option value="80">80%</option>
                                    <option value="70">70%</option>
                                    <option value="60">60%</option>
                                    <option value="50">50%</option>
                                    <option value="40">40%</option>
                                    <option value="30">30%</option>
                                    <option value="20">20%</option>
                                    <option value="10">10%</option>
                                    <option value="0">0%</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="areaqr">
                        {cameraActive && (
                            <QrReader
                                delay={10000}
                                onError={handleError}
                                onScan={handleScan}
                                style={{ width: '100%' }}
                            />
                        )}
                        {/* Renderizar o componente do QR Code somente se houver dados escaneados */}
                        {scannedData && (
                            <div className="qr-code">
                                <QRCode value={formState.qrCode} />
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="caixa-cobrador">
                            <div className="input-group-prendend">
                                <span className="input-group-text">Data da Monitoria:</span>
                            </div>
                            <input onChange={(e) => setDataMonitoria(e.target.value)} value={dataMonitoria} id="date" type="date" className="form-control" />
                        </div>
                        <div className="caixa-cobrador">
                            <div className="input-group-prendend">
                                <span className="input-group-text">Nome do Monitor:</span>
                            </div>
                            <input onChange={(e) => setNomeMonitor(e.target.value)} value={nomeMonitor} id="date" type="text" placeholder="Insira seu nome completo." className="form-control" />
                        </div>
                        <div className="caixa-cobrador">
                            <div className="input-group-prendend">
                                <span className="input-group-text">CNPJ:</span>
                            </div>
                            <input onChange={(e) => setCpf(e.target.value)} value={cpf} id="date" type="text" placeholder="CNPJ do cliente." className="form-control" />
                        </div>
                        <div className="caixa-cobrador">
                            <div className="input-group-prendend">
                                <span className="input-group-text">Telefone:</span>
                            </div>
                            <input onChange={(e) => setFone(e.target.value)} value={fone} id="date" placeholder="Numero de telefone." type="text" className="form-control" />
                        </div>
                        <div className="caixa-cobrador">
                            <div className="input-group-prendend">
                                <span className="input-group-text">Ramal:</span>
                            </div>
                            <input onChange={(e) => setRamal(e.target.value)} value={ramal} id="date" placeholder="Ramal do operador." type="text" className="form-control" />
                        </div>
                        <div className="caixa-cobrador">
                            <div className="input-group-prendend">
                                <span className="input-group-text">Valor:</span>
                            </div>
                            <input onChange={(e) => setValor(e.target.value)} value={valor} id="date" placeholder="Valor do plano." type="text" className="form-control" />
                        </div>
                        <div className="caixa-cobrador">
                            <div className="input-group-prendend">
                                <span className="input-group-text">Vencimento:</span>
                            </div>
                            <input onChange={(e) => setVenc2(e.target.value)} value={venc2} id="date" placeholder="Data de vencimento." type="text" className="form-control" />
                        </div>
                        <hr />
                        <div className="box2">
                            <div className="title ">
                                <h1>
                                    <u>Apresentação</u>
                                </h1>
                            </div>
                        </div>
                        <div className="form-check  divSimOuNao">
                            <div>
                                <b><span>Se apresenta com nome ou sobrenome</span></b>
                            </div>
                            <div className="divEscolha">

                                <input onChange={(e) => setApresentacaoSim(e.target.checked)} checked={apresentacaoSim} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Sim</b>
                                </label>
                            </div>
                            <div className="divEscolha">
                                <input onChange={(e) => setApresentacaoNao(e.target.checked)} checked={apresentacaoNao} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Não</b>
                                </label>
                                <span> - 10 pontos</span>

                            </div>
                        </div>
                        <div className="form-check  divSimOuNao">
                            <div>
                                <b><span>Informa que somos do Grupo Maps</span></b>
                            </div>
                            <div className="divEscolha">

                                <input onChange={(e) => setGrupoSim(e.target.checked)} checked={grupoSim} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Sim</b>
                                </label>
                            </div>
                            <div className="divEscolha">
                                <input onChange={(e) => setGrupoNao(e.target.checked)} checked={grupoNao} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Não</b>
                                </label>
                                <span> - 20 pontos</span>

                            </div>
                        </div>

                        <div className="box2">
                            <div className="title ">
                                <h1>
                                    <u>Produto</u>
                                </h1>
                            </div>
                        </div>
                        <div className="form-check  divSimOuNao">
                            <div>
                                <b><span>Explica de forma clara o produto e seus beneficios?</span></b>
                            </div>
                            <div className="divEscolha">

                                <input onChange={(e) => setProdutosSim(e.target.checked)} checked={produtosSim} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Sim</b>
                                </label>
                            </div>
                            <div className="divEscolha">
                                <input onChange={(e) => setProdutosNao(e.target.checked)} checked={produtosNao} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Não</b>
                                </label>
                                <span> - 10 pontos</span>

                            </div>
                        </div>
                        <div className="form-check  divSimOuNao">
                            <div>
                                <b><span>Confirma com o cliente o endereço, e-mail e telefones para contato?</span></b>
                            </div>
                            <div className="divEscolha">

                                <input onChange={(e) => setConfirmSim(e.target.checked)} checked={confirmSim} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Sim</b>
                                </label>
                            </div>
                            <div className="divEscolha">
                                <input onChange={(e) => setConfirmNao(e.target.checked)} checked={confirmNao} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Não</b>
                                </label>
                                <span> - 10 pontos</span>

                            </div>
                        </div>
                        <div className="form-check  divSimOuNao">
                            <div>
                                <b><span>Informa o valor e a data de vencimento?</span></b>
                            </div>
                            <div className="divEscolha">

                                <input onChange={(e) => setInformSim(e.target.checked)} checked={informSim} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Sim</b>
                                </label>
                            </div>
                            <div className="divEscolha">
                                <input onChange={(e) => setInformNao(e.target.checked)} checked={informNao} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Não</b>
                                </label>
                                <span> - 10 pontos</span>

                            </div>
                        </div>
                        <div className="form-check  divSimOuNao">
                            <div>
                                <b><span>Informa as opções para pagamento?</span></b>
                            </div>
                            <div className="divEscolha">

                                <input onChange={(e) => setPagamentoSim(e.target.checked)} checked={pagamentoSim} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Sim</b>
                                </label>
                            </div>
                            <div className="divEscolha">
                                <input onChange={(e) => setPagamentoNao(e.target.checked)} checked={pagamentoNao} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Não</b>
                                </label>
                                <span> - 10 pontos</span>

                            </div>
                        </div>
                        <div className="form-check  divSimOuNao">
                            <div>
                                <b><span>Tem a confirmação do cliente?</span></b>
                            </div>
                            <div className="divEscolha">

                                <input onChange={(e) => setClienteSim(e.target.checked)} checked={clienteSim} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Sim</b>
                                </label>
                            </div>
                            <div className="divEscolha">
                                <input onChange={(e) => setClienteNao(e.target.checked)} checked={clienteNao} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Não</b>
                                </label>
                                <span> - 20 pontos</span>

                            </div>
                        </div>
                        <div className="form-check  divSimOuNao">
                            <div>
                                <b><span>Solicita nome e sobrenome do autorizante?</span></b>
                            </div>
                            <div className="divEscolha">

                                <input onChange={(e) => setNamesSim(e.target.checked)} checked={namesSim} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Sim</b>
                                </label>
                            </div>
                            <div className="divEscolha">
                                <input onChange={(e) => setNamesNao(e.target.checked)} checked={namesNao} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Não</b>
                                </label>
                                <span> - 10 pontos</span>

                            </div>
                        </div>

                        <div className="box2">
                            <div className="title ">
                                <h1>
                                    <u>Auditoria</u>
                                </h1>
                            </div>
                        </div>
                        <div className="caixa-cobrador">
                            <div className="input-group-prendend">
                                <span className="input-group-text">Nome do Auditor:</span>
                            </div>
                            <input onChange={(e) => setAuditor(e.target.value)} value={auditor} id="date" type="text" placeholder="Insira OK para tudo certo ou insira sua observação de melhoria." className="form-control" />
                        </div>
                        <div className="form-check  divSimOuNao">
                            <div>
                                <b><span>Informa sobre o envio das fotos?</span></b>
                            </div>
                            <div className="divEscolha">

                                <input onChange={(e) => setEnvioSim(e.target.checked)} checked={envioSim} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Sim</b>
                                </label>
                            </div>
                            <div className="divEscolha">
                                <input onChange={(e) => setEnvioNao(e.target.checked)} checked={envioNao} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Não</b>
                                </label>
                                <span> - 10 pontos</span>

                            </div>
                        </div>
                        <div className="form-check  divSimOuNao">
                            <div>
                                <b><span>Confirma o nome e o sobrenome do cliente?</span></b>
                            </div>
                            <div className="divEscolha">

                                <input onChange={(e) => setNomeAuditoriaSim(e.target.checked)} checked={nomeAuditoriaSim} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Sim</b>
                                </label>
                            </div>
                            <div className="divEscolha">
                                <input onChange={(e) => setNomeAuditoriaNao(e.target.checked)} checked={nomeAuditoriaNao} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Não</b>
                                </label>
                                <span> - 10 pontos</span>

                            </div>
                        </div>

                        <div className="form-check  divSimOuNao">
                            <div>
                                <b><span>Confirma o valor e a data de vencimento?</span></b>
                            </div>
                            <div className="divEscolha">

                                <input onChange={(e) => setDataAuditoriaSIm(e.target.checked)} checked={dataAuditoriaSIm} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Sim</b>
                                </label>
                            </div>
                            <div className="divEscolha">
                                <input onChange={(e) => setDataAuditoriaNao(e.target.checked)} checked={dataAuditoriaNao} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Não</b>
                                </label>
                                <span> - 10 pontos</span>

                            </div>
                        </div>

                        <div className="form-check  divSimOuNao">
                            <div>
                                <b><span>Passa a informação do CDC ART.49?</span></b>
                            </div>
                            <div className="divEscolha">

                                <input onChange={(e) => setArtigoSim(e.target.checked)} checked={artigoSim} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Sim</b>
                                </label>
                            </div>
                            <div className="divEscolha">
                                <input onChange={(e) => setArtigoNao(e.target.checked)} checked={artigoNao} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Não</b>
                                </label>
                                <span> - 10 pontos</span>

                            </div>
                        </div>
                        <hr />

                        <div className="box2">
                            <div className="title2 ">
                                <h1>
                                    <b>Falha Grave</b> - zera a nota de qualidade
                                </h1>
                            </div>
                        </div>
                        <div className="form-check  divSimOuNao">
                            <div>
                                <b><span>Informa que somos da Google?</span></b>
                            </div>
                            <div className="divEscolha">

                                <input onChange={(e) => setGoogleSim(e.target.checked)} checked={googleSim} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Sim</b>
                                </label>
                            </div>
                            <div className="divEscolha">
                                <input onChange={(e) => setGoogleNao(e.target.checked)} checked={googleNao} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Não</b>
                                </label>

                            </div>
                        </div>
                        <div className="form-check  divSimOuNao">
                            <div>
                                <b><span>Vendas sem compromisso?</span></b>
                            </div>
                            <div className="divEscolha">

                                <input onChange={(e) => setCompromissoSim(e.target.checked)} checked={compromissoSim} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Sim</b>
                                </label>
                            </div>
                            <div className="divEscolha">
                                <input onChange={(e) => setCompromissoNao(e.target.checked)} checked={compromissoNao} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Não</b>
                                </label>

                            </div>
                        </div>
                        <div className="form-check  divSimOuNao">
                            <div>
                                <b><span>Informa uma data de vencimento e preenche outra na ficha?</span></b>
                            </div>
                            <div className="divEscolha">

                                <input onChange={(e) => setFichaCorretaSim(e.target.checked)} checked={fichaCorretaSim} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Sim</b>
                                </label>
                            </div>
                            <div className="divEscolha">
                                <input onChange={(e) => setFichaCorretaNao(e.target.checked)} checked={fichaCorretaNao} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Não</b>
                                </label>

                            </div>
                        </div>
                        <div className="form-check  divSimOuNao">
                            <div>
                                <b><span>Concede desconto sem autorização?</span></b>
                            </div>
                            <div className="divEscolha">

                                <input onChange={(e) => setDescontosSim(e.target.checked)} checked={descontosSim} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Sim</b>
                                </label>
                            </div>
                            <div className="divEscolha">
                                <input onChange={(e) => setDescontosNao(e.target.checked)} checked={descontosNao} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Não</b>
                                </label>

                            </div>
                        </div>
                        <div className="caixa-cobrador">
                            <div className="input-group-prendend">
                                <span className="input-group-text">Observação:</span>
                            </div>
                            <input onChange={(e) => setObsMonitoria(e.target.value)} value={obsMonitoria} id="date" type="text" placeholder="Insira OK para tudo certo ou insira sua observação de melhoria." className="form-control" />
                        </div>
                        <div className="d-flex justify-content-center align-items-center flex-column my-3">
                            <label htmlFor="monitor" className="me-2">Selecione o monitor:</label>
                            <select
                                id="monitor"
                                value={nomeMonitor}
                                onChange={(e) => setNomeMonitor(e.target.value)}
                                className="escolhaMonitor"
                            >
                                <option value="">Selecione...</option>
                                <option value="Gabriela">Gabriela</option>
                                <option value="Andrew">Andrew</option>
                            </select>
                        </div>


                        <div>
                            <p className="red"> - Use a calculadora para verificar a nota do usuario.</p>
                        </div>
                        <div className="calculator">
                            <input className="display" type="text" value={display} readOnly />
                            <div className="btnGeral">
                                <button type="button" className="btnCalc" onClick={() => handleClick('1')}>1</button>
                                <button type="button" className="btnCalc" onClick={() => handleClick('2')}>2</button>
                                <button type="button" className="btnCalc" onClick={() => handleClick('3')}>3</button>
                                <button type="button" className="btnCalc" onClick={() => handleClick('+')}>+</button>
                                <button type="button" className="btnCalc" onClick={() => handleClick('4')}>4</button>
                                <button type="button" className="btnCalc" onClick={() => handleClick('5')}>5</button>
                                <button type="button" className="btnCalc" onClick={() => handleClick('6')}>6</button>
                                <button type="button" className="btnCalc" onClick={() => handleClick('-')}>-</button>
                                <button type="button" className="btnCalc" onClick={() => handleClick('7')}>7</button>
                                <button type="button" className="btnCalc" onClick={() => handleClick('8')}>8</button>
                                <button type="button" className="btnCalc" onClick={() => handleClick('9')}>9</button>
                                <button type="button" className="btnCalc" onClick={() => handleClick('*')}>*</button>
                                <button type="button" className="btnCalc" onClick={() => handleClick('0')}>0</button>
                                <button type="button" className="btnCalc" onClick={() => handleClick('.')}>.</button>
                                <button type="button" className="btnCalc" onClick={clearDisplay}>C</button>
                                <button type="button" className="btnCalc" onClick={calculate}>=</button>
                            </div>
                        </div>

                        <br />
                        <div className="divMkt">
                            <h5>
                                Encaminhar cliente para o marketing?
                            </h5>
                        </div>
                        <div className="encaminhar row">

                            <div className="form-check mb-3">
                                <input onChange={(e) => setEncaminharCliente(e.target.checked)} checked={encaminharCliente} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Sim</b>
                                </label>
                            </div>
                            <div className="form-check mb-3">
                                <input onChange={(e) => setNaoEncaminharCliente(e.target.checked)} checked={naoEncaminharCliente} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <b>Não</b>
                                </label>
                            </div>
                        </div>

                    </div>
                    {mensagem.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{mensagem}</div> : null}
                    {sucesso === 'S' ? <Navigate to='/app/monitoriamapsempresas' /> : null}
                </form>
            </div >
            <div className="voltar row">
                <Link to="/app/monitoriamapsempresas" className="btn btn-warning btn-acao">Voltar</Link>
                <button onClick={AlterarCliente} type="button" className="btn btn-primary btn-acao">Salvar</button>
            </div>
        </div >
    );
}

export default FichaMonitoria;