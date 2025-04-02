import '../assets/styles/pages/MentionsLegales.scss'
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet-async";

const MentionsLegales = () => {
    return (
        <>
            <Helmet>
                <title>Mentions Légales | Maëlle Camissogo</title>
                <meta name="description" content="Découvrez les mentions légales du site Maëlle Camissogo, site web de Maëlle Camissogo, graphiste et directrice artistique professionnelle." />
                <meta property="og:title" content="Mentions Legales | Maëlle Camissogo" />
                <meta property="og:description" content="Découvrez mes réalisations graphiques et projets de design." />
                <meta property="og:url" content="https://maellecamissogo.com/mentions-legales" />

                <link rel="canonical" href="https://maellecamissogo.com/mentions-legales" />
            </Helmet>

            <div className="mentions-legales">
                <h1 className={"main-title"}>Mentions Légales</h1>

                <br /><br /><br />

                <h2>1. Informations Légales</h2>
                <p>
                    Conformément aux dispositions des articles 6-III et 19 de la Loi
                    n°2004-575 du 21 juin 2004 pour la confiance dans l&#39;économie numérique,
                    il est porté à la connaissance des utilisateurs du site les présentes
                    mentions légales.
                </p>

                <br/>

                <p>
                    <strong>Propriétaire du site :</strong>
                    <br />
                    Nom : Maëlle Camissogo
                    <br />
                    Statut : Graphiste Indépendante
                    <br />
                    Email : m.camissogo@gmail.com
                    <br />
                    SIRET : 89313669700016
                </p>

                <p>
                    <strong>Directeur de la publication :</strong>
                    <br />
                    Nom : Maëlle Camissogo
                    <br />
                    Statut : Graphiste Indépendante
                    <br />
                    Email : m.camissogo@gmail.com
                </p>

                <p>
                    <strong>Développeur/Créateur du site :</strong>
                    <br />
                    Nom : Julien Larguier
                    <br />
                    Statut : Développeur web indépendant
                    <br />
                    Email : julienlarguier1@gmail.com
                </p>

                <p>
                    <strong>Hébergeur du site :</strong>
                    <br />
                    Le site est hébergé par <strong>Vercel</strong>, dont le siège social
                    est situé à :
                    <br />
                    440 N Barranca Ave #4133, Covina, CA 91723, USA
                    <br />
                    Site web :{" "}
                    <Link to="https://vercel.com" target="_blank" rel="noopener noreferrer">
                        https://vercel.com
                    </Link>
                </p>

                <p>
                    <strong>Gestion du nom de domaine :</strong>
                    <br />
                    Le nom de domaine est géré par <strong>OVH</strong>, dont le siège
                    social est situé à :
                    <br />
                    2 rue Kellermann - 59100 Roubaix - France
                    <br />
                    Site web :{" "}
                    <Link to="https://www.ovh.com" target="_blank" rel="noopener noreferrer">
                        https://www.ovh.com
                    </Link>
                </p>

                <br /><br />

                <h2>2. Propriété Intellectuelle et Contenu</h2>
                <p>
                    L&#39;ensemble du contenu présent sur le site (textes, images, logos,
                    codes, etc.) est protégé par les lois en vigueur sur la propriété
                    intellectuelle.
                </p>
                <p>
                    Toute reproduction, modification ou diffusion, partielle ou totale,
                    sans autorisation expresse de l&#39;auteur est strictement interdite et
                    constitue une contrefaçon sanctionnée par les articles L.335-2 et
                    suivants du Code de la propriété intellectuelle.
                </p>

                <br /><br />

                <h2>3. Limitation de Responsabilité</h2>
                <p>
                    Le propriétaire du site s&#39;efforce de fournir des informations exactes
                    et à jour. Toutefois, il ne saurait être tenu responsable des omissions,
                    inexactitudes ou défaillances dans la mise à jour des informations.
                </p>
                <p>
                    Les liens externes présents sur le site peuvent rediriger vers des sites
                    tiers dont le contenu n&#39;engage en rien la responsabilité de l&#39;éditeur.
                </p>

                <br /><br />

                <h2>4. Données Personnelles et Confidentialité</h2>
                <p>
                    Le site ne collecte pas de données personnelles sans consentement
                    explicite.
                    <br />
                    Si un formulaire de contact est présent, les informations envoyées sont
                    uniquement utilisées pour répondre aux demandes des utilisateurs et ne
                    sont pas revendues ou partagées.
                </p>
                <p>
                    Conformément au Règlement Général sur la Protection des Données (RGPD),
                    l&#39;utilisateur dispose d&#39;un droit d&#39;accès, de rectification et de
                    suppression de ses données en contactant l&#39;email indiqué ci-dessus.
                </p>

                <br /><br />

                <h2>5. Cookies</h2>
                <p>
                    Le site n&#39;utilise pas de cookies à des fins de suivi ou de publicité. Si
                    des cookies techniques sont déployés pour assurer le bon fonctionnement
                    du site, ils ne nécessitent pas de consentement.
                </p>

                <br /><br />

                <h2>6. Droit Applicable</h2>
                <p>
                    Tout litige en relation avec l&#39;utilisation du site est soumis au droit
                    français. En cas de différend, les parties s&#39;efforceront de résoudre
                    celui-ci à l&#39;amiable avant toute action judiciaire.
                </p>

                <br />

                <p className="maj-date">
                    <strong>Mise à jour :</strong> 26/03/2025
                </p>

                <Link to={"/"} className="back-home">Retour à l&#39;accueil</Link>

                <br/><br/><br/>

                <Link to={"/politique-de-confidentialite"} className={"politique-link"}>Politique de Confidentialité</Link>
            </div>

        </>
    );
};

export default MentionsLegales;
