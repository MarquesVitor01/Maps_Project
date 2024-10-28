import React, { useState, useEffect } from "react";
import "../EditarCliente/editarcliente.css";
import "./fichacliente.css";
import { useParams, Navigate } from "react-router-dom";
import "firebase/firestore";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import html2pdf from "html2pdf.js";
import QRCode from "qrcode.react";
import qrCode from "qrcode";

function FichaCliente(props) {
  const [loader, setLoader] = useState(false);
  const [formState, setFormState] = useState("");
  const [plano, setPlano] = useState("Escolha");
  const [data, setData] = useState("");
  const [numeroContrato, setNumeroContrato] = useState("");
  const [bairro, setBairro] = useState("");
  const [obs, setObs] = useState("");
  const [funcionamento, setFuncionamento] = useState("");
  const [venc2, setVenc2] = useState("");
  const [valor, setValor] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");
  const [operador, setOperador] = useState("");
  const [uf, setUf] = useState("");
  const [site, setSite] = useState("");
  const [whats, setWhats] = useState("");
  const [endereco, setEndereco] = useState("");
  const [razao, setRazao] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cancelado, setCancelado] = useState("");
  const [link, setLink] = useState("");
  const [nome, setNome] = useState("");
  const [sociais, setSociais] = useState("");
  const [fantasia, setFantasia] = useState("");
  const [parcelas, setParcelas] = useState("1");
  const [email, setEmail] = useState("");
  const [fone, setFone] = useState("");
  const [representante, setRepresentante] = useState("");
  const [renovSim, setRenovSim] = useState(true);
  const [renovNao, setRenovNao] = useState(false);
  const [ramal, setRamal] = useState("");
  const [siteSim, setSiteSim] = useState(false);
  const [siteNao, setSiteNao] = useState(false);
  const [declaro, setDeclaro] = useState(true);
  const [validade, setValidade] = useState("");
  const [equipe, setEquipe] = useState("G MARKETING DIGITAL");
  const [mensagem, setMensagem] = useState("");
  const [cargo, setCargo] = useState("");
  const [celular, setCelular] = useState("");
  const [email2, setEmail2] = useState("");
  const [modelo, setModelo] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [imagem, setImagem] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");

  const db = getFirestore();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("ID do Cliente:", id);
        const clienteDocRef = doc(db, "clientes", id);
        console.log("Referência do Documento:", clienteDocRef);
        const docSnapshot = await getDoc(clienteDocRef);
        console.log("Snapshot do Documento:", docSnapshot.data());
        if (docSnapshot.exists()) {
          const dados = docSnapshot.data();
          setNumeroContrato(dados.numeroContrato);
          setRazao(dados.razao);
          setCpf(dados.cpf);
          setCnpj(dados.cnpj);
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
          setCancelado(dados.cancelado);
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
          setRamal(dados.ramal);
          setSiteSim(dados.siteSim);
          setSiteNao(dados.siteNao);
          setCelular(dados.celular);
          setEquipe(dados.equipe);
          setDeclaro(dados.declaro);
          setEmail2(dados.email2);
          setModelo(dados.modelo);
          setImagem(dados.imagem);
          setFormaPagamento(dados.formaPagamento);
        } else {
          setMensagem("Cliente não encontrado");
        }
      } catch (error) {
        setMensagem("Erro ao obter dados do cliente");
        console.error("Erro ao obter dados do cliente:", error);
      }
    };
    fetchData();
  }, [db, id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("ID do Cliente:", id);
        const clienteDocRef = doc(db, "clientes", id);
        console.log("Referência do Documento:", clienteDocRef);
        const docSnapshot = await getDoc(clienteDocRef);
        console.log("Snapshot do Documento:", docSnapshot.data());
        if (docSnapshot.exists()) {
          const dados = docSnapshot.data();
          setFormState({
            ...formState,
            qrCode: dados.qrCode, // Defina o campo qrCode
          });
        } else {
          setMensagem("Cliente não encontrado");
        }
      } catch (error) {
        setMensagem("Erro ao obter dados do cliente");
        console.error("Erro ao obter dados do cliente:", error);
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
  const handleDownloadPDF = async () => {
    // Seleciona os elementos que você deseja incluir no PDF
    const elementos = document.querySelectorAll(".element");

    // Cria um novo documento HTML para armazenar o conteúdo
    const docHTML = document.createElement("div");

    // Função para gerar QR Code e retornar uma Promise
    const generateQRCode = async (qrCodeValue) => {
      return new Promise((resolve, reject) => {
        qrCode
          .toDataURL(qrCodeValue, { type: "image/jpeg" })
          .then((dataUrl) => resolve(dataUrl))
          .catch((error) => reject(error));
      });
    };

    // Itera sobre os elementos selecionados
    for (const elemento of elementos) {
      // Clona o elemento principal
      const elementoClonado = elemento.cloneNode(true);

      // Busca a div com a classe 'inf' dentro do elemento principal
      const divArea = elementoClonado.querySelector(".areaqr");

      // Se a div 'areaqr' não for encontrada, pule para o próximo elemento
      if (!divArea) continue;

      elementoClonado.classList.add("pdf-element");

      // Cria uma div para conter o QR Code
      const divElement = document.createElement("div");
      divElement.className = "qr-code";

      // Gera o QR Code como uma imagem
      const qrCodeValue = formState.qrCode;
      try {
        // Aguarda a geração do QR Code
        const dataUrl = await generateQRCode(qrCodeValue);

        // Cria um elemento de imagem com o QR Code
        const img = document.createElement("img");
        img.src = dataUrl;

        // Adiciona o elemento de imagem à div
        divElement.appendChild(img);

        // Insere a div do QR Code dentro da div 'inf'
        divArea.appendChild(divElement);
      } catch (error) {
        console.error("Erro ao gerar QR Code:", error);
      }

      // Adiciona o elemento principal clonado ao documento HTML
      docHTML.appendChild(elementoClonado);
    }

    const elementosClonados = docHTML.querySelectorAll(".element");
    elementosClonados.forEach((elementoClonado) => {
      elementoClonado.style.textAlign = "center"; // Centraliza o conteúdo
      elementoClonado.style.fontSize = "10px"; // Define um tamanho de fonte menor (alterado para 10px)
      elementoClonado.style.lineHeight = "1.2"; // Define a altura da linha para evitar o texto sobreposto
      // Adicione outras propriedades de estilo conforme necessário para reduzir o tamanho das informações
    });

    const options = {
      filename: `${razao}.pdf`,
      image: { type: "jpeg", quality: 1 }, // Melhora a qualidade da imagem
      html2canvas: { scale: 2 }, // Aumenta a escala para melhorar a qualidade da imagem
      jsPDF: {
        format: "a4",
        margin: { top: 40, right: 40, bottom: 40, left: 40 }, // Define margens em todos os lados
      },
    };

    // Usa o html2pdf para converter o documento HTML em PDF e fazer o download
    html2pdf().set(options).from(docHTML).save();
  };
  const handleScan = (data) => {
    if (data) {
      setScannedData(data);
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

  return (
    <div>
      <div className="background">
        <div className="element contrato container-fluid titulo-2 " id="formId">
          <div>
            <div className="logo ">
              <img src="../../../img/logo_contrato_maps.jpg" alt="" />
            </div>
            <table>
              <tbody>
                <tr>
                  <td className="baixo baixo-menor">
                    <p>
                      <b>CONTRATO Nº</b>
                    </p>
                    <input
                      className="form-control"
                      onChange={(e) => setNumeroContrato(e.target.value)}
                      value={numeroContrato}
                      disabled
                      type="text"
                      id="contrato"
                      placeholder="Nº"
                    />
                  </td>
                  <td className="baixo ">
                    <p>
                      <b>DATA</b>
                    </p>
                    <input
                      onChange={(e) => setData(e.target.value)}
                      value={data}
                      disabled
                      id="date"
                      type="date"
                      className="form-control"
                    />
                  </td>
                  <td className="baixo ">
                    <p>
                      <b>OPERADOR</b>
                    </p>
                    <input
                      onChange={(e) => setOperador(e.target.value)}
                      value={operador}
                      disabled
                      id="text"
                      type="text"
                      className="form-control"
                      placeholder="Operador"
                    />
                  </td>
                  <td className="baixo baixo-medio">
                    <p>
                      <b>EQUIPE</b>
                    </p>
                    <input
                      onChange={(e) => setEquipe(e.target.value)}
                      value={equipe}
                      disabled
                      id="text"
                      type="text"
                      className="form-control"
                      placeholder="Equipe"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="acessoriaNew ">
              <div className="input-group row">
                <div></div>
                <h2 className="font-weight-bold frase col-sm-6">
                  <u>VALIDO POR 1 ANO, PLANO:</u>
                </h2>
                <div className="col-sm-4 select-validade">
                  <input
                    type="text"
                    name=""
                    id=""
                    value={validade.toUpperCase()}
                    disabled
                    className="form-control"
                  />
                </div>

                {cancelado === "sim" && (
                  <>
                    <h2 className="font-weight-bold frase col-sm-6">
                      <u>CANCELAMENTO:</u>
                    </h2>
                    <div className="col-sm-4 select-validade">
                      <input
                        className="form-control"
                        disabled
                        value={cancelado.toUpperCase()}
                        type="text"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="linha3">
              <h3 className="">DADOS DA EMPRESA</h3>
            </div>
            <form className="caixa2 ">
              <div className="row">
                <div className="col-md-6 ">
                  <label
                    className="d-flex align-items-center justify-content-center lblInfo"
                    htmlFor="lblInfo"
                  >
                    <b>RAZÃO SOCIAL:</b>
                  </label>
                  <input
                    type="text"
                    id="razaoSocial"
                    name="razaoSocial"
                    onChange={(e) => setRazao(e.target.value)}
                    disabled
                    value={razao}
                    className="form-control"
                    placeholder="Razão social"
                  />
                </div>

                <div className="col-md-6">
                  <label
                    className="d-flex align-items-center justify-content-center"
                    htmlFor="lblInfo"
                  >
                    <b>CNPJ/CPF:</b>
                  </label>
                  <input
                    type="text"
                    id="razaoSocial"
                    name="razaoSocial"
                    onChange={(e) => setCpf(e.target.value)}
                    disabled
                    value={cpf || cnpj}
                    className="form-control"
                    placeholder="CNPJ/CPF"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label
                    className="d-flex align-items-center justify-content-center"
                    htmlFor="lblInfo"
                  >
                    <b>NOME FANTASIA:</b>
                  </label>
                  <input
                    type="text"
                    id="nomeFantasia"
                    name="nomeFantasia"
                    onChange={(e) => setFantasia(e.target.value)}
                    disabled
                    value={fantasia}
                    className="form-control"
                    placeholder="Nome Fantasia"
                  />
                </div>

                <div className="col-md-6">
                  <label
                    className="d-flex align-items-center justify-content-center"
                    htmlFor="lblInfo"
                  >
                    <b>ENDEREÇO COMERCIAL:</b>
                  </label>
                  <input
                    type="text"
                    id="nomeFantasia"
                    name="nomeFantasia"
                    onChange={(e) => setEndereco(e.target.value)}
                    disabled
                    value={endereco}
                    className="form-control"
                    placeholder="Endereço"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label
                    className="d-flex align-items-center justify-content-center"
                    htmlFor="lblInfo"
                  >
                    <b>BAIRRO:</b>
                  </label>
                  <input
                    type="text"
                    id="nomeFantasia"
                    name="nomeFantasia"
                    onChange={(e) => setBairro(e.target.value)}
                    disabled
                    value={bairro}
                    className="form-control"
                    placeholder="Bairro"
                  />
                </div>
                <div className="col-md-6">
                  <label
                    className="d-flex align-items-center justify-content-center"
                    htmlFor="lblInfo "
                  >
                    <b>CEP:</b>
                  </label>
                  <input
                    type="text"
                    id="razaoSocial"
                    name="razaoSocial"
                    onChange={(e) => setCep(e.target.value)}
                    disabled
                    value={cep}
                    className="form-control"
                    placeholder="Cep"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label
                    className="d-flex align-items-center justify-content-center"
                    htmlFor="nomeFantasia"
                  >
                    <b>ESTADO:</b>
                  </label>
                  <input
                    type="text"
                    id="nomeFantasia"
                    name="nomeFantasia"
                    onChange={(e) => setUf(e.target.value)}
                    disabled
                    value={uf}
                    className="form-control"
                    placeholder="Estado"
                  />
                </div>
                <div className="col-md-6">
                  <label
                    className="d-flex align-items-center justify-content-center"
                    htmlFor="razaoSocial"
                  >
                    <b>CIDADE:</b>
                  </label>
                  <input
                    type="text"
                    id="razaoSocial"
                    name="razaoSocial"
                    onChange={(e) => setCidade(e.target.value)}
                    disabled
                    value={cidade}
                    className="form-control"
                    placeholder="Cidade"
                  />
                </div>
              </div>
              <div className="contact">
                <h2 className="d-flex align-items-center justify-content-center">
                  <b>
                    <u>CONTATOS E HORÁRIO DE FUNCIONAMENTO DA EMPRESA;</u>
                  </b>
                </h2>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label
                    className="d-flex align-items-center justify-content-center"
                    htmlFor="nomeFantasia"
                  >
                    <b>TELEFONE FIXO:</b>
                  </label>
                  <input
                    type="text"
                    id="nomeFantasia"
                    name="nomeFantasia"
                    onChange={(e) => setFone(e.target.value)}
                    disabled
                    value={fone}
                    className="form-control"
                    placeholder="Telefone"
                  />
                </div>
                <div className="col-md-6">
                  <label
                    className="d-flex align-items-center justify-content-center"
                    htmlFor="horario"
                  >
                    <b>CELULAR:</b>
                  </label>
                  <input
                    type="text"
                    id="nomeFantasia"
                    name="nomeFantasia"
                    onChange={(e) => setCelular(e.target.value)}
                    disabled
                    value={celular}
                    className="form-control"
                    placeholder="Horario de funcionamento"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label
                    className="d-flex align-items-center justify-content-center"
                    htmlFor="razaoSocial"
                  >
                    <b>WHATSAPP COMERCIAL:</b>
                  </label>
                  <input
                    type="text"
                    id="razaoSocial"
                    name="razaoSocial"
                    onChange={(e) => setWhats(e.target.value)}
                    disabled
                    value={whats}
                    className="form-control"
                    placeholder="WhatsApp"
                  />
                </div>

                <div className="col-md-6">
                  <label
                    className="d-flex align-items-center justify-content-center"
                    htmlFor="razaoSocial"
                  >
                    <b>HORÁRIO DE FUNCIONAMENTO:</b>
                  </label>

                  <input
                    type="text"
                    id="nomeFantasia"
                    name="nomeFantasia"
                    onChange={(e) => setFuncionamento(e.target.value)}
                    disabled
                    value={funcionamento}
                    className="form-control"
                    placeholder="Horario de funcionamento"
                  />
                </div>
              </div>
              <div className="contact">
                <h2 className="d-flex align-items-center justify-content-center">
                  <b>
                    <u>
                      E-MAIL PARA RECEBER AS NOTIFICAÇÕES E AVALIAÇÕES DOS
                      CLIENTES;
                    </u>
                  </b>
                </h2>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label
                    className="d-flex align-items-center justify-content-center"
                    htmlFor="razaoSocial"
                  >
                    <b>1º E-MAIL:</b>
                  </label>
                  <input
                    type="text"
                    id="razaoSocial"
                    name="razaoSocial"
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                    value={email}
                    className="form-control"
                    placeholder="E-mail"
                  />
                </div>
                <div className="col-md-6">
                  <label
                    className="d-flex align-items-center justify-content-center"
                    htmlFor="razaoSocial"
                  >
                    <b>2º E-MAIL:</b>
                  </label>
                  <input
                    type="text"
                    id="razaoSocial"
                    name="razaoSocial"
                    onChange={(e) => setEmail2(e.target.value)}
                    disabled
                    value={email2}
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
              <br />
              <div className="row"></div>
              {/* <div className="contact">
                            <h2 className="d-flex align-items-center justify-content-center">
                                <b><u>SERVIÇOS ADCIONAIS;</u></b>
                            </h2>
                        </div> */}
              <div className="row">
                <div className=" divAnuncio form-group temSite col-md-5">
                  <label htmlFor="temSite" className="form-check-label">
                    <b>CRIAÇÃO E DESENVOLVIMENTO DE WEB SITE</b>
                  </label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="temSite"
                      name="temSite"
                      checked={siteSim}
                      onChange={(e) => setSiteSim(e.target.checked)}
                      disabled
                      className="form-check-input"
                    />
                  </div>
                </div>
                <div className="divAnuncio form-group temSite col-md-7.">
                  <label htmlFor="temLojaFisica" className="form-check-label">
                    <b>ANÚNCIO PATROCINADO GOOGLE ADS</b>
                  </label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="temLojaFisica"
                      name="temLojaFisica"
                      checked={siteNao}
                      onChange={(e) => setSiteNao(e.target.checked)}
                      disabled
                      className="form-check-input"
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-12">
                  <label
                    className="d-flex align-items-center justify-content-center"
                    htmlFor="razaoSocial"
                  >
                    <b>LINK DA PÁGINA GOOGLE:</b>
                  </label>
                  <input
                    type="text"
                    id="razaoSocial"
                    name="razaoSocial"
                    onChange={(e) => setLink(e.target.value)}
                    disabled
                    value={link}
                    className="form-control"
                    placeholder="Link"
                  />
                </div>
                <div className="col-md-12">
                  <label
                    className="d-flex align-items-center justify-content-center"
                    htmlFor="nomeFantasia"
                  >
                    <b>OBSERVAÇÕES:</b>
                  </label>
                  <textarea
                    type="text"
                    id="nomeFantasia"
                    name="nomeFantasia"
                    onChange={(e) => setObs(e.target.value)}
                    disabled
                    value={obs}
                    className="form-control"
                    placeholder="Observações"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label
                    className="d-flex align-items-center justify-content-center"
                    htmlFor="nomeFantasia"
                  >
                    <b>NOME DO RESPONSÁVEL:</b>
                  </label>
                  <input
                    type="text"
                    id="nomeFantasia"
                    name="nomeFantasia"
                    onChange={(e) => setNome(e.target.value)}
                    disabled
                    value={nome}
                    className="form-control"
                    placeholder="Autorizante"
                  />
                </div>
                <div className="col-md-6">
                  <label
                    className="d-flex align-items-center justify-content-center"
                    htmlFor="nomeFantasia"
                  >
                    <b>CARGO:</b>
                  </label>
                  <input
                    type="text"
                    id="nomeFantasia"
                    name="nomeFantasia"
                    onChange={(e) => setCargo(e.target.value)}
                    disabled
                    value={cargo}
                    className="form-control"
                    placeholder="Cargo"
                  />
                </div>
              </div>
              <p className="pg-contrato-1">Página 1 de 2</p>
            </form>

            {/* <div className="escrever2 row ">
                        <h5>
                            ASSINATURA DA CONTRATADA:
                        </h5>
                        <img src="../../../img/assinatura-maps.jpg" alt="" />
                    </div> */}
            {/* <div className="logo ">
                        <img src="../../../img/tag.png" alt="" />
                    </div> */}
            <div className="cond">
              <br />
              {cancelado !== "sim" && (
  <>
    <br /> <br /> <br /> <br />
  </>
)}

              <u className="font-weight-bold">CONDIÇÕES</u>
              <p className=" font-weight-bold ">
                {" "}
                1º- ESTOU CIENTE QUE PARA CRIAÇÃO OU ATUALIZAÇÃO DA MINHA PAGÍNA
                DEVO ENCAMINHAR PARA A EMPRESA CONTRATADA QUANDO SOLICITADO POR
                PARTE DA EQUIPE DE SUPORTE TODAS AS INFORMAÇÕES NECESSARIAS.{" "}
                <br /> 2º- TODAS AS SOLICITAÇÕES DEVERÃO SER ENCAMINHADAS PARA O
                DEPARTAMENTO DE MARKETING ATRAVÉS DO E-MAIL OU WHATSAPP AQUI
                DISPONIBILIZADOS CENTRAL DE ATENDIMENTO; 0800 580 2766 / 0800
                050 0069 E-MAIL: MARKETING@GRUPOMAPSEMPRESAS.COM.BR
                <br /> 3º- ASSUMO TAMBÉM A TOTAL RESPONSABILIDADE E AUTORIZO QUE
                A EMPRESA CONTRATADA DIVULGUE OS MEUS DADOS COMERCIAIS NO SITE
                DE BUSCA.
                <br /> 4º SOBRE AS CONDIÇÕES ASSUMO AS OBRIGAÇÕES COM ESTA
                PRESTAÇÃO DE SERVIÇOS DE MARKETING DIGITAL REALIZADA PELA
                EMPRESA G MAPS CONTACT CENTER LTDA CNPJ; 40.407.753/0001-30
                TENDO CIÊNCIA DO VALOR DE R$
                <input
                  className="txtAcordo txtCond"
                  onChange={(e) => setValor(e.target.value)}
                  value={valor}
                  type="text"
                  placeholder=""
                />{" "}
                NO PLANO {validade.toUpperCase()} .
                <br /> 5º-SABENDO QUE O NÃO PAGAMENTO PODE GERAR A NEGATIVAÇÃO
                DO CPF/CNPJ JUNTO AOS ORGÃOS COMPETENTES (SERASA/CARTÓRIO). E A
                COBRANÇA ANTECIPADA DO SEU PERÍODO DE VALIDADE. <br />{" "}
                <u>
                  6º- ACEITE DOS SERVIÇOS FOI REALIZADA DE FORMA VERBAL CONFORME
                  O ARTIGO 107 DO CODIGO CIVIL LEI 10406 DE 10 DE JANEIRO DE
                  2002 E QUE A CÓPIA DESTE CONTRATO FOI ENCAMINHADA PARA O
                  E-MAIL PRINCIPAL INFORMADO ACIMA.
                </u>
                <br />
                7º-A CONTRATADA ASSUME AS OBRIGAÇÕES JUNTO A CONTRATANTE DE
                CONCLUIR E ENTREGAR OS SERVIÇOS PRESTADOS DENTRO DO PERÍODO DE
                ATÉ 72 HORAS ÚTEIS.
              </p>
              <div className="row faixa-arrow">
                <div className="flecha-amarela">
                  <i
                    class="fa-solid fa-arrow-right"
                    style={{ color: "#FFD43B" }}
                  ></i>
                </div>
                <div className="linha-verde ">
                  <a href="https://drive.google.com/file/d/17YZoqz97bDo_1fWqzaDggmdN1iQSnMtn/view?usp=sharing">
                    <img src="../../../img/Imagem2.jpg" alt="" />
                  </a>
                </div>
                <div className="flecha-amarela">
                  <i
                    class="fa-solid fa-arrow-left"
                    style={{ color: "#FFD43B" }}
                  ></i>
                </div>
                <div className="direitos1">
                  <p className="font-weight-bold">
                    <u> CLIQUE NA IMAGEM A CIMA PARA VERIFICAR OS TERMOS</u>
                  </p>
                </div>
              </div>
              <div className="row d-flex justify-content-center renovacao">
                <div className="form-check col-md-1 mb-3">
                  <input
                    onChange={(e) => setDeclaro(e.target.checked)}
                    disabled
                    checked={declaro}
                    className="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                  />
                </div>
                <p className="col-md-11. mb-3">
                  <b>
                    DECLARO TER LIDO OS TERMOS DE USO ESTANDO EM PLENA E TOTAL
                    CONCORDÂNCIA.
                  </b>
                </p>
              </div>
              <div className="row d-flex justify-content-center renova">
                <p className="col-md-3 mb-3">
                  <b>Renovação automatica</b>
                </p>
                <div className="form-check col-md-1 mb-3">
                  <input
                    onChange={(e) => setRenovSim(e.target.checked)}
                    disabled
                    checked={renovSim}
                    className="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    <b>Sim</b>
                  </label>
                </div>
                <div className="form-check mb-3">
                  <input
                    onChange={(e) => setRenovNao(e.target.checked)}
                    disabled
                    checked={renovNao}
                    className="form-check-input"
                    type="checkbox"
                    id="flexCheckChecked"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckChecked"
                  >
                    <b>Não</b>
                  </label>
                </div>
              </div>
              <div className="linha3">
                <h3 className="">BÔNUS</h3>
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
                  <label
                    className="custom-control-label"
                    htmlFor="cartaoDigital"
                  >
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
                    <input
                      className="txtAcordo"
                      onChange={(e) => setValor(e.target.value)}
                      value={valor}
                      type="text"
                      placeholder=""
                      disabled
                    />
                    a ser pago em
                    <select
                      className="txtAcordo select_acordo form-select-sm"
                      onChange={(e) => setParcelas(e.target.value)}
                      id="estado"
                      disabled
                      required
                    >
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
                    parcela(s) via{" "}
                    <select
                      className=" txtAcordo select_acordo form-select-sm"
                      onChange={(e) => setFormaPagamento(e.target.value)}
                      id="estado"
                      disabled
                      required
                    >
                      <option value="">{formaPagamento}</option>
                      <option value="pix">pix</option>
                      <option value="boleto">boleto</option>
                      <option value="credito">crédito</option>
                    </select>
                    com o vencimento para o dia
                    <input
                      className="txtAcordo"
                      onChange={(e) => setVenc2(e.target.value)}
                      type="date"
                      disabled
                      value={venc2}
                    />
                    .
                  </u>
                </p>
              </div>
              <div className="cond">
                <p className=" font-weight-bold ">
                  O PAGAMENTO PODE SER FEITO ATRAVÉS DO BOLETO BANCÁRIO OU PIX
                  QR-CODE DISPONÍVEL NO BOLETO, ENVIADO ATRAVÉS DO E-MAIL E
                  WHATSAPP DO CONTRATANTE.
                </p>
              </div>
              <div className="inf">
                <h3>
                  <b>ACEITE REALIZADO DE FORMA VERBAL;</b>
                </h3>
                <h3>
                  <b>PARA VERIFICAR SUA ADESÃO</b>
                </h3>
                <h3>
                  <b>APONTE A CAMÊRA DO CELULAR PARA O QRCODE ABAIXO;</b>
                </h3>
                <div className="areaqr">
                  <div className="qr-code">
                    <QRCode value={formState.qrCode} />
                  </div>
                </div>
                <h3>
                  <b>
                    CENTRAL DE ATENDIMENTO
                    <br />
                    (11) 4200-6110 / (11) 3939-2301 / 0800 050 0069
                    <br /> <br />
                    <a href="mailto:Marketing@grupomapsempresas.com.br">
                      MARKETING@GRUPOMAPSEMPRESAS.com.br
                    </a>
                    <br />
                    <a href="mailto:Contato@grupomapsempresas.com.br">
                      CONTATO@GRUPOMAPSEMPRESAS.com.br
                    </a>
                    <br />
                    <br />
                    PARA ATENDIMENTO VIA WHATSAPP BASTA CLICAR NO ICONE ABAIXO;
                    <br />
                  </b>
                </h3>
                <div className="logo-whats">
                  <a href="https://wa.link/sudq6c">
                    <img src="../../../img/whats.png" alt="" />
                  </a>
                </div>
              </div>
            </div>
            <p className="pg-contrato-2">Página 2 de 2</p>
          </div>
          {mensagem.length > 0 ? (
            <div className="alert alert-danger mt-2" role="alert">
              {mensagem}
            </div>
          ) : null}
          {sucesso === "S" ? <Navigate to="/app/home" /> : null}
        </div>
        <div className="row salvar">
          <button
            className="btn btn-danger btn-cli"
            onClick={handleDownloadPDF}
            disabled={loader}
          >
            <i className="fa-solid fa-file-pdf"></i>
            {loader ? <span>Baixando</span> : <span>Baixar PDF</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
export default FichaCliente;
