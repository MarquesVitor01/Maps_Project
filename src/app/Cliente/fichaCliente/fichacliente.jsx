import React, { useState, useEffect } from "react";
import { Link, useParams, Navigate } from 'react-router-dom';
import '../EditarCliente/editarcliente.css'
import './fichacliente.css'
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import 'firebase/firestore'
import emailjs from 'emailjs-com';
import html2pdf from "html2pdf.js";

function FichaCliente(props) {
    const [loader, setLoader] = useState(false);
    const [numeroContrato, setNumeroContrato] = useState('');
    const [plano, setPlano] = useState('');
    const [sociais, setSociais] = useState('');
    const [site, setSite] = useState('');
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
    const [link, setLink] = useState('');
    const [razao, setRazao] = useState('');
    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [renovSim, setRenovSim] = useState('');
    const [parcelas, setParcelas] = useState('');
    const [renovNao, setRenovNao] = useState('');
    const [validade, setValidade] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [fantasia, setFantasia] = useState('');
    const [representante, setRepresentante] = useState('');
    const [cargo, setCargo] = useState('');
    const [operador, setOperador] = useState('');
    const [venc2, setVenc2] = useState('');
    const [email, setEmail] = useState('');
    const [fone, setFone] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [isScriptModalVisible, setScriptModalVisible] = useState(false);
    const handleMostrarScript = () => {
        setScriptModalVisible(true);
    };
    const handleFecharScriptModal = () => {
        setScriptModalVisible(false);
    };
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
                    setRazao(dados.razao);
                    setCpf(dados.cpf);
                    setLink(dados.link);
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
                    setSucesso(dados.sucesso);
                    setOperador(dados.operador);
                    setSociais(dados.sociais);
                    setSite(dados.site);
                    setParcelas(dados.parcelas);
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
            docHTML.appendChild(elemento.cloneNode(true));
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
    const ScriptModal = ({ onClose }) => {

        const [attachment, setAttachment] = useState(null);

        const handleSendEmail = async () => {
            const serviceID = 'service_9fer5al';
            const templateID = 'template_omvbb2y';
            const userID = 'DkZxCeqcBJqtQF_H_';
            
            try {
                await emailjs.send(serviceID, templateID, {
                    to_email: email,
                    message: "oioioioioioioio",
                }, userID, attachment);
                console.log('E-mail enviado com sucesso!');
            } catch (error) {
                console.error('Erro ao enviar e-mail:', error);
            }
        };
        const handleFileChange = (event) => {
            const file = event.target.files[0];
            setAttachment(file);
        };
        return (
            <div className="script-modal over">
                <div className="script-modal-content ">
                    <span className="close" onClick={onClose}>&times;</span>
                    <br />
                    <div className="caixa-modal">
                        <h5>
                            <b>ENCAMINHE APENAS PARA OS NOVOS CLIENTES!!!</b>
                        </h5>
                        <p>
                            O e-mail vai com a mensagem automática de bem vindo para os novos clientes. <br />
                            Só é necessario incluir o arquivo da venda e clicar no icone de enviar.
                        </p>
                        <div className="campo-modal">
                            <input type="file" onChange={handleFileChange} />
                            <button className="btn btn-danger btn-climodal" onClick={handleSendEmail}><i className="fa-solid fa-share"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return <div>
        <div className="background">
            <div className="element contrato container-fluid titulo-2" id="formId">
                <div>
                    <div className="texto-cima">
                        <h1>
                            <b>AUTORIZAÇÃO PARA ASSESSORIA COM A DIVULGAÇÃO DOS DADOS
                                COMERCIAIS NA PLATAFORMA DO GOOGLE MAPS</b>
                        </h1>
                    </div>
                    <div className="logo-street">
                        <img src="../../../img/maps--1-.webp" alt="" />
                    </div>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td className="baixo">
                                <p>CONTRATO:</p>
                                <input onChange={(e) => setNumeroContrato(e.target.value)} disabled value={numeroContrato} type="text" id="contrato" className="form-control" placeholder="Nº" required />
                            </td>
                            <td className="baixo">
                                <p>DATA:</p>
                                <input onChange={(e) => setData(e.target.value)} disabled value={data} id="date" type="date" className="form-control" />
                            </td>
                            <td className="baixo">
                                <p>OPERADOR:</p>
                                <input onChange={(e) => setOperador(e.target.value)} disabled value={operador} id="text" type="text" className="form-control" placeholder="Operador" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <form className="caixa2">
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="razaoSocial">Razão Social:</label>
                            <input
                                type="text"
                                id="razaoSocial"
                                name="razaoSocial"
                                onChange={(e) => setRazao(e.target.value)}
                                className="form-control"
                                placeholder="Razão social"
                                disabled value={razao}
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="nomeFantasia">Nome Fantasia:</label>
                            <input
                                type="text"
                                id="nomeFantasia"
                                name="nomeFantasia"
                                onChange={(e) => setFantasia(e.target.value)}
                                className="form-control"
                                placeholder="Nome Fantasia"
                                disabled value={fantasia}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="razaoSocial">CNPJ/CPF:</label>
                            <input
                                type="text"
                                id="razaoSocial"
                                name="razaoSocial"
                                onChange={(e) => setCpf(e.target.value)}
                                className="form-control"
                                placeholder="CNPJ/CPF"
                                disabled value={cpf}
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="nomeFantasia">Endereço:</label>
                            <input
                                type="text"
                                id="nomeFantasia"
                                name="nomeFantasia"
                                onChange={(e) => setEndereco(e.target.value)}
                                className="form-control"
                                placeholder="Endereço"
                                disabled value={endereco}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="razaoSocial">Cidade:</label>
                            <input
                                type="text"
                                id="razaoSocial"
                                name="razaoSocial"
                                onChange={(e) => setCidade(e.target.value)}
                                className="form-control"
                                placeholder="Cidade"
                                disabled value={cidade}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="nomeFantasia">Bairro:</label>
                            <input
                                type="text"
                                id="nomeFantasia"
                                name="nomeFantasia"
                                onChange={(e) => setBairro(e.target.value)}
                                className="form-control"
                                placeholder="Bairro"
                                disabled value={bairro}
                            />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="nomeFantasia">Estado:</label>
                            <input
                                type="text"
                                id="nomeFantasia"
                                name="nomeFantasia"
                                onChange={(e) => setUf(e.target.value)}
                                className="form-control"
                                placeholder="Estado"
                                disabled value={uf}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="razaoSocial">CEP:</label>
                            <input
                                type="text"
                                id="razaoSocial"
                                name="razaoSocial"
                                onChange={(e) => setCep(e.target.value)}
                                className="form-control"
                                placeholder="Cep"
                                disabled value={cep}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="razaoSocial">WhatsApp:</label>
                            <input
                                type="text"
                                id="razaoSocial"
                                name="razaoSocial"
                                onChange={(e) => setWhats(e.target.value)}
                                className="form-control"
                                placeholder="WhatsApp"
                                disabled value={whats}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="nomeFantasia">Telefone:</label>
                            <input
                                type="text"
                                id="nomeFantasia"
                                name="nomeFantasia"
                                onChange={(e) => setFone(e.target.value)}
                                className="form-control"
                                placeholder="Telefone"
                                disabled value={fone}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="horario">Horario de funcionamento:</label>
                            <input
                                type="text"
                                id="nomeFantasia"
                                name="nomeFantasia"
                                onChange={(e) => setFuncionamento(e.target.value)}
                                className="form-control"
                                placeholder="Horario de funcionamento"
                                disabled value={funcionamento}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="razaoSocial">E-mail:</label>
                            <input
                                type="text"
                                id="razaoSocial"
                                name="razaoSocial"
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                placeholder="E-mail"
                                disabled value={email}
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="site">Site:</label>
                            <input
                                type="text"
                                id="nomeFantasia"
                                name="nomeFantasia"
                                onChange={(e) => setSite(e.target.value)}
                                className="form-control"
                                placeholder="Site"
                                disabled value={site}
                            />
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="razaoSocial">Link da Página:</label>
                            <input
                                type="text"
                                id="razaoSocial"
                                name="razaoSocial"
                                onChange={(e) => setLink(e.target.value)}
                                className="form-control"
                                placeholder="Link"
                                disabled value={link}
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="nomeFantasia">Autorizante:</label>
                            <input
                                type="text"
                                id="nomeFantasia"
                                name="nomeFantasia"
                                onChange={(e) => setNome(e.target.value)}
                                className="form-control"
                                placeholder="Autorizante"
                                disabled value={nome}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="nomeFantasia">Cargo:</label>
                            <input
                                type="text"
                                id="nomeFantasia"
                                name="nomeFantasia"
                                onChange={(e) => setCargo(e.target.value)}
                                className="form-control"
                                placeholder="Cargo"
                                disabled value={cargo}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="razaoSocial">Redes Sociais:</label>
                            <input
                                type="text"
                                id="razaoSocial"
                                name="razaoSocial"
                                onChange={(e) => setSociais(e.target.value)}
                                className="form-control"
                                placeholder="Redes"
                                disabled value={sociais}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="nomeFantasia">Observações:</label>
                            <input
                                type="text"
                                id="nomeFantasia"
                                name="nomeFantasia"
                                onChange={(e) => setObs(e.target.value)}
                                className="form-control"
                                placeholder="Observações"
                                disabled value={obs}
                            />
                        </div>
                    </div>
                    <div className="row atualizacao">
                        <div className="custom-control custom-checkbox col-md-1.7 mb-3">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="atualizacao"
                                checked={checkboxes.atualizacao}
                                onChange={() => handleCheckboxChange("atualizacao")}
                            />
                            <label className="custom-control-label" htmlFor="atualizacao">
                                Atualização
                            </label>
                        </div>
                        <p className=" mb-3 font-weight-bold"> - </p>

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
                    <div className="input-group planos">
                        <div className="input-group-prendend ">
                            <span className="input-group-text">Plano</span>
                        </div>
                        <select className="custom-select d-block " disabled onChange={(e) => setPlano(e.target.value)} id="estado" required>
                            <option value="">{plano}</option>
                            <option value="Cancelamento">Cancelamento</option>
                            <option value="Mensal">Mensal</option>
                            <option value="Trimestral">Trimestral</option>
                            <option value="Semestral">Semestral</option>
                            <option value="Anual">Anual</option>
                        </select>
                        <div className="invalid-feedback">
                            Por favor, insira um estado válido.
                        </div>
                        <div className="input-group-prendend ">
                            <span className="input-group-text">Vencimento</span>
                        </div>
                        <div className="pre">
                            <input onChange={(e) => setVenc2(e.target.value)} disabled value={venc2} id="date" className="form-control " type="date" />
                        </div>

                    </div>
                    <div className=" input-group">
                        <div className="input-group-prendend ">
                            <span className="input-group-text">Nª</span>
                        </div>
                        <select className="custom-select d-block" onChange={(e) => setParcelas(e.target.value)} disabled id="parcelas" required>
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
                        <div className="input-group-prendend  ">
                            <span className="input-group-text">Parcela(s) de: </span>
                        </div>
                        <div className="input-group-prendend  ">
                            <span className="input-group-text">R$ </span>
                        </div>
                        <div className="pre">
                            <input onChange={(e) => setValor(e.target.value)} disabled value={valor} type="text" className="form-control " id="contrato" placeholder="Valor" required />
                        </div>
                    </div>
                </form>
                <div className="cond ">
                    <p className=" font-weight-bold ">AUTORIZO QUE A EMPRESA G MAPS CONTACT CENTER EIRELI CNPJ:40.407.753/0001-30 REALIZE O PROCESSO DE INCLUSÃO E ATUALIZAÇÃO DOS
                        MEUS DADOS COMERCIAIS JUNTO A PLATAFORMA DE BUSCA DO GOOGLE MAPS.
                        TENDO COMO GARANTIA DE INTEGRIDADE E AUTENTICIDADE DESTA AUTORIZAÇÃO PARA ASSESSORIA A GRAVAÇÃO DO ATENDIMENTO
                        PRESTADO, ESTANDO CIENTE DO VALOR E DATA DE VENCIMENTO CONFORME COMBINADO ENTRE AS PARTES.
                        APÓS O ACEITE VERBAL A EMPRESA G MAPS CONTACT CENTER EIRELI DARA INICIO AO PROCESSO DE ASSESSORIA A CONTRATANTE.
                    </p>
                    <br /><br /><br />
                    <div className="acessoria ">
                        <div className="input-group">
                            <p className="font-weight-bold frase">
                                Assessoria dos serviços valido por:
                            </p>
                            <select className="custom-select d-block escolha-select " disabled onChange={(e) => setValidade(e.target.value)} id="estado" required>
                                <option value="">{validade}</option>
                                <option value="Cancelamento">Cancelamento</option>
                                <option value="1 mes">1 mês</option>
                                <option value="3 meses">3 meses</option>
                                <option value="6 meses">6 meses</option>
                                <option value="1 ano">1 ano</option>
                            </select>
                            <p className="font-weight-bold frase">
                                a contar da data de adesão.
                            </p>
                        </div>
                    </div>
                    <hr className="mb-4" />
                    <div className="row d-flex justify-content-center renovacao" >
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
                </div>
                <div className="entorno">
                    <div className="linha3">
                        <h3 className="">
                            SUA EMPRESA PODERÁ CONTAR COM OS SEGUINTES SERVIÇOS:
                        </h3>
                    </div>
                    <div className="direitos">
                        <p className="font-weight-bold">ATUALIZAÇÃO OU CRIAÇÃO DA PÁGINA GOOGLE <br /><br />
                            CRIAÇÃO DE CARTÃO DIGITAL INTERATIVO <br /><br />
                            CRIAÇÃO DE QR CODE DIRECIONADOR <br /><br />
                            ALTERAÇÃO DE ENDEREÇO E HORÁRIO DE FUNCIONAMENTO <br /><br />
                            INCLUSÃO DE 30 FOTOS E 5 VIDEOS MENSALMENTE <br /><br />
                            RESGATE DE DOMINIO GOOGLE MEU NEGÓCIO (Opicional mediante solicitação) <br /><br />
                            ANIMAÇÃO DE LOGO-TIPO (Opicional mediante solicitação) <br /><br />
                            INCLUSÃO DE 5 BAIRROS(Opicional mediante solicitação) <br /><br />
                            VIDEO SLIDE SHOW COM FOTOS(Opicional mediante solicitação) <br /><br />
                            INCLUSÃO DE LINK DIRECIONADOR PARA WHATSAPP NA PAGINA(Opicional mediante solicitação) <br /><br />
                            INCLUSÃO DE LINKS DE REDES SOCIAIS(Opicional mediante solicitação) <br /><br />
                            SEGUIDORES INSTAGRAM(Opicional mediante solicitação) <br /><br />
                            SUPORTE PARA CRIAÇÃO DE ANUNCIOS COM GESTORES DE TRAFEGO</p>
                    </div>
                    <hr className="mb-4" />
                    <div className="siga-redes">
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex' }}>
                            <li className="so">
                                <Link to="https://m.facebook.com/grupomapsempresas/" className="nav-link text" aria-current="page">
                                    <i class="fa-brands fa-facebook face"></i>
                                </Link>
                            </li>
                            <li className="so">
                                <Link to="https://www.instagram.com/grupomaps/?igsh=OTAxMmV4Y2F2cHp3&utm_source=qr" className="nav-link text" aria-current="page">
                                    <i class="fa-brands fa-instagram insta"></i>
                                </Link>
                            </li>
                            <li className="so">
                                <Link to="https://www.tiktok.com/@grupomaps?_t=8iXuXTextzR&_r=1" className="nav-link text" aria-current="page">
                                    <i class="fa-brands fa-tiktok"></i>
                                </Link>
                            </li>
                            <li className="so">
                                <Link to="https://www.youtube.com/watch?v=TdAkLQayZC8" className="nav-link text" aria-current="page">
                                    <i class="fa-brands fa-youtube youtube"></i>
                                </Link>
                            </li>
                            <li className="so">
                                <Link to="https://api.whatsapp.com/send?phone=5508005802766&text=Ol%C3%A1" className="nav-link text" aria-current="page">
                                    <i class="fa-brands fa-whatsapp whats"></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <br />

                    <div className="direitos1">
                        <p className="font-weight-bold">
                            <u> Verifique os termos de uso clicando no Link Abaixo;</u>
                        </p>
                    </div>
                    <div className="row faixa-arrow">
                        <div className="flecha-amarela">
                            <i class="fa-solid fa-arrow-right" style={{ color: "#FFD43B" }}></i>
                        </div>
                        <div className="linha-verde ">
                            <h3>
                                <a href="https://drive.google.com/file/d/1kvYx8m-0mw2DpqEw-aZtRAgWCNAUxIb3/view"> CLIQUE AQUI PARA VERIFICAR OS TERMOS DE USO</a>
                            </h3>
                        </div>
                        <div className="flecha-amarela">
                            <i class="fa-solid fa-arrow-left" style={{ color: "#FFD43B" }}></i>
                        </div>
                    </div>
                </div>
                <div className="linha3 ">
                    <h3>
                        LEI GERAL DE PROTEÇÃO DE DADOS LEI 13.709/2018
                    </h3>
                </div>
                <div className="texto">
                    <p>
                        1. Do direito à privacidade
                        A Lei 13709/2018 - Lei Geral de Proteção de Dados (LGPD) estabelece como fundamento o respeito à privacidade. Desse modo, o
                        presente Termo de Privacidade tem o propósito de comunicar de forma simples quais tipos de dados pessoais serão coletados,
                        quando, de que forma e para quais finalidades serão utilizados.
                        A privacidade é um direito conferido a todo indivíduo, está protegida pela lei brasileira e consiste na habilidade que este t em de
                        controlar a exposição de informações sobre sua vida pessoal, sua intimidade, bem como a disponibilidade de dados sobre si mesmo,
                        de retificar, ratificar ou apagar estes e de proteger a confidencialidade de suas comunicações, seu domicílio, sua imagem, honra e
                        reputação perante terceiros.
                        2. Atualização e veracidade dos dados; O titular e/ou seus responsáveis legais são os responsáveis pela atualização, exatidão e
                        veracidade dos dados que informarem à empresa Grupo Maps. Caso sejam identificados erros de informações cadastradas, o G
                        Maps Contact Center Eireli solicitará ao Titular correções;
                        O G Maps Contact Center Eireli não se responsabiliza por dados desatualizados em suas bases de dados.
                        3. Do prazo e forma de armazenamento; Os dados do usuário serão obtidos por meio da efetivação de seu vínculo com a Instituição,
                        quando o usuário insere as informações voluntariamente, por meio de ferramentas de coleta de dados de acesso e navegação
                        existentes em alguns sites e/ou aplicativos.
                        Os dados coletados são armazenados em ambiente seguro e em servidor próprio ou de terceiro contratado para este fim.
                        4. Da Segurança e Proteção dos Dados Pessoais
                        As informações são protegidas com padrões de segurança e confidencialidade, para fornecer aos usuários um ambiente seguro e
                        confiável através do uso de criptografia, certificações digitais e acessos controlados.
                        Adicionalmente, o próprio titular deve exercer alguns cuidados para auxiliar na proteção de seus dados.
                        a) Cuidados com Golpes: Os criminosos cibernéticos se aproveitam dos assuntos do momento para enviar mensagens
                        fraudulentas com intuito de roubar dados ou instalar vírus e outros softwares maliciosos por meio de links em mensagens falsas.
                        b) Compartilhamento de senhas: Sua senha é pessoal e intransferível e que deve ser mantida sob sigilo e em ambiente seguro.
                        Não compartilhe a sua senha, ceder ou utilizar a senha de outra pessoa é tipificado como crime no art. 308, do Código Penal.
                    </p>
                </div>
                <div className="escrever2 row">
                    <h5>
                        ASSINATURA DA CONTRATADA:
                    </h5>
                    <img src="../../../img/assinatura-maps.jpg" alt="" />
                </div>
                <div className="inf">
                    <h3>
                        G MAPS CONTACT CENTER LTDA – CNPJ 40.407.753/0001-30
                        <br />
                        E-MAIL: CONTATO@MAPSEMPRESAS.COM.BR
                        <br />
                        CENTRAL DE ATENDIMENTO
                        <br />
                        0800 580 2766
                    </h3>
                </div>
                {mensagem.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{mensagem}</div> : null}
                {sucesso === 'S' ? <Navigate to='/app/home' /> : null}
            </div>
            <div className="row salvar">
                {/* <Link to="/app/home" className="btn btn-warning btn-acao">Voltar</Link> */}
                <button className="btn btn-danger btn-cli" onClick={handleDownloadPDF} disabled={!(loader === false)}>
                <i className="fa-solid fa-file-pdf"></i> {loader ? (<span>Baixando  </span>) : (<span>Baixar PDF  </span>)}
                </button>
                {/* <button onClick={handleMostrarScript} className="btn btn-primary btn-cli" type="button" id="button-addon2">
                    <i class="fa-solid fa-envelope"></i> E-mail
                </button>
                {isScriptModalVisible && (
                    <ScriptModal onClose={handleFecharScriptModal} />
                )} */}
            </div>
        </div>
    </div>
}
export default FichaCliente;