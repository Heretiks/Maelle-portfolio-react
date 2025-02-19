import "../assets/styles/pages/Contact.scss";
import Motif from '../assets/global/motif-grand.png';
import Logo from '../assets/global/logo.svg';
import Bullet from '../assets/global/left-bullet-point.svg';
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import {useEffect, useRef, useState} from "react";
import EmailJS from '@emailjs/browser'
// import gsap from "gsap";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const logoRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [bigHeight, setBigHeight] = useState(window.innerHeight > 700); // Utilisation de state

    // Savoir si on affiche motif-bottom ou non (height > 700px)
    useEffect(() => {
        const handleResize = () => {
            setBigHeight(window.innerHeight > 700);
        };

        // Ajouter un écouteur de redimensionnement
        window.addEventListener("resize", handleResize);

        // Nettoyage de l'écouteur au démontage
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Vérification des champs
        if (!formData.name || !formData.email || !formData.message) {
            alert("Veuillez remplir tous les champs.");
            setIsSubmitting(false);
            return;
        }

        try {
            // Envoi via EmailJS
            await EmailJS.send(
                "service_lfnnnup", // Remplace par ton service ID
                "template_dn3ie19", // Remplace par ton template ID
                {
                    nom: formData.name,
                    email: formData.email,
                    message: formData.message,
                },
                "CgtLsRoIl8NdjzEEP" // Remplace par ton user ID (public key)
            );

            setSuccessMessage("Votre message a été envoyé avec succès !");
            setFormData({ name: "", email: "", message: "" }); // Réinitialisation du formulaire
        } catch (error) {
            console.log(error);
            alert("Une erreur est survenue lors de l'envoi du message.");
        }

        setIsSubmitting(false);
    };

    return (
        <div className="container">
            <Header />
            <Link to="/" className="retour-accueil">
                <img src={Bullet} alt="Next" className="arrow-icon" />
            </Link>
            <Link to="/projets" className="retour-listing">
                <p className="lien-listing">Vue d&#39;ensemble</p>
            </Link>
            <img src={Motif} alt="Motif haut" className="motif motif-top" />
            <div className="content">
                <Link to="/" className="logo">
                    <img
                        src={Logo}
                        alt="Logo MC"
                        className="logo-img"
                        ref={logoRef}
                        // onMouseEnter={handleMouseEnter}
                    />
                </Link>
                <div className="form-container">
                    <h2 className="title">PARLONS DE VOTRE PROJET</h2>
                    <form className="form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="NOM"
                            className="input"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete={"name"}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="MAIL"
                            className="input"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete={"email"}
                        />
                        <textarea
                            name="message"
                            placeholder="MESSAGE"
                            className="textarea"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                        <button type="submit" className={`button ${successMessage ? "hide" : ""}`}  disabled={isSubmitting}>
                            {isSubmitting ? "ENVOI EN COURS..." : "ENVOYER"}
                        </button>
                    </form>
                    {successMessage && <p className="success-message">{successMessage}</p>}
                </div>
            </div>
            <img src={Motif} alt="Motif bas" className={`motif motif-bottom ${bigHeight ? "big" : ""}`} />
        </div>
    );
};

export default ContactForm;
