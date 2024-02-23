import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from 'react-router-dom';
import '../EditarCliente/editarcliente.css'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import 'firebase/firestore'
function EditarCliente(props) {
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
                    data: data,
                    venc2: venc2,
                    representante: representante,
                    cargo: cargo,
                    parcelas: parcelas,
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
    return <div>
        <div className="background">
            <div className="contrato container-fluid titulo-2" >
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
                                <input onChange={(e) => setNumeroContrato(e.target.value)}  value={numeroContrato} type="text" id="contrato" className="form-control" placeholder="Nº" required />
                            </td>
                            <td className="baixo">
                                <p>DATA:</p>
                                <input onChange={(e) => setData(e.target.value)}  value={data} id="date" type="date" className="form-control" />
                            </td>
                            <td className="baixo">
                                <p>OPERADOR:</p>
                                <input onChange={(e) => setOperador(e.target.value)}  value={operador} id="text" type="text" className="form-control" placeholder="Operador" />
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
                                 value={razao}
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
                                 value={fantasia}
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
                                 value={cpf}
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
                                 value={endereco}
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
                                 value={cidade}
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
                                 value={bairro}
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
                                 value={uf}
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
                                 value={cep}
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
                                 value={whats}
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
                                 value={fone}
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
                                 value={funcionamento}
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
                                 value={email}
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
                                 value={site}
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
                                 value={link}
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
                                 value={nome}
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
                                 value={cargo}
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
                                 value={sociais}
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
                                 value={obs}
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
                            <select className="custom-select d-block " onChange={(e) => setPlano(e.target.value)} id="estado" required>
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
                                <input onChange={(e) => setVenc2(e.target.value)} value={venc2} id="date" className="form-control " type="date" />
                            </div>
                            
                        </div>
                        <div className=" input-group">
                        <div className="input-group-prendend ">
                                <span className="input-group-text">Nª</span>
                            </div>
                            <select className="custom-select d-block" onChange={(e) => setParcelas(e.target.value)} id="parcelas" required>
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
                                <input onChange={(e) => setValor(e.target.value)} value={valor} type="text" className="form-control " id="contrato" placeholder="Valor" required />
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
                                <select className="custom-select d-block escolha-select " onChange={(e) => setValidade(e.target.value)} id="estado" required>
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
                            <input onChange={(e) => setRenovSim(e.target.checked)}  checked={renovSim} className="form-check-input" type="checkbox" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                <b>Sim</b>
                            </label>
                        </div>
                        <div className="form-check mb-3">
                            <input onChange={(e) => setRenovNao(e.target.checked)}  checked={renovNao} className="form-check-input" type="checkbox" id="flexCheckChecked" />
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
                    <hr className="mb-4" />

                    <div className="direitos">
                        <p className="font-weight-bold">
                            <u> SIGA-NOS NAS REDES SOCIAIS CLIQUE NOS ICONES A BAIXO</u>
                        </p>
                    </div>
                    <div className="siga-redes">
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex' }}>
                            <li className="so">
                                <Link to="https://m.facebook.com/grupomapsempresas/" className="nav-link text" aria-current="page">
                                    <i class="fa-brands fa-facebook"></i>
                                </Link>
                            </li>
                            <li className="so">
                                <Link to="https://www.instagram.com/grupomaps/?igsh=OTAxMmV4Y2F2cHp3&utm_source=qr" className="nav-link text" aria-current="page">
                                    <i class="fa-brands fa-instagram"></i>
                                </Link>
                            </li>
                            <li className="so">
                                <Link to="https://www.tiktok.com/@grupomaps?_t=8iXuXTextzR&_r=1" className="nav-link text" aria-current="page">
                                    <i class="fa-brands fa-tiktok"></i>
                                </Link>
                            </li>
                            <li className="so">
                                <Link to="https://www.youtube.com/watch?v=TdAkLQayZC8" className="nav-link text" aria-current="page">
                                    <i class="fa-brands fa-youtube"></i>
                                </Link>
                            </li>
                            <li className="so">
                                <Link to="https://api.whatsapp.com/send?phone=5508005802766&text=Ol%C3%A1" className="nav-link text" aria-current="page">
                                    <i class="fa-brands fa-whatsapp"></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <br />

                    <div className="direitos">
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
                <br /><br /><br />
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
            <div className="row salvar ">
                <Link to="/app/home" className="btn btn-warning btn-acao">Cancelar</Link>
                <button onClick={AlterarCliente} type="button" className="btn btn-primary btn-acao">Salvar</button>
            </div>
        </div>
    </div>
}
export default EditarCliente;