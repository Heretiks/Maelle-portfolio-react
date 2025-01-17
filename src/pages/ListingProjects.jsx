import React from "react";
import projects from "../data/projets.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";


const ListingProjects = () => {
    return (
        <div className="listing-projects">
            <Header/>

            {/* Grille des projets */}
            <main className="grid">
                {projects.map((project) => (
                    <a href={"/projet/" + project.id} key={project.id} className="grid-item">
                        <img src={project.imageCarre} alt={`Project ${project.id}`}/>
                    </a>
                ))}

            </main>

            <Footer/>

        </div>
    );
};

export default ListingProjects;
