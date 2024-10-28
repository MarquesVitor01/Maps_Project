import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from 'react-router-dom';
import '../EditarCliente/editarcliente.css'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import 'firebase/firestore'
import QRCode from 'qrcode.react';
import QrReader from 'react-qr-scanner';
import qrCode from 'qrcode';
function EditarCliente(props) {
    const [formState, setFormState] = useState({ qrCode: 'Your QR Code Data Here' });
    const [numeroContrato, setNumeroContrato] = useState('');
    const [plano, setPlano] = useState('');
    const [data, setData] = useState('');
    const [bairro, setBairro] = useState('');
    const [obs, setObs] = useState('');
    const [funcionamento, setFuncionamento] = useState('');
    const [valor, setValor] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCep] = useState('');
    const [uf, setUf] = useState('');
    const [whats, setWhats] = useState('');
    const [endereco, setEndereco] = useState('');
    const [razao, setRazao] = useState('');
    const [cpf, setCpf] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [isCnpj, setIsCnpj] = useState(true);
    const [cancelado, setCancelado] = useState('');
    const [nome, setNome] = useState('');
    const [renovSim, setRenovSim] = useState('');
    const [renovNao, setRenovNao] = useState('');
    const [validade, setValidade] = useState('');
    const [representante, setRepresentante] = useState('');
    const [cargo, setCargo] = useState('');
    const [venc2, setVenc2] = useState('');
    const [link, setLink] = useState('');
    const [sociais, setSociais] = useState('');
    const [fantasia, setFantasia] = useState('');
    const [email, setEmail] = useState('');
    const [operador, setOperador] = useState('');
    const [site, setSite] = useState('');
    const [parcelas, setParcelas] = useState('');
    const [fone, setFone] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [ramal, setRamal] = useState('');
    const [equipe, setEquipe] = useState('G MARKETING DIGITAL');
    const [celular, setCelular] = useState('');
    const [email2, setEmail2] = useState('');
    const [modelo, setModelo] = useState('');
    const [siteSim, setSiteSim] = useState(false);
    const [siteNao, setSiteNao] = useState(false);
    const [declaro, setDeclaro] = useState(true);
    const [formaPagamento, setFormaPagamento] = useState('');


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
                    setNumeroContrato(dados.numeroContrato);
                    setOperador(dados.operador);
                    setSite(dados.site);
                    setSociais(dados.sociais);
                    setLink(dados.link);
                    setRazao(dados.razao);
                    setCpf(dados.cpf);
                    setCnpj(dados.cnpj);
                    setBairro(dados.bairro);
                    setCep(dados.cep);
                    setCidade(dados.cidade);
                    setEndereco(dados.endereco);
                    setFantasia(dados.fantasia);
                    setObs(dados.obs);
                    setUf(dados.uf);
                    setBairro(dados.bairro);
                    setWhats(dados.whats);
                    setFuncionamento(dados.funcionamento);
                    setValor(dados.valor);
                    setNome(dados.nome);
                    setEmail(dados.email);
                    setFone(dados.fone);
                    setData(dados.data);
                    setPlano(dados.plano);
                    setValidade(dados.validade);
                    setRenovSim(dados.renovSim);
                    setRenovNao(dados.renovNao);
                    setVenc2(dados.venc2);
                    setRepresentante(dados.representante);
                    setCargo(dados.cargo);
                    setParcelas(dados.parcelas);
                    setRamal(dados.ramal);
                    setSiteSim(dados.siteSim);
                    setSiteNao(dados.siteNao);
                    setCelular(dados.celular);
                    setEquipe(dados.equipe);
                    setDeclaro(dados.declaro);
                    setEmail2(dados.email2);
                    setModelo(dados.modelo);
                    setFormaPagamento(dados.formaPagamento);
                    setCancelado(dados.cancelado);
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
            if (nome.length === 0) {
                setMensagem('Informe o nome');
            } else if (email.length === 0) {
                setMensagem('Informe o e-mail');
            } else {
                await updateDoc(doc(db, 'clientes', id), {
                    nome: nome,
                    link: link,
                    operador: operador,
                    sociais: sociais,
                    site: site,
                    email: email,
                    fone: fone,
                    numeroContrato: numeroContrato,
                    razao: razao,
                    cpf: cpf,
                    cnpj: cnpj,
                    fantasia: fantasia,
                    endereco: endereco,
                    bairro: bairro,
                    uf: uf,
                    cidade: cidade,
                    cep: cep,
                    whats: whats,
                    obs: obs,
                    funcionamento: funcionamento,
                    valor: valor,
                    plano: plano,
                    renovNao: renovNao,
                    renovSim: renovSim,
                    validade: validade,
                    cancelado: cancelado,
                    data: data,
                    venc2: venc2,
                    representante: representante,
                    cargo: cargo,
                    parcelas: parcelas,
                    ramal: ramal,
                    siteSim: siteSim,
                    siteNao: siteNao,
                    celular: celular,
                    equipe: equipe,
                    declaro: declaro,
                    email2: email2,
                    modelo: modelo,
                    modelo: modelo,
                    formaPagamento: formaPagamento,
                    qrCode: formState.qrCode, 
                });
                setMensagem('');
                setSucesso('S');
            }
        } catch (erro) {
            setMensagem('Erro ao atualizar cliente');
            setSucesso('N');
            console.error('Erro ao atualizar cliente:', erro);
        }
    };
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

    const handleScan = (data) => {
        if (data) {
            setScannedData(data);
            setCameraActive(false);
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
    const handleCnpj = () => {
        setIsCnpj(prevState => !prevState);
    };
    const formatCNPJ = (value) => {
        value = value.replace(/\D/g, '');

        value = value.replace(/(\d{2})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1/$2');
        value = value.replace(/(\d{4})(\d{1,2})$/, '$1-$2');

        return value;
    };

    const formatCPF = (value) => {
        value = value.replace(/\D/g, '');

        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

        return value;
    };
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
                                    <input className="form-control" onChange={(e) => setNumeroContrato(e.target.value)} value={numeroContrato} type="text" id="contrato" placeholder="Nº" />
                                </td>
                                <td className="baixo ">
                                    <p><b>DATA</b></p>
                                    <input onChange={(e) => setData(e.target.value)} value={data} id="date" type="date" className="form-control" />
                                </td>
                                <td className="baixo ">
                                    <p><b>OPERADOR</b></p>
                                    <input onChange={(e) => setOperador(e.target.value)} value={operador} id="text" type="text" className="form-control" placeholder="Operador" />
                                </td>
                                <td className="baixo baixo-medio">
                                    <p><b>EQUIPE</b></p>
                                    <input onChange={(e) => setEquipe(e.target.value)} disabled value={equipe} id="text" type="text" className="form-control" placeholder="Equipe" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="acessoriaNew ">
                        <div className="input-group row">
                            <h2 className="font-weight-bold frase">
                            <u>VALIDO POR 1 ANO, PLANO:</u>
                            </h2>
                            <div className="col-sm-4 select-validade">
                                <select className="custom-select d-block escolha-select form-select form-select-sm" onChange={(e) => setValidade(e.target.value)} id="estado" required>
                                    <option value="">{validade}</option>
                                    <option value="mensal">Mensal</option>
                                    <option value="trimestral">Trimestral</option>
                                    <option value="semestral">Semestral</option>
                                    <option value="anual">Anual</option>
                                </select>
                            </div>
                            <h2 className="font-weight-bold frase">
                                <u>CANCELAMENTO:</u>
                            </h2>
                            <div className="col-sm-2 select-validade">
                                <select className="custom-select d-block escolha-select form-select form-select-sm" onChange={(e) => setCancelado(e.target.value)} id="estado" >
                                    <option value="">{cancelado}</option>
                                    <option value="sim">SIM</option>
                                    <option value="nao">NÃO</option>
                                </select>
                            </div>
                            <div className="col-sm-4">
                                <select className="custom-select d-block escolha-select form-select form-select-sm" onChange={(e) => setModelo(e.target.value)} id="estado" required>
                                    <option value="">{modelo}</option>
                                    <option value="renovacao">Renovação</option>
                                    <option value="base">Base</option>
                                </select>
                            </div>
                            <button className="btn" onClick={handleCnpj}>{!isCnpj && "CNPJ"} {isCnpj && "CPF"}</button>
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
                                    value={razao}
                                    className="form-control"
                                    placeholder="Razão social"
                                />
                            </div>

                            {!isCnpj ? (
                                <div className="col-md-6">
                                    <label className="d-flex align-items-center justify-content-center" htmlFor="cnpj"><b>CNPJ:</b></label>
                                    <input
                                        type="text"
                                        id="cnpj"
                                        name="cnpj"
                                        value={cnpj} // Use o estado para controlar o valor do input
                                        onChange={(e) => {
                                            const formattedCnpj = formatCNPJ(e.target.value);
                                            setCnpj(formattedCnpj); // Atualiza o estado com o CNPJ formatado
                                        }}
                                        className="form-control"
                                        placeholder="Insira o CNPJ"
                                        maxLength="18" // O comprimento máximo deve ser 18 para o formato completo
                                    />

                                </div>
                            ) : (
                                <div className="col-md-6">
                                    <label className="d-flex align-items-center justify-content-center" htmlFor="cpf"><b>CPF:</b></label>
                                    <input
                                        type="text"
                                        id="cpf"
                                        name="cpf"
                                        value={cpf} // Use the value from the state
                                        onChange={(e) => {
                                            const formattedCpf = formatCPF(e.target.value);
                                            setCpf(formattedCpf); // Set the formatted CPF in the state
                                        }}
                                        className="form-control"
                                        placeholder="Insira o CPF"
                                        maxLength="14"
                                    />
                                </div>
                            )}


                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <label className="d-flex align-items-center justify-content-center" htmlFor="lblInfo"><b>NOME FANTASIA:</b></label>
                                <input
                                    type="text"
                                    id="nomeFantasia"
                                    name="nomeFantasia"
                                    onChange={(e) => setFantasia(e.target.value)}
                                    value={fantasia}
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
                                    value={endereco}
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
                                    value={bairro}
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
                                    value={cep}
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
                                    value={uf}
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
                                    value={cidade}
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
                                    value={fone}
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
                                    value={celular}
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
                                    value={whats}
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
                                    value={email}
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
                                    value={email2}
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
                                    value={funcionamento}
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
                                <label htmlFor="temLojaFisica" className="form-check-label"><b>ANÚNCIO PATROCINADO GOOGLE ADS</b></label>
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
                                <label className="d-flex align-items-center justify-content-center" htmlFor="razaoSocial"><b>LINK DA PÁGINA GOOGLE:</b></label>
                                <input
                                    type="text"
                                    id="razaoSocial"
                                    name="razaoSocial"
                                    onChange={(e) => setLink(e.target.value)}
                                    value={link}
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
                                    value={obs}
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
                                    value={nome}
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
                                    value={cargo}
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
                    {/* <div className="logo ">
                        <img src="../../../img/tag.png" alt="" />
                    </div> */}
                    <div className="cond ">
                    <u className="font-weight-bold">CONDIÇÕES</u><p className=" font-weight-bold "> 1º- ESTOU CIENTE QUE PARA CRIAÇÃO OU ATUALIZAÇÃO DA MINHA PAGÍNA DEVO ENCAMINHAR PARA A EMPRESA CONTRATADA QUANDO SOLICITADO POR PARTE DA EQUIPE DE SUPORTE TODAS AS INFORMAÇÕES NECESSARIAS. <br /> 2º- ASSUMO TAMBÉM A TOTAL RESPONSABILIDADE E AUTORIZO QUE A EMPRESA CONTRATADA DIVULGUE OS MEUS DADOS COMERCIAIS NO SITE DE BUSCA. <br /> 3º- SOBRE AS CONDIÇÕES ASSUMO AS OBRIGAÇÕES COM ESTA PRESTAÇÃO DE SERVIÇOS DE MARKETING DIGITAL REALIZADA PELA EMPRESA G MAPS CONTACT CENTER LTDA CNPJ; 40.407.753/0001-30 TENDO CIÊNCIA DO VALOR DE R$
                            <input className="txtAcordo txtCond" onChange={(e) => setValor(e.target.value)} value={valor} type="text" placeholder="" /> NO PLANO  {validade.toUpperCase()} .  <br /> 4º SABENDO QUE O NÃO PAGAMENTO PODE GERAR A NEGATIVAÇÃO DO CPF/CNPJ JUNTO AOS ORGÃOS COMPETENTES (SERASA/CARTÓRIO) E QUE <u>O ACEITE DOS SERVIÇOS FOI REALIZADA DE FORMA VERBAL CONFORME O ARTIGO 107 DO CODIGO CIVIL LEI 10406 DE 10 DE JANEIRO DE 2002 E QUE A CÓPIA DESTE CONTRATO FOI ENCAMINHADA PARA O E-MAIL PRINCIPAL INFORMADO ACIMA.</u> <br /> 5º-TODAS AS SOLICITAÇÕES DEVERÃO SER ENCAMINHADAS PARA O DEPARTAMENTO DE MARKETING ATRAVÉS DO E-MAIL OU WHATSAPP AQUI DISPONIBILIZADOS. <br /> 6º- A CONTRATADA ASSUME AS OBRIGAÇÕES JUNTO A CONTRATANTE DE CONCLUIR E ENTREGAR OS SERVIÇOS PRESTADOS DENTRO DO PERIODO DE ATÉ 72HORAS UTEIS.
                        </p>
                        <div className="row faixa-arrow">
                            <div className="flecha-amarela">
                                <i class="fa-solid fa-arrow-right" style={{ color: "#FFD43B" }}></i>
                            </div>
                            <div className="linha-verde ">
                                <a href="https://drive.google.com/file/d/1GkiT0FBAbJ7o7BWwWbJHYE5M_4hrGpVt/view?usp=sharing">
                                    <img src="../../../img/Imagem2.jpg" alt="" />
                                </a>
                            </div>
                            <div className="flecha-amarela">
                                <i class="fa-solid fa-arrow-left" style={{ color: "#FFD43B" }}></i>
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
                                    <input className="txtAcordo" onChange={(e) => setVenc2(e.target.value)} type="date" value={venc2}/>
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
                                </b>
                            </h3>
                        </div>
                    </div>
                </div>
                {mensagem.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{mensagem}</div> : null}
                {sucesso === 'S' ? <Navigate to='/app/home' /> : null}
            </div>

            <div className="row salvar ">
                <Link to="/app/home" className="btn btn-warning btn-acao">Cancelar</Link>
                <button onClick={AlterarCliente} type="button" className="btn btn-primary btn-acao">Salvar</button>
            </div>
        </div>
    </div>
}
export default EditarCliente;