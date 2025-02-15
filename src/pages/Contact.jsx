import "../assets/styles/pages/Contact.scss";
import Motif from '../assets/global/motif-grand.png';
import Logo from '../assets/global/logo.svg';
import Bullet from '../assets/global/left-bullet-point.svg';
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import {useEffect, useRef, useState} from "react";
import EmailJS from '@emailjs/browser'
import gsap from "gsap";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const logoRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

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

    const handleMouseEnter = () => {
        gsap.to(logoRef.current, {
            scale: 1.2,
            duration: 0.2,
            ease: "power1.out",
            repeat: 3,
            yoyo: true,
        });
    };

    // useEffect(() => {
    //     // Détecte si l'utilisateur est sur un appareil tactile
    //     const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    //
    //     // Vérifie l'URL
    //     const isContactPage = window.location.pathname === '/contact';
    //
    //     // Applique les styles si l'URL est '/' et l'appareil est tactile
    //     if (isTouchDevice && isContactPage) {
    //         document.body.style.overflow = 'hidden';
    //         document.body.style.position = 'relative';
    //     }
    //
    //     // Nettoie les styles lorsque le composant est démonté
    //     return () => {
    //         if (isTouchDevice && isContactPage) {
    //             document.body.style.overflow = '';
    //             document.body.style.position = '';
    //         }
    //     };
    // }, []);

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
                        onMouseEnter={handleMouseEnter}
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
            <img src={Motif} alt="Motif bas" className="motif motif-bottom" />
        </div>
    );
};

export default ContactForm;
