// src/components/Header.jsx
import React from "react";
import MotifMc from "../assets/global/motif.png";

const Footer = () => {
    return (
        <footer className="footer">
            <img src={MotifMc} alt="Motif de Maëlle Camissogo" className="end-motif"/>
        </footer>
    );
};

export default Footer;