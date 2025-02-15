// LegalPage.js
import '../assets/styles/pages/LegalPage.scss'
import {Link} from "react-router-dom";

const LegalPage = () => {
    return (
        <div className="legal-container">
            <h1>Mentions légales</h1>

            <section>
                <h2>Éditeur du site</h2>
                <p>
                    Le site www.maellecamissogo.com est édité par :
                    <strong> Julien Larguier</strong><br />
                    Adresse : 3 allée du Savoir<br />
                    Téléphone : 06 06 06 06 06<br />
                    Email : <a href="mailto:julienlarguier1@gmail.com">julienlarguier1@gmail.com</a>
                </p>
            </section>

            <section>
                <h2>Responsabilité</h2>
                <p>
                    Les informations contenues sur ce site sont fournies à titre indicatif. L'éditeur ne pourra être tenu responsable des erreurs ou omissions qui pourraient y figurer.
                </p>
            </section>

            <section>
                <h2>Propriété intellectuelle</h2>
                <p>
                    L'ensemble des éléments présents sur le site (textes, images, vidéos, etc.) sont protégés par les droits d'auteur et sont la propriété de leur auteur ou de leurs ayants droit.
                </p>
            </section>

            <section>
                <h2>Cookies</h2>
                <p>
                    Ce site utilise des cookies pour améliorer l'expérience utilisateur. Pour en savoir plus sur notre utilisation des cookies, veuillez consulter notre <a href="/politique-de-confidentialite">politique de confidentialité</a>.
                </p>
            </section>

            <section>
                <h2>Contact</h2>
                <p>
                    Pour toute question, vous pouvez nous contacter à l'adresse email : <a href="mailto:m.camissogo@gmail.com">m.camissogo@gmail.com</a>.
                </p>
            </section>

            <section>
                <p className="back-home">
                    <Link to="/">Retour à l'accueil</Link>
                </p>
            </section>
        </div>
    );
};

export default LegalPage;
