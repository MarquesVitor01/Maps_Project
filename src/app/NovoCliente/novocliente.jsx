import React, { useState, useEffect, useRef } from "react";
import { Link, Navigate } from 'react-router-dom';
// import Navbar3 from "../Componentes/Navbar/navbar3";
import { getFirestore, collection, addDoc, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import '../NovoCliente/novocliente.css'
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import { getAuth } from 'firebase/auth';
// import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { isEmpty } from 'lodash';

function NovoCliente() {

    const [clientes, setClientes] = useState([]);

    const [loader, setLoader] = useState(false);
    const [formState, setFormState] = useState({
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
        venc: '',
        valor: '',
        plano: '',
        renovNao: '',
        renovSim: '',
        validade: '',
        data: '',
        cargo: '',
        venc2: '',
        representante: ''
    });

    const handleInputChange = (field, value) => {
        setFormState((prevState) => ({ ...prevState, [field]: value }));
    };

    const [plano, setPlano] = useState('');
    const [data, setData] = useState('');
    const [numeroContrato, setNumeroContrato] = useState('');
    const [bairro, setBairro] = useState('');
    const [obs, setObs] = useState('');
    const [funcionamento, setFuncionamento] = useState('');
    // const [venc, setVenc] = useState('');
    const [venc2, setVenc2] = useState('');
    const [valor, setValor] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCep] = useState('');
    const [uf, setUf] = useState('');
    const [whats, setWhats] = useState('');
    const [endereco, setEndereco] = useState('');
    const [razao, setRazao] = useState('');
    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [fantasia, setFantasia] = useState('');
    const [email, setEmail] = useState('');
    const [fone, setFone] = useState('');
    const [representante, setRepresentante] = useState('');
    const [renovSim, setRenovSim] = useState(false);
    const [renovNao, setRenovNao] = useState(false);
    const [validade, setValidade] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [cargo, setCargo] = useState('');
    const [sucesso, setSucesso] = useState('');

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            // Redirecionar para a página de login se o usuário não estiver autenticado
            // (pode personalizar a URL de redirecionamento conforme necessário)
            return <Navigate to="/login" />;
        }

        const db = getFirestore();

        // Criar uma consulta para buscar clientes do usuário atual
        const q = query(collection(db, 'clientes'), where('userId', '==', user.uid));

        // Usar onSnapshot para ouvir alterações na coleção e atualizar o estado
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const clientesData = [];
            snapshot.forEach((doc) => {
                clientesData.push({ id: doc.id, ...doc.data() });
            });
            setClientes(clientesData);
        });
        return () => {
            // Limpar o ouvinte ao desmontar o componente para evitar vazamentos de memória
            unsubscribe();
        };
    }, []);

    const db = getFirestore();

    const clienteJaExiste = async (cpf) => {
        const querySnapshot = await getDocs(query(collection(db, 'clientes'), where('cpf', '==', cpf)));
        return !isEmpty(querySnapshot.docs); // Retorna true se já existir algum cliente com o mesmo email
    };
    

    async function cadastrarCliente() {
        try {
            // Faça a validação dos campos obrigatórios (nome e email, por exemplo)
            if (nome.length === 0) {
                setMensagem('Informe o seu nome');
                return;
            } else if (email.length === 0) {
                setMensagem('Informe o email');
                return;
            }

            // Construa o objeto com os dados do cliente
            const clienteData = {
                nome,
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
                // venc,
                valor,
                plano,
                renovNao,
                renovSim,
                validade,
                data,
                representante,
                venc2,
                cargo
            };

            // Adicione o campo userId aos dados do cliente
            const auth = getAuth();
            const userId = auth.currentUser.uid;
            clienteData.userId = userId;

            const clienteExistente = await clienteJaExiste(cpf);
            if (clienteExistente) {
                setMensagem('Cliente já cadastrado.');
                return;
            }    
            // Adiciona o cliente ao Firestore
            const novoClienteRef = await addDoc(collection(db, 'clientes'), clienteData);
            // Limpe os campos do formulário se o cliente for adicionado com sucesso
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
                // venc: '',
                valor: '',
                plano: '',
                renovNao: '',
                renovSim: '',
                validade: '',
                data: '',
                representante: '',
                venc2: '',
                cargo: ''
                // ... outros campos
            });


            // Limpe mensagens de sucesso ou erro
            setMensagem('');
            setSucesso('S');

            console.log('Novo cliente criado com ID:', novoClienteRef.id);
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            setMensagem('Ocorreu um erro ao cadastrar o cliente. Por favor, tente novamente.');
            setSucesso('N');
        }
    }

        const contentDocument = useRef();

        const handlePrint = useReactToPrint({
            content: () => contentDocument.current,
        });

    return <div>
        {/* <Navbar3 /> */}
        <div className="background">
            <div ref={contentDocument} className="contrato container-fluid titulo-2" id="formId">
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
                                    <input onChange={(e) => setRepresentante(e.target.value)} type="text" className="form-control" id="contrato" placeholder="" required />
                                </div>
                                <div className="informacoes-comerciais">
                                    <span>INFORMAÇÕES COMERCIAIS</span>
                                </div>
                            </div>
                            <div className="numero-contrato font-weight-bold">
                                <span className="">CONTRATO NUMERO</span>
                                <input onChange={(e) => setNumeroContrato(e.target.value)} type="text" className="form-control" id="contrato" placeholder="" required />
                                <div className="equipe">
                                    <span className="span-equipe font-weight-bold">EQUIPE</span>
                                    <span className="span-marketing text-primary">MARKETING DIGITAL</span>
                                    <div className="data">
                                        <input onChange={(e) => setData(e.target.value)} id="date" type="date" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 mb-3 val">
                                <div className="plano">
                                    <div className="">
                                        <span className="font-weight-bold">Plano</span>
                                    </div>
                                    <select className="custom-select d-block " onChange={(e) => setPlano(e.target.value)} id="estado" required>
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
                                    <input onChange={(e) => setRazao(e.target.value)} type="text" className="form-control" id="priemrioNome" placeholder="Insira a razão social" required />
                                    <div className="invalid-feedback">É obrigatório inserir a razão social</div>
                                </div>
                                <div className="col-md-6 mb-3 font-weight-bold">
                                    <label htmlFor="primeiroNome">CPF</label>
                                    <input onChange={(e) => setCpf(e.target.value)} type="text" className="form-control" id="priemrioNome" placeholder="Insira o CPF" required />
                                    <div className="invalid-feedback">É obrigatório inserir o CPF!</div>
                                </div>
                            </div>
                            <div className="row">

                                <div className="col-md-6 mb-3 font-weight-bold">
                                    <label htmlFor="nomeFantasia">
                                        Nome fantasia
                                    </label>
                                    <input onChange={(e) => setFantasia(e.target.value)} type="nomeFantasia" className="form-control" id="nomeFantasia" placeholder="Insira o nome fantasia" />
                                    <div className="invalid-feedback">
                                        "Por favor insira um nome fantasia."
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3 font-weight-bold">
                                    <label htmlFor="email">
                                        E-mail
                                    </label>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" placeholder="Insira o email" />
                                    <div className="invalid-feedback">
                                        "Por favor insira um email valido."
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3 font-weight-bold">
                                    <label htmlFor="endereco">Endereço</label>
                                    <input onChange={(e) => setEndereco(e.target.value)} type="text" className="form-control" id="endereco" placehoader="Insira o endereço" required />
                                    <div className="invalid-feedback">Por favor, insira seu endereço de entrega</div>
                                </div>
                                <div className="col-md-6 mb-3 font-weight-bold">
                                    <label htmlFor="endereco2">Bairro</label>
                                    <input onChange={(e) => setBairro(e.target.value)} type="text" className="form-control" id="endereco2" placehoader="Insira o bairro" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5 mb-3 font-weight-bold">
                                    {/* pais */}
                                    <label htmlFor="estado">UF</label>
                                    <input onChange={(e) => setUf(e.target.value)} type="text" className="form-control" id="estado" placeholder="Insira o UF" required />
                                    <div className="invalid-feedback">Por favor escolha um estado</div>
                                </div>
                                <div className="col-md-4 mb-3 font-weight-bold">
                                    <label htmlFor="cidade">Cidade</label>
                                    <input onChange={(e) => setCidade(e.target.value)} type="text" className="form-control" id="cidade" placeholder="Insira a cidade" required />
                                    <div className="invalid-feedback">Por favor escolha uma cidade</div>
                                </div>
                                <div className="col-md-3 mb-3 font-weight-bold">
                                    <label htmlFor="cep">CEP</label>
                                    <input onChange={(e) => setCep(e.target.value)} type="text" className="form-control" id="cep" placeholder="Insira o cep" required />
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
                                        <input onChange={(e) => setFone(e.target.value)} type="text" className="form-control" id="fone" placeholder="(44) 4444-4444" required />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3 font-weight-bold">
                                    <label htmlFor="cidade">WhatsApp:</label>
                                    <input onChange={(e) => setWhats(e.target.value)} type="text" className="form-control" id="cep" placeholder="(99) 99999-9999" required />
                                </div>
                            </div>
                            <div className="mb-3 font-weight-bold">
                                <label htmlFor="horario">Horario de funcionamento</label>
                                <input onChange={(e) => setFuncionamento(e.target.value)} type="text" className="form-control" id="horario" placeholder="Insira o horario de funcionamento" required />
                                <div className="invalid-feedback">Por favor escolha um horario</div>
                            </div>
                            <div className="mb-3 font-weight-bold">
                                <label htmlFor="observacao">Observação</label>
                                <input onChange={(e) => setObs(e.target.value)} type="text" className="form-control" id="observacao" placeholder="Campo para observações" required />
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
                                    <input onChange={(e) => setRenovSim(e.target.checked)} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        <b>Sim</b>
                                    </label>
                                </div>
                                <div className="form-check mb-3">
                                    <input onChange={(e) => setRenovNao(e.target.checked)} className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked">
                                        <b>Não</b>
                                    </label>
                                </div>
                            </div>

                            <p className="novocliente1 font-weight-bold cond">Condições; numero de parcelas por vigência (12) Doze no valor de 199,90 cento e noventa e nove reais e noventa centavos no Boleto Bancarío
                            </p>
                            <p className="novocliente1 font-weight-bold col-lg-12 cond">AS PARTES ACIMA NOMEADAS ASSINARAM, QUE SE REGERÁ PELAS CLÁUSULAS E CONDIÇÕES.
                            </p>
                            <div className="servicos col-lg-12 align-middle">
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
                                        {/* <div className="input-group">
                                            <div className="input-group-prendend">
                                                <span className="input-group-text">Data de vencimento:</span>
                                            </div>
                                            <input onChange={(e) => setVenc(e.target.value)} id="date" type="date" />
                                            <div className="invalid-feedback feedback" >O numero do contrato é obrigatório</div>
                                        </div> */}
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
                                <li><a href="https://api.whatsapp.com/send?phone=551139392301&text=Ol%C3%A1,%20gostaria%20de%20maiores%20informa%C3%A7%C3%B5es%20sobre%20o%20Google%20Meus%20Neg%C3%B3cios,%20podem%20me%20ajudar?"><i className=" fab fa-whatsapp fa"></i></a></li>
                                <li><a href="https://www.instagram.com/grupomaps/"><i className="fab fa-instagram fa"></i></a></li>
                                <li><a href="https://www.tiktok.com/@grupomaps?_t=8iXuXTextzR&_r=1"><i className="fab fa-tiktok fa"></i></a></li>
                                <li><a href="https://www.youtube.com/watch?si=9p3Z6n29-Qb7xBEN&v=TdAkLQayZC8&feature=youtu.be"><i className="fab fa-youtube fa"></i></a></li>
                            </ul>

                            <div className="servicos2 col-lg-12 align-middle">
                                <h4 className="font-weight-bold">
                                    Como proponente estou de acordo que a empresa; G MAPS CONTACT CENTERE EIRELI CNPJ:40.407.753/0001-30 realize a administração de minha página dentro do site de busca da Google.
                                    A contratada declara aqui que não Possui nenhum vinculo junto a empresa Google Brasil.
                                    Condições; numero de parcelas por vigência (12) Doze no valor de R$ 99,90  noventa e nove reais e noventa centavos no Boleto Bancarío
                                </h4>
                            </div>

                            <div className="termos">
                                <p className="termos-uso">
                                    <b>TERMOS DE USO/ CONTRATO.</b> <br />
                                    Cláusula 1 - O presente termo/contrato tem como objetivo a assessoria de serviços publicitários e marketing digital em favor do Contratante supracitado. Cláusula 2 - A prestação do serviço implica na atualização do Google Meu Negócio, mais especificamente na inserção, e ou, atualização dos seguintes itens, Atualização dos dados que constam na plataforma digital do Google Maps / Criação de Pagina dentro da plataforma Google Maps / contratante poderá encaminhar para a contratado dentro deste periodo 30 fotos e 10 vídeos mensalmente para atualização da página, poderá realizar a alteração do  horário de funcionamento a qualquer momento, inclusão de site/ páginas de redes sociais / telefones para contato e obter ajuda para criação de anúncios / Criação de Cartão Digital Interativo com links Direcionadores / Criação de LogoTipo / Animação de Logotipo. Fica acordado que a contratante deve entrar em contato com a contratada para solicitar o devido suporte quando necessário através do Whatsaap Comercial Número: 0800 580 2766 ou através do e-mail; Marketing@mapsempresas.com.br, Cada serviço requer seu prazo para execução devendo a contratante respeita-lá. Cabe a contratada orientar o prazo de execução  cada serviço  mediante sua solicitação). Cláusula 3 - Para a realização da prestação de serviço, o Contratante deverá enviar a Contratada, todas as informações solicitadas, inerentes a plataforma Google Meu Negócio. Cláusula 4 - O presente contrato tem validade de 48 (Meses), meses, sendo 04 (Quatro), edições, com duração de 12 meses cada. Cláusula 5 - O valor da assessoria está especificado no item condições de pagamento sendo; (Quatrocentos e setenta e oito reais dividido em 12 vezes de Trinta  e nove reais e noventa centavos) no Boleto Bancarío por Ano. O pagamento da adesão, foi subdividido em 12 vezes de igual valor, ficando o restante dos pagamentos para cada 30 dias corridos, a contar da data especificada proximo a assinatura do presente contrato, observando o disposto da cláusula 10ª do documento em questão. O prazo para cancelamento sem ônus são de 7 dias corridos conforme o Art.49 do CDC, a solicitação deverá ser feita por escrita  formalizada através do e-mail: Juridico@mapsempresas.com.br. Após este prazo dá-se 23 dias corridos em caso de desistência a parte que der ensejo a mesma, pagará a outra a título de multa e penalidade o importe correspondente a 40% do valor total do Contrato referente as 48 parcelas (4 edições). Cláusula 6 - A título de cortesia e bonificação, o Contratante será divulgado nas Redes Sociais da Contratada (FACEBOOK, INSTAGRAM, TIK TOK E YOUTUBE), pelo mesmo prazo e período determinado acima mendiante envio de conteudos para sua divulgação. Cláusula 7 - A bonificação supracitada, não tem vinculo com a prestação de serviço ora contratada, e tem validade de 01 (um), mês, sendo que, após este período fica estipulado o pagamento descriminado no item recibo do presente contrato. Cláusula 8 - Não havendo interesse na continuidade da assessoria nos serviços de Marketing, o Contratante deve se manifestar através de carta ou e-mail, endereçado a Contratada. Cláusula 9 – O Contratante é civelmente responsável pelos atos praticados por seus funcionários, prepostos e ou colaboradores, no exercício da função que lhes competir ou por razão dela, tudo a luz do Código de Processo Civil, Lei 10406/02, artigo 932, inciso III. Cláusula 10 - Havendo atraso de uma ou mais parcelas entabuladas no presente documento, considera-se constituída a mora, incidindo sobre o valor total da divida 20% de multa, podendo o Contratado, optar pela resolução administrativa do contrato, exigindo o pagamento integral das parcelas vencidas, bem como as vincendas, ou pela execução judicial do mesmo, desde já determinado o pagamento de multa e juros legais, bem como honorários advocatício em 10% do valor da causa. Cláusula 11 As partes elegem o Forum Central de São Paulo para dirimir eventuais questões do contrato, com exclusão de qualquer outro por mais privilegiado que se apresente.</p>
                            </div>

                            <hr className="mb-4" />
                            <div className="col-md-6 mb-3 font-weight-bold">
                                <label htmlFor="nome">Autorizado por:</label>
                                <div className="input-group">
                                    <div className="input-group-prendend">
                                        <span className="input-group-text">Nome:</span>
                                    </div>
                                    <input onChange={(e) => setNome(e.target.value)} type="text" className="form-control" id="nome" placeholder="Proprietario" required />
                                    <div className="invalid-feedback feedback" >O nome é obrigatório</div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-3 font-weight-bold">
                                <div className="input-group">
                                    <div className="input-group-prendend">
                                        <span className="input-group-text">Cargo:</span>
                                    </div>
                                    <input onChange={(e) => setCargo(e.target.value)} type="text" className="form-control" id="nome" placeholder="Cargo" required />
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
                                        <input onChange={(e) => setVenc2(e.target.value)} id="date" type="date" />
                                    </div>
                                    <div className="ass2">
                                        <p className="font-weight-bold">Assinatura do contratante:</p>
                                    </div>
                                </div>
                                <div className="logo-maps2">
                                    <img src="../../../img/nova-logo.jpg" width="150" alt="" />
                                </div>
                            </div>
                            <br /><br /><br />
                            <hr className="mb-4" />
                            <br />
                            <br />
                            <br />


                            {mensagem.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{mensagem}</div> : null}
                            {sucesso === 'S' ? <Navigate to='/app/home' /> : null}

                        </form>
                    </div>
                </div>

            </div>
            <div className="row salvar">
                <Link to="/app/home" className="btn btn-warning btn-acao">Cancelar</Link>
                <button onClick={cadastrarCliente} type="button" className="btn btn-primary btn-acao">Salvar</button>
                <button className="btn btn-danger btn-cli" onClick={handlePrint} disabled={loader}>
                    {loader ? <span>Baixando</span> : <span>Baixar PDF</span>}<i className="fa-solid fa-file-pdf"></i>
                </button>
            </div>

        </div >
    </div>
}
export default NovoCliente;