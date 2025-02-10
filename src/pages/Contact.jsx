import "../assets/styles/pages/Contact.css"; // Importation du fichier CSS
import Motif from '../assets/global/motif-grand.png'
import Logo from '../assets/global/logo.svg'
import {Link} from "react-router-dom";

const ContactForm = () => {

    // Quand on clique sur le bouton Envoyer :
    //    - Verification des données (nom, mail et message)
    //    - Envoi des infos du formulaire via EmailJS à l'adresse : contact@portfolio.com

    return (
        <div className="container">
            {/* Motif du haut */}
            <img src={Motif} alt="Motif haut" className="motif motif-top" />

            <div className="content">
                {/* Logo MC */}
                <Link to="/" className="logo">
                    <img src={Logo} alt="Logo MC" className="logo-img" />
                </Link>

                {/* Formulaire */}
                <div className="form-container">
                    <h2 className="title">PARLONS DE VOTRE PROJET</h2>
                    <form className="form">
                        <input type="text" placeholder="NOM" className="input" />
                        <input type="email" placeholder="MAIL" className="input" />
                        <textarea placeholder="MESSAGE" className="textarea"></textarea>
                        <button type="submit" className="button">ENVOYER</button>
                    </form>
                </div>
            </div>

            {/* Motif du bas */}
            <img src={Motif} alt="Motif bas" className="motif motif-bottom" />
        </div>
    );
};

export default ContactForm;
