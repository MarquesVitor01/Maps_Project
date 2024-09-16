import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "./footer.css";

function Footer() {
    return (
        <footer id="contatos" className="footer">
            <div className="container">
                <div className="row">
                    <div className="footer-logo-container">
                        <img
                            src="../../../img/mps.jpg"
                            alt="Logo"
                            className="footer-logo"
                        />
                    </div>
                    <div className="footer-info">
                        <div className="footer-contact text-light">
                            <h5>Contato</h5>
                            <p className="text-light"><b>Email</b></p>
                            <p className="text-light">contato@grupomapsempresas.com.br</p>
                            <p className="text-light">marketing@grupomapsempresas.com.br</p>
                            <p className="text-light"><b>Telefone</b> </p>
                            <p className="text-light">(11) 3939-2301</p>
                        </div>
                        <div className="footer-social">
                            <h5 className="text-light" >Redes Sociais</h5>
                            <ul className="social-icons">
                                <li>
                                    <a href="https://www.facebook.com/grupomapsempresas">
                                        <FaFacebook />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.twitter.com">
                                        <FaTwitter />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com">
                                        <FaInstagram />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;