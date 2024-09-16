import React from "react";
import './features.css';

function Features() {
    return (
        <div id="servicos" className="sobre">
            <h1 className="titulo-servicos">
                Serviços
            </h1>
            <div className="container-fe">
                <div className="card">
                    <img src="../../../img/captura.png" alt="Imagem 1" />
                    <div className="content">
                        <h2>Sites</h2>
                        <p>Desenvolvimento de sites profissionais.</p>
                        <a href="/galeria" className="saiba-mais">Saiba Mais</a>
                    </div>
                </div>
                <div className="card">
                    <img src="../../../img/captura02.png" alt="Imagem 2" />
                    <div className="content">
                        <h2>Divulgação</h2>
                        <p>Criação e manutenção de páginas dentro das maiores redes.</p>
                        <a href="/galeria" className="saiba-mais">Saiba Mais</a>
                    </div>
                </div>
                <div className="card">
                    <img src="../../../img/captura03.jpeg" alt="Imagem 3" />
                    <div className="content">
                        <h2>Tráfego pago</h2>
                        <p>Realizando estratégias de Marketing Digital para alavancar sua marca.</p>
                        <a href="/trafegopago" className="saiba-mais">Venha conhecer!</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Features;