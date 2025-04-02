import "/src/assets/styles/pages/MentionsLegales.scss";
import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";

const PolitiqueConfidentialite = () => {
    return (
        <>
            <Helmet>
                <title>Politique de Confidentialité | Maëlle Camissogo</title>
                <meta name="description" content="Découvrez la politique de confidentialité du site Maëlle Camissogo, site web de Maëlle Camissogo, graphiste et directrice artistique professionnelle." />
                <meta property="og:title" content="Mentions Legales | Maëlle Camissogo" />
                <meta property="og:description" content="Découvrez mes réalisations graphiques et projets de design." />
                <meta property="og:url" content="https://maellecamissogo.com/politique-de-confidentialite/" />

                <link rel="canonical" href="https://maellecamissogo.com/politique-de-confidentialite/" />

            </Helmet>

            <div className="politique-confidentialite">
                <h1 className={"main-title"}>Politique de Confidentialité</h1>

                <br/><br/>

                <h2>1. Introduction</h2>
                <p>
                    La présente Politique de Confidentialité a pour objectif de vous
                    informer de manière transparente sur la collecte, l&#39;utilisation et la
                    protection de vos données personnelles lorsque vous utilisez notre
                    formulaire de contact.
                </p>

                <br/> <br/>

                <h2>2. Collecte des Informations</h2>
                <p>
                    Nous collectons les informations suivantes lorsque vous remplissez notre
                    formulaire de contact :
                </p>
                <ul>
                    <li><strong>Nom</strong> : Afin de personnaliser notre réponse.</li>
                    <li><strong>Email</strong> : Afin de vous répondre et de conserver un
                        moyen de communication.</li>
                    <li><strong>Message</strong> : Le contenu de votre demande ou question
                        pour pouvoir y répondre correctement.</li>
                </ul>

                <br/> <br/>

                <h2>3. Utilisation des Données</h2>
                <p>
                    Les informations collectées sont utilisées exclusivement pour :
                </p>
                <ul>
                    <li>
                        Vous répondre en utilisant l&#39;adresse e-mail fournie pour la gestion
                        des demandes via le formulaire.
                    </li>
                    <li>
                        Stocker les informations pour faciliter le suivi de vos demandes, si
                        nécessaire, et pour pouvoir vous recontacter à l&#39;avenir si besoin.
                    </li>
                </ul>

                <br/> <br/>

                <h2>4. Utilisation d&#39;EmailJS</h2>
                <p>
                    Nous utilisons le service EmailJS pour envoyer les informations du
                    formulaire (nom, email, message) à l&#39;adresse email du propriétaire du
                    site. Vos informations ne sont pas stockées sur notre serveur, mais
                    uniquement envoyées par EmailJS vers l&#39;email du propriétaire.
                </p>
                <p>
                    EmailJS agit uniquement en tant que fournisseur de service d&#39;envoi de
                    mails et ne conserve pas vos données après leur transmission. Pour plus
                    d&#39;informations, vous pouvez consulter la politique de confidentialité
                    d&#39;EmailJS sur leur site web.
                </p>

                <br/> <br/>

                <h2>5. Stockage des Données</h2>
                <p>
                    Les informations collectées via le formulaire ne sont stockées que pour
                    une période nécessaire afin de répondre à vos demandes ou de faciliter
                    le suivi. Les données ne sont en aucun cas revendues à des tiers et ne
                    sont utilisées que dans le cadre de la gestion de la relation avec
                    l&#39;utilisateur.
                </p>

                <br/> <br/>

                <h2>6. Sécurité des Données</h2>
                <p>
                    Nous prenons des mesures raisonnables pour protéger vos informations
                    personnelles. Cependant, aucune méthode de transmission sur Internet ou
                    de stockage électronique n&#39;est totalement sécurisée. Nous ne pouvons
                    garantir une sécurité absolue, mais nous mettons tout en œuvre pour
                    protéger vos données.
                </p>

                <br/> <br/>

                <h2>7. Vos Droits sur Vos Données Personnelles</h2>
                <p>
                    Conformément au Règlement Général sur la Protection des Données (RGPD),
                    vous disposez des droits suivants concernant vos données personnelles :
                </p>
                <ul>
                    <li><strong>Droit d&#39;accès</strong> : Vous pouvez demander à accéder aux
                        informations que nous avons collectées sur vous.</li>
                    <li><strong>Droit de rectification</strong> : Vous pouvez demander à
                        rectifier toute information inexacte vous concernant.</li>
                    <li><strong>Droit à l&#39;effacement</strong> : Vous pouvez demander la
                        suppression de vos données dans les limites prévues par la loi.</li>
                    <li><strong>Droit d&#39;opposition</strong> : Vous pouvez vous opposer au
                        traitement de vos données dans certaines situations.</li>
                </ul>
                <p>
                    Pour exercer vos droits, veuillez nous contacter via l&#39;email indiqué
                    dans la section &#34;Contact&#34; de notre site.
                </p>

                <br/> <br/>

                <h2>8. Modification de la Politique de Confidentialité</h2>
                <p>
                    Nous nous réservons le droit de modifier cette Politique de
                    Confidentialité à tout moment. Toute modification sera publiée sur cette
                    page avec la date de mise à jour. Nous vous encourageons à consulter
                    régulièrement cette politique pour être informé des éventuelles mises à
                    jour.
                </p>

                <br/> <br/>

                <h2>9. Droit Applicable</h2>
                <p>
                    Cette politique de confidentialité est régie par la législation française.
                </p>

                <br/>

                <p className="maj-date">
                    <strong>Mise à jour :</strong> 26/03/2025
                </p>

                <Link to={"/"} className="back-home">Retour à l&#39;accueil</Link>

                <br/><br/><br/>

                <Link to={"/mentions-legales"} className={"mentions-link"}>Mentions Légales</Link>

            </div>
        </>
    );
};

export default PolitiqueConfidentialite;
