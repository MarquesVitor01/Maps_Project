import React from "react";
import './primeira.css'
import { Link } from 'react-router-dom';

function Primeira() {


    return (
        <div className="sct-background">
            <h1>
                Selecione o setor desejado:
            </h1>
            <div className="boxes1 text-light">
                <div className="box0">
                    <h1>
                        Vendas
                    </h1>
                    <div className="row d-flex justify-content-center ">
                    <p  className="box-venda text-light">Clique aqui para acessar a área de vendas.</p>
                    <Link to="/app/home" className="btn btn-modify btn-space" type="button" id="button-addon2">
                        Entrar
                    </Link>
                    <br /><br />
                    <Link to="/app/homesite" className="btn btn-modify2 btn-space" type="button" id="button-addon2">
                        Entrar
                    </Link>
                    </div>
                </div>
                <div className="box0">
                    <h1 >
                        Monitoria
                    </h1>
                    <p className="box-venda text-light">Clique aqui para verificar a monitoria.</p>
                    <Link to="/app/monitoriamapsempresas" className="btn btn-modify" type="button" id="button-addon2">
                        Entrar
                    </Link>
                </div>
                <div className="box0">
                    <h1 >
                        Marketing
                    </h1>
                    <p className="box-venda text-light">Clique aqui para ter uma visão do marketing.</p>
                    <Link to="/app/marketingmapsempresas" className="btn btn-modify" type="button" id="button-addon2">
                        Entrar
                    </Link>
                </div>
            </div>
            <div className="boxes1 text-light ">
                <div className="box0">
                    <h1 >
                        Gestão
                    </h1>
                    <p className="box-venda text-light">Clique aqui para se certificar da gestão.</p>
                    <Link to="/app/gestaomapsempresas" className="btn btn-modify" type="button" id="button-addon2">
                        Entrar
                    </Link>
                </div>
                <div className="box0">
                    <h1 >
                        Financeiro
                    </h1>
                    <p className="box-venda text-light">Clique aqui para ver a situação financeira.</p>
                    <Link to="/app/financeiromapsempresas" className="btn btn-modify" type="button" id="button-addon2">
                        Entrar
                    </Link>
                </div>
                <div className="box0">
                    <h1 >
                        Cobrança
                    </h1>
                    <p className="box-venda text-light">Clique aqui para monitorar a cobrança.</p>
                    <Link to="/app/cobrancamapsempresas" className="btn btn-modify" type="button" id="button-addon2">
                        Entrar
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Primeira;