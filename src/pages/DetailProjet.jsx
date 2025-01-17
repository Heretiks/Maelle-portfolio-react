import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import projects from '../data/projets.js';
import '../App.css';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function DetailProjet() {
    // Récupérer l'id du projet depuis l'URL
    const { projectId } = useParams();

    // Trouver le projet correspondant
    const project = projects.find(p => p.id === parseInt(projectId, 10));

    // Si le projet n'existe pas, rediriger vers la liste des projets ou une page d'erreur
    if (!project) {
        return <Navigate to="/projets" replace />;
    }

    return (
        <div className="detail-projet">
            <Header />

            {/* Contenu du projet */}
            <main className="detail-container">
                <div className="presentation-projet">
                    <img className="image-presentaion" src={project.image} alt={project.title} />

                    <div className="content-presentation">
                        <div className="info">
                            <div className="category">
                                <p className="category-title">Catégorie</p>
                                <p className="category-text">{project.category}</p>
                            </div>
                            <span className="divider"></span>
                            <div className="title">
                                <p className="title-title">Projet</p>
                                <p className="title-text">{project.title}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="info-projet">
                    <p className="project-description">{project.description}</p>
                </div>
                <div className="autre-projet">
                    <a className="lien-liste-projets" href="/projets">+ de projets</a>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default DetailProjet;
