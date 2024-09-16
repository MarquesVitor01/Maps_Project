import React from "react";
import './features.css'
function Features(){
    return (
        <div  className="sobre-nos">
          <h1 className="titulo-sobre">
          </h1>
          <div className="container">
            <div className="section">
              <div className="text-image">
                <img src="../../../img/danresa-missao.jpg" alt="Visão" className="image" />
                <div className="text">
                  <h2>Visão</h2>
                  <p>Ajudar empreendedores a construir negócios rentáveis e escaláveis.</p>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="text-image">
                <img src="../../../img/R.jpeg" alt="Missão" className="image" />
                <div className="text">
                  <h2>Missão</h2>
                  <p>Ser a melhor propulsora de negócios através do conhecimento, resultado e relacionamento.</p>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="text-image">
                <img src="../../../img/persistencia-o-que-e-e-a-importancia-de-ser-persistente.webp" alt="Valores" className="image" />
                <div className="text">
                  <h2>Valores</h2>
                  <p>Inovação, persistência, alegria, praticidade, inspiração e transformação.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}
export default Features;