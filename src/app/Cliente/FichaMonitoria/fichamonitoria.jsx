import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from 'react-router-dom';
import './fichamonitoria.css'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import 'firebase/firestore'

function FichaMonitoria() {
    const [nota, setNota] = useState('');
    const [apresentacao, setApresentacao] = useState('');
    const [google, setGoogle] = useState('');
    const [dadosEmpresa, setDadosEmpresa] = useState('')
    const [prop, setProp] = useState('');
    const [conf, setConf] = useState('');
    const [venc, setVenc] = useState('');
    const [importanteDado, setImportanteDado] = useState('');
    const [encaminharCliente, setEncaminharCliente] = useState(false);
    const [naoEncaminharCliente, setNaoEncaminharCliente] = useState(false);
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
                    setApresentacao(dados.apresentacao);
                    setGoogle(dados.google);
                    setImportanteDado(dados.importanteDado);
                    setProp(dados.prop);
                    setVenc(dados.venc);
                    setDadosEmpresa(dados.dadosEmpresa);
                    setConf(dados.conf);
                    setEncaminharCliente(dados.encaminharCliente);
                    setNaoEncaminharCliente(dados.naoEncaminharCliente)
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
                    importanteDado: importanteDado,
                    apresentacao: apresentacao,
                    google: google,
                    dadosEmpresa: dadosEmpresa,
                    conf: conf,
                    encaminharCliente: encaminharCliente, // Alterado para naoEncaminharCliente
                    naoEncaminharCliente: naoEncaminharCliente, 
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
    return (
        <div>
            <div className="background9">
                <form className="box">
                    <div className="title">
                        <h1>
                            Avaliação da Venda
                        </h1>
                    </div>

                    <div className="">
                        <h5>
                            Regras:
                        </h5>
                        <p >
                            Cada operador inicia sua jornada mensal com 10 pontos. <br />
                            Para cada erro na venda ou em preenchimento incorreto das fichas, seram descontados os seguinte pontos:
                        </p>
                        <p className="red">
                            - Não se apresentar adequadamente(dizer que é do google ou de outro setor) = Pontuação zerada automaticamente. <br />
                            - Não validar se esta falando com o responsavel = -2 pontos. <br />
                            - Para cada dado não validado = -0,25 pontos. <br />
                            - Não confirmar valor ou data de vencimento = - 3 pontos. <br />
                            - Sem confirmação dos serviços por parte do cliente = -3 pontos.
                        </p>
                    </div>

                    <div>
                        <div className="caixa-cobrador">
                            <div className="input-group-prendend">
                                <span className="input-group-text">Apresentação</span>
                            </div>
                            <input onChange={(e) => setApresentacao(e.target.value)} value={apresentacao} id="date" placeholder="Insira OK para tudo certo ou insira sua observação de melhoria." type="text" className="form-control" />
                        </div>
                        <div className="caixa-cobrador">
                            <div className="input-group-prendend">
                                <span className="input-group-text">Google:</span>
                            </div>
                            <input onChange={(e) => setGoogle(e.target.value)} value={google} id="date" type="text" placeholder="Insira OK para tudo certo ou insira sua observação de melhoria." className="form-control" />
                        </div>
                        <div className="caixa-cobrador">
                            <div className="input-group-prendend">
                                <span className="input-group-text">Responsavel:</span>
                            </div>
                            <input onChange={(e) => setProp(e.target.value)} value={prop} id="date" type="text" placeholder="Insira OK para tudo certo ou insira sua observação de melhoria." className="form-control" />
                        </div>
                        <div className="caixa-cobrador">
                            <div className="input-group-prendend">
                                <span className="input-group-text">CNPJ:</span>
                            </div>
                            <input onChange={(e) => setImportanteDado(e.target.value)} value={importanteDado} id="date" placeholder="Insira OK para tudo certo ou insira sua observação de melhoria." type="text" className="form-control" />
                        </div>
                        <div className="caixa-cobrador">
                            <div className="input-group-prendend">
                                <span className="input-group-text">Dados:</span>
                            </div>
                            <input onChange={(e) => setDadosEmpresa(e.target.value)} value={dadosEmpresa} id="date" placeholder="Insira OK para tudo certo ou insira sua observação de melhoria." type="text" className="form-control" />
                        </div>
                        <div className="caixa-cobrador">
                            <div className="input-group-prendend">
                                <span className="input-group-text">Data e valor do vencimento:</span>
                            </div>
                            <input onChange={(e) => setVenc(e.target.value)} value={venc} id="date" type="text" placeholder="Insira OK para tudo certo ou insira sua observação de melhoria." className="form-control" />
                        </div>
                        <div className="caixa-cobrador">
                            <div className="input-group-prendend">
                                <span className="input-group-text">Confirmação:</span>
                            </div>
                            <input onChange={(e) => setConf(e.target.value)} value={conf} id="date" type="text" placeholder="Insira OK para tudo certo ou insira sua observação de melhoria." className="form-control" />
                        </div>
                        <br />
                        <div>
                            <p className="red"> - Use a calculadora para verificar a nota do usuario, e a selecione no campo a baixo.</p>
                        </div>
                        <div className="calculator">
                            <input className="display" type="text" value={display} readOnly />
                            <div className="btnGeral">
                                <button className="btnCalc" onClick={() => handleClick('1')}>1</button>
                                <button className="btnCalc" onClick={() => handleClick('2')}>2</button>
                                <button className="btnCalc" onClick={() => handleClick('3')}>3</button>
                                <button className="btnCalc" onClick={() => handleClick('+')}>+</button>
                                <button className="btnCalc" onClick={() => handleClick('4')}>4</button>
                                <button className="btnCalc" onClick={() => handleClick('5')}>5</button>
                                <button className="btnCalc" onClick={() => handleClick('6')}>6</button>
                                <button className="btnCalc" onClick={() => handleClick('-')}>-</button>
                                <button className="btnCalc" onClick={() => handleClick('7')}>7</button>
                                <button className="btnCalc" onClick={() => handleClick('8')}>8</button>
                                <button className="btnCalc" onClick={() => handleClick('9')}>9</button>
                                <button className="btnCalc" onClick={() => handleClick('*')}>*</button>
                                <button className="btnCalc" onClick={() => handleClick('0')}>0</button>
                                <button className="btnCalc" onClick={() => handleClick('.')}>.</button>
                                <button className="btnCalc" onClick={clearDisplay}>C</button>
                                <button className="btnCalc" onClick={calculate}>=</button>
                            </div>
                        </div>

                        <select className="custom-select d-block" onChange={(e) => setNota(e.target.value)} value={nota} id="estado" required>
                            <option value="">Escolha</option>
                            <option value="1">1</option>
                            <option value="1.25">1.25</option>
                            <option value="1.50">1.50</option>
                            <option value="1.75">1.75</option>
                            <option value="2">2</option>
                            <option value="2.25">2.25</option>
                            <option value="2.50">2.50</option>
                            <option value="2.75">2.75</option>
                            <option value="3">3</option>
                            <option value="3.25">3.25</option>
                            <option value="3.50">3.50</option>
                            <option value="3.75">3.75</option>
                            <option value="4">4</option>
                            <option value="4.25">4.25</option>
                            <option value="4.50">4.50</option>
                            <option value="4.75">4.75</option>
                            <option value="5">5</option>
                            <option value="5.25">5.25</option>
                            <option value="5.50">5.50</option>
                            <option value="5.75">5.75</option>
                            <option value="6">6</option>
                            <option value="6.25">6.25</option>
                            <option value="6.50">6.50</option>
                            <option value="6.75">6.75</option>
                            <option value="7">7</option>
                            <option value="7.25">7.25</option>
                            <option value="7.50">7.50</option>
                            <option value="7.75">7.75</option>
                            <option value="8">8</option>
                            <option value="8.25">8.25</option>
                            <option value="8.50">8.50</option>
                            <option value="8.75">8.75</option>
                            <option value="9">9</option>
                            <option value="9.25">9.25</option>
                            <option value="9.50">9.50</option>
                            <option value="9.75">9.75</option>
                            <option value="10">10</option>
                        </select>
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
            </div>
            <div className="voltar row">
                <Link to="/app/monitoriamapsempresas" className="btn btn-warning btn-acao">Voltar</Link>
                <button onClick={AlterarCliente} type="button" className="btn btn-primary btn-acao">Salvar</button>
            </div>
        </div>
    );
}

export default FichaMonitoria;