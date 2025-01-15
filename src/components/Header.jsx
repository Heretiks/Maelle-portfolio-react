// src/components/Header.jsx
import React from "react";
import LogoMc from "../assets/global/logo.svg";
import MotifMc from "../assets/global/motif.png";

const Header = () => {
    return (
        <header className="header">
            <img src={LogoMc} alt="Logo de Maëlle Camissogo" className="logo"/>
            <img src={MotifMc} alt="Motif de Maëlle Camissogo" className="motif"/>
            <a href="/contact" className="contact-button">CONTACT</a>
        </header>
    );
};

export default Header;