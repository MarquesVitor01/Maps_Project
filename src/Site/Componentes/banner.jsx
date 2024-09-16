import React from "react";
import './banner.css'
function Banner(){
    return (
        <div className="banner">
          <div className="banner-content banner-top-shadow banner-bottom-shadow">
            <div className="image-container">
              <img src="../../../img/banner.webp" alt="Banner" className="banner-image" />
            </div>
            
            <div className="text-container">
                    <a href="/app" className="btn btn-light btn-lg btn-banner entrar btn-entrar"><b>Entrar</b></a>
              <h1 className="first-text">Realize seu acesso aqui!</h1>
            </div>
          </div>
        </div>
      );
}
export default Banner;