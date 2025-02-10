// src/components/Header.jsx
// import MotifMc from "../assets/global/motif.png";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer
            className="footer"
            style={{ visibility: location.pathname.startsWith('/projets') ? "initial" : "hidden " }}
        >
            <p className="nom-maelle" >Maëlle Camissogo, Graphiste</p>
            <Link className="contact-link" to="/contact">Un projet ?</Link>
            {/*<img src={MotifMc} alt="Motif de Maëlle Camissogo" className="end-motif"/>*/}
        </footer>
    );
};

export default Footer;