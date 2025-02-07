import projects from "../data/projets.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import '../assets/styles/pages/ListingProjects.css';
import {Link} from "react-router-dom";


const ListingProjects = () => {
    return (
        <div className="listing-projects">
            <Header/>

            {/* Grille des projets */}
            <main className="grid">
                {projects.map((project) => (
                    <Link to={"/projet/" + project.id} key={project.id} className="grid-item">
                        <img src={project.imageCarre} alt={`Project ${project.id}`}/>
                    </Link>
                ))}

            </main>

            <Footer/>

        </div>
    );
};

export default ListingProjects;
