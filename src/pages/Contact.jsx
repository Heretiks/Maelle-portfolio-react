import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import '../assets/styles/pages/Contact.css';


const Contact = () => {
    return (
        <div className="contact-page">
            <Header/>

            {/* Formulaire de contact */}
            <main className="contact-container">

                <form className="contact-form" /*onSubmit={handleSubmit}*/>
                    <input
                        type="text"
                        name="nom"
                        placeholder="Votre nom"
                        // value={formData.nom}
                        // onChange={handleChange}
                        required
                        className="contact-input"
                        maxLength="32"
                    />
                    <input
                        type="email"
                        name="mail"
                        placeholder="Votre email"
                        // value={formData.mail}
                        // onChange={handleChange}
                        required
                        className="contact-input"
                        maxLength="50"
                    />
                    <textarea
                        name="message"
                        placeholder="Votre message"
                        // value={formData.message}
                        // onChange={handleChange}
                        required
                        rows="5"
                        className="contact-textarea"
                        maxLength="500"
                    />
                    <button type="submit" className="contact-button">Envoyer</button>
                </form>

            </main>

            <Footer/>
        </div>
    );
};

export default Contact;
