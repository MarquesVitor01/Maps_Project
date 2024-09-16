import React from "react";
import './menu.css'
function Menu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <div className="container cont-img">
        <a className="navbar-brand " href="/#">
          <img src="../../../img/mps.jpg" width="85" height="80" alt="" />
        </a>
        {/* <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Alterna navegação"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-lg-flex justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">

          </ul>
        </div> */}
      </div>
    </nav>
  );
}

export default Menu;