import React from "react";

function Testemunho(){
    return <section id="testemunho">
        <div className="container">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div className="carousel-inner testemunho">
    <div className="carousel-item active box">
        <h2>Borracharia do pereira</h2>
      <img className="d-block w-100 " src="https://lh3.googleusercontent.com/p/AF1QipNAcB4P9-v39ZjPoMEcstcviAnCJ0gD3ZDWZbWG=s1280-p-no-v1" alt="Primeiro Slide"/>
    </div>
    <div className="carousel-item box">
        <h2>Vidraçaria Beirude</h2>
      <img className="d-block w-100" src="https://3.bp.blogspot.com/-dYlWCJFNV5U/V7GsHy_rdQI/AAAAAAAABkA/rfnSij555vQ38Ust1Ae6Od4XU7NVbithQCLcB/s1600/vidro%2Burbano%2B%25283%2529.JPG" alt="Segundo Slide"/>
    </div>
    <div className="carousel-item box">
        <h2>Churrascaria do Roberto</h2>
      <img className="d-block w-100" src="https://vemsersmile.com.br/assets/uploads/about-img.jpg" alt="Terceiro Slide"/>
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Anterior</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Próximo</span>
  </a>
</div>
        </div>
    </section>
}

export default Testemunho;