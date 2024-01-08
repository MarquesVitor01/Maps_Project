import React from "react";

function Banner(){
    return <section id="banner">
        <div className="container">
            <div className="row">

                <div className="col-lg-6">
                    <h1>Grupo Maps Marketing Digital.</h1>
                    <h4>Alavancando sua empresa dentro do Google Maps!</h4>
                    <a href="/app/novaconta" className="btn btn-dark btn-lg btn-banner">Criar Conta</a>
                    <a href="/app" className="btn btn-dark btn-lg btn-banner">Entrar</a>
                </div>
                <div className="col-lg-6">
                    <img src="https://www.techscrolling.com/wp-content/uploads/2018/02/Optimizing-Website-for-Google-Maps-Marketing.jpeg" alt="Gmaps" />
                </div>

            </div>
        </div>
    </section>
}

export default Banner;