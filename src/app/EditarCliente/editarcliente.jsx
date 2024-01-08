import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from 'react-router-dom';
import Navbar3 from "../Componentes/Navbar/navbar3";
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
    const [venc, setVenc] = useState('');
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
    const [fantasia, setFantasia] = useState('');
    const [email, setEmail] = useState('');
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
                    setVenc(dados.venc);
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
                    venc: venc,
                    valor: valor,
                    plano: plano,
                    renovNao: renovNao,
                    renovSim: renovSim,
                    validade: validade,
                    data: data,
                    venc2: venc2,
                    representante: representante,
                    cargo: cargo
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


    return <div>
        <Navbar3 />
        <div className="background">
            <div className="container-fluid titulo-2">
                <div className="row">
                    <div className="mb-3 justify-content-center ">
                        <div className="input-group inicio">
                            <div className="logo-maps">
                                <img src="../../../img/nova-logo.jpg" width="150" alt="" />
                            </div>
                            <div className="autorizacao text-center font-weight-bold">
                                <h1 className="novocliente ">AUTORIZAÇÃO PARA DIVULGAÇÃO DE FOTOS <br />E VIDEOS E ACESSORIA DE SERVIÇOS <br /> EM MARKETING DIGITAL.</h1>
                                <div className="representante font-weight-bold">
                                    <span className="">REPRESENTANTE CONTRAUAL</span>
                                    <input onChange={(e) => setRepresentante(e.target.value)} value={representante} type="text" className="form-control" id="contrato" placeholder="" required />
                                </div>
                                <div className="informacoes-comerciais">
                                    <span>INFORMAÇÕES COMERCIAIS</span>
                                </div>
                            </div>
                            <div className="numero-contrato font-weight-bold">
                                <span className="">CONTRATO NUMERO</span>
                                <input onChange={(e) => setNumeroContrato(e.target.value)} value={numeroContrato} type="text" className="form-control" id="contrato" placeholder="" required />
                                <div className="equipe">
                                    <span className="span-equipe font-weight-bold">EQUIPE</span>
                                    <span className="span-marketing text-primary">MARKETING DIGITAL</span>
                                    <div className="data">
                                        <input onChange={(e) => setData(e.target.value)} value={data} id="date" type="date" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 mb-3 val">
                                <div className="plano">
                                    <div className="">
                                        <span className="font-weight-bold">Plano</span>
                                    </div>
                                    <select className="custom-select d-block " onChange={(e) => setPlano(e.target.value)} value={plano} id="estado" required>
                                        <option value="">Escolha</option>
                                        <option>Mensal</option>
                                        <option>Trimestral</option>
                                        <option>Semestral</option>
                                        <option>Anual</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Por favor, insira um estado válido.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row formulario">
                    <div className=" order-md-1">
                        <form className="needs-validation" noValidate>
                            <div className="row">
                                <div className="col-md-6 mb-3 font-weight-bold">
                                    <label htmlFor="primeiroNome ">Razão Social</label>
                                    <input onChange={(e) => setRazao(e.target.value)} value={razao} type="text" className="form-control" id="priemrioNome" placeholder="Insira a razão social" required />
                                    <div className="invalid-feedback">É obrigatório inserir a razão social</div>
                                </div>
                                <div className="col-md-6 mb-3 font-weight-bold">
                                    <label htmlFor="primeiroNome">CNPJ</label>
                                    <input onChange={(e) => setCpf(e.target.value)} value={cpf} type="text" className="form-control" id="priemrioNome" placeholder="Insira o CPF" required />
                                    <div className="invalid-feedback">É obrigatório inserir o CPF!</div>
                                </div>
                            </div>
                            <div className="row">

                                <div className="col-md-6 mb-3 font-weight-bold">
                                    <label htmlFor="nomeFantasia">
                                        Nome fantasia
                                    </label>
                                    <input onChange={(e) => setFantasia(e.target.value)} value={fantasia} type="nomeFantasia" className="form-control" id="nomeFantasia" placeholder="Insira o nome fantasia" />
                                    <div className="invalid-feedback">
                                        "Por favor insira um nome fantasia."
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3 font-weight-bold">
                                    <label htmlFor="email">
                                        E-mail
                                    </label>
                                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="form-control" id="email" placeholder="Insira o email" />
                                    <div className="invalid-feedback">
                                        "Por favor insira um email valido."
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3 font-weight-bold">
                                    <label htmlFor="endereco">Endereço</label>
                                    <input onChange={(e) => setEndereco(e.target.value)} value={endereco} type="text" className="form-control" id="endereco" placehoader="Insira o endereço" required />
                                    <div className="invalid-feedback">Por favor, insira seu endereço de entrega</div>
                                </div>
                                <div className="col-md-6 mb-3 font-weight-bold">
                                    <label htmlFor="endereco2">Bairro</label>
                                    <input onChange={(e) => setBairro(e.target.value)} value={bairro} type="text" className="form-control" id="endereco2" placehoader="Insira o bairro" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5 mb-3 font-weight-bold">
                                    {/* pais */}
                                    <label htmlFor="estado">UF</label>
                                    <input onChange={(e) => setUf(e.target.value)} value={uf} type="text" className="form-control" id="estado" placeholder="Insira o UF" required />
                                    <div className="invalid-feedback">Por favor escolha um estado</div>
                                </div>
                                <div className="col-md-4 mb-3 font-weight-bold">
                                    <label htmlFor="cidade">Cidade</label>
                                    <input onChange={(e) => setCidade(e.target.value)} value={cidade} type="text" className="form-control" id="cidade" placeholder="Insira a cidade" required />
                                    <div className="invalid-feedback">Por favor escolha uma cidade</div>
                                </div>
                                <div className="col-md-3 mb-3 font-weight-bold">
                                    <label htmlFor="cep">CEP</label>
                                    <input onChange={(e) => setCep(e.target.value)} value={cep} type="text" className="form-control" id="cep" placeholder="Insira o cep" required />
                                    <div className="invalid-feedback">É obrigatório inserir um cep</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5 mb-3 font-weight-bold">
                                    {/* pais */}
                                    <label htmlFor="fone">Telefone:</label>
                                    <div className="input-group">
                                        <div className="input-group-prendend">
                                            <span className="input-group-text">+55</span>
                                        </div>
                                        <input onChange={(e) => setFone(e.target.value)} value={fone} type="text" className="form-control" id="fone" placeholder="(44) 4444-4444" required />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3 font-weight-bold">
                                    <label htmlFor="cidade">WhatsApp:</label>
                                    <input onChange={(e) => setWhats(e.target.value)} value={whats} type="text" className="form-control" id="cep" placeholder="(99) 99999-9999" required />
                                </div>
                            </div>
                            <div className="mb-3 font-weight-bold">
                                <label htmlFor="horario">Horario de funcionamento</label>
                                <input onChange={(e) => setFuncionamento(e.target.value)} value={funcionamento} type="text" className="form-control" id="horario" placeholder="Insira o horario de funcionamento" required />
                                <div className="invalid-feedback">Por favor escolha um horario</div>
                            </div>
                            <div className="mb-3 font-weight-bold">
                                <label htmlFor="observacao">Observação</label>
                                <input onChange={(e) => setObs(e.target.value)} value={obs} type="text" className="form-control" id="observacao" placeholder="Campo para observações" required />
                                <div className="invalid-feedback">Por favor escolha uma cidade</div>
                            </div>
                            <hr className="mb-4 font-weight-bold" />
                            <div className="row atualizacao">
                                <div className="custom-control custom-checkbox col-md-1.7 mb-3">
                                    <label className="custom-control-label" htmlFor="atualizacao">Atualização</label>
                                    <input type="checkbox" className="custom-control-input" id="atualizacao" />
                                </div>
                                <p className="col-md-1 mb-3 font-weight-bold">-</p>
                                <div className="custom-control custom-checkbox col-md-1.7 mb-3">
                                    <label className="custom-control-label" htmlFor="atualizacao">Criação</label>
                                    <input type="checkbox" className="custom-control-input" id="atualizacao" />
                                </div>
                                <p className="col-md-1 mb-3 font-weight-bold">-</p>
                                <div className="custom-control custom-checkbox col-md-1.7 mb-3">
                                    <label className="custom-control-label" htmlFor="atualizacao">Anuncio</label>
                                    <input type="checkbox" className="custom-control-input" id="atualizacao" />
                                </div>
                                <p className="col-md-1 mb-3 font-weight-bold">-</p>
                                <div className="custom-control custom-checkbox col-md-1.7 mb-3">
                                    <label className="custom-control-label" htmlFor="atualizacao">Cartão Digital</label>
                                    <input type="checkbox" className="custom-control-input" id="atualizacao" />
                                </div>
                                <p className="col-md-1 mb-3 font-weight-bold">-</p>
                                <div className="custom-control custom-checkbox col-md-1.7 mb-3">
                                    <label className="custom-control-label" htmlFor="atualizacao">Logotipo</label>
                                    <input type="checkbox" className="custom-control-input" id="atualizacao" />
                                </div>
                            </div>

                            <hr className="mb-4" />
                            <div className="row d-flex justify-content-center" >
                                <p className="col-md-3 mb-3">
                                    <b>Renovação automatica</b>
                                </p>
                                <div className="form-check col-md-1 mb-3">
                                    <input onChange={(e) => setRenovSim(e.target.checked)} value={renovSim} className="form-check-input" type="checkbox" id="flexCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        <b>Sim</b>
                                    </label>
                                </div>
                                <div className="form-check mb-3">
                                    <input onChange={(e) => setRenovNao(e.target.checked)} value={renovNao} className="form-check-input" type="checkbox" id="flexCheckChecked" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked">
                                        <b>Não</b>
                                    </label>
                                </div>
                            </div>

                            <p className="novocliente1 font-weight-bold cond">Condições; numero de parcelas por vigência (12) Doze no valor de 199,90 cento e noventa e nove reais e noventa centavos no Boleto Bancarío
                            </p>
                            <p className="novocliente1 font-weight-bold col-lg-12 cond">AS PARTES ACIMA NOMEADAS ASSINARAM, QUE SE REGERÁ PELAS CLÁUSULAS E CONDIÇÕES.
                            </p>
                            <div className="servicos col-lg-12">
                                <h4 className="font-weight-bold">
                                    SUA EMPRESA PODERÁ CONTAR COM OS SEGUINTES SERVIÇOS:
                                </h4>
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
                            <div>
                                <div className="row assinatura">
                                    <div className="mb-3">
                                        <div className="input-group">
                                            <div className="input-group-prendend">
                                                <span className="input-group-text">Data de vencimento:</span>
                                            </div>
                                            <input onChange={(e) => setVenc(e.target.value)} value={venc} id="date" type="date" />
                                            <div className="invalid-feedback feedback" >O numero do contrato é obrigatório</div>
                                        </div>
                                    </div>
                                    <p className="font-weight-bold">Ciente: _____________________________________________</p>
                                </div>
                            </div>
                            <hr className="mb-4" />
                            <div className="direitos">
                                <p className="font-weight-bold text-danger">TODO SUPORTE A SER REALIZADO DEVE SER SOADO AO DEPARTAMENTO DE MARKETING. CADA SERVIÇO REQUER UM TEMPO PARA SUA EXECUÇÃO MAIS INFORMAÇÕES SOBRE OS SERVIÇOS ENTRE EM CONTATO COM DEPARTAMENTO DE MARKETING SIGA-NOS NAS REDES SOCIAIS CLIQUE NOS ICONES ABAIXO</p>
                            </div>

                            <ul className="row icones">
                                <li><a href="https://www.facebook.com/grupomapsempresas"><i className="fab fa-facebook-f fa"></i></a></li>
                                <li><a href="https://api.whatsapp.com/send?phone=551139392301&text=Ol%C3%A1,%20gostaria%20de%20maiores%20informa%C3%A7%C3%B5es%20sobre%20o%20Google%20Meus%20Neg%C3%B3cios,%20podem%20me%20ajudar?"><i className=" fab fa-whatsapp"></i></a></li>
                                <li><a href="https://www.instagram.com/grupomaps/"><i className="fab fa-instagram"></i></a></li>
                                <li><a href="https://www.tiktok.com/@grupomaps?_t=8iXuXTextzR&_r=1"><i className="fab fa-tiktok"></i></a></li>
                                <li><a href="https://www.youtube.com/watch?si=9p3Z6n29-Qb7xBEN&v=TdAkLQayZC8&feature=youtu.be"><i className="fab fa-youtube"></i></a></li>
                            </ul>

                            <div className="servicos2 col-lg-12">
                                <h4 className="font-weight-bold">
                                    Como proponente estou de acordo que a empresa; G MAPS CONTACT CENTERE EIRELI CNPJ:40.407.753/0001-30 realize a administração de minha página dentro do site de busca da Google. A contratada declara aqui que não Possui nenhum vinculo junto a empresa Google Brasil.
                                </h4>
                            </div>

                            <div className="termos">
                                <p className=""></p>
                            </div>

                            <hr className="mb-4" />
                            <div className="col-md-6 mb-3 font-weight-bold">
                                <label htmlFor="nome">Autorizado por:</label>
                                <div className="input-group">
                                    <div className="input-group-prendend">
                                        <span className="input-group-text">Nome:</span>
                                    </div>
                                    <input onChange={(e) => setNome(e.target.value)} value={nome} type="text" className="form-control" id="nome" placeholder="Proprietario" required />
                                    <div className="invalid-feedback feedback" >O nome é obrigatório</div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-3 font-weight-bold">
                                <div className="input-group">
                                    <div className="input-group-prendend">
                                        <span className="input-group-text">Cargo:</span>
                                    </div>
                                    <input onChange={(e) => setCargo(e.target.value)} value={cargo} type="text" className="form-control" id="nome" placeholder="Cargo" required />
                                    <div className="invalid-feedback feedback" >O nome é obrigatório</div>
                                </div>
                            </div>
                            <div className="row ass">
                                <div className="autorizante">
                                    <p className=" mb-3 font-weight-bold">informacoes do autorizante</p>
                                </div>
                                <div className="info-exta">
                                    <p className="mb-3 font-weight-bold text-right">A contratante realizou a assinatura do <br /> presente contrato de forma Digital, <br /> declarando assim ter poderes para assinar. <br /> Estando ciente do 1º vencimento para: <br /></p >
                                    <div className="dta">
                                        <input onChange={(e) => setVenc2(e.target.value)} value={venc2} id="date" type="date" />
                                    </div>
                                    <div className="ass2">
                                        <p className="font-weight-bold">Assinatura do contratante:</p>
                                    </div>
                                </div>
                            </div>
                            <br /><br /><br />


                            {mensagem.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{mensagem}</div> : null}
                            {sucesso === 'S' ? <Navigate to='/app/home' /> : null}

                        </form>
                    </div>
                </div>

            </div>
            <div className="row salvar ">
                <Link to="/app/home" className="btn btn-warning btn-acao">Cancelar</Link>
                <button onClick={AlterarCliente} type="button" className="btn btn-primary btn-acao">Salvar</button>
            </div>


        </div>
    </div>
}
export default EditarCliente;