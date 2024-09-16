import React from "react";
import './primeira.css'
import { Link } from 'react-router-dom';

function PrimeiraVendas() {


    return (
        <div className="sct-background">
            <h1>
                Selecione o setor desejado:
            </h1>
            <div className="boxes1 text-light">
                <div className="box0">
                    <h1>
                        Vendas Divulgação
                    </h1>
                    <p  className="box-venda text-light">Clique aqui para realizar vendas de divulgação.</p>
                    <Link to="/app/home" className="btn btn-modify" type="button" id="button-addon2">
                        Entrar
                    </Link>
                </div>
                <div className="box0">
                    <h1 >
                        Vendas de site
                    </h1>
                    <p className="box-venda text-light">Clique aqui para realizar vendas de sites.</p>
                    <Link to="/app/homesite" className="btn btn-modify" type="button" id="button-addon2">
                        Entrar
                    </Link>
                </div>
            </div>
            
        </div>
    )
}

export default PrimeiraVendas;