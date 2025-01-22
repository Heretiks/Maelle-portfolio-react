import {Routes, Route, Navigate } from 'react-router-dom';
import PortfolioContainer from './pages/PortfolioContainer.jsx';
import ListingProject from './pages/ListingProjects.jsx';
import Contact from './pages/Contact.jsx';
import DetailProjet from './pages/DetailProjet.jsx';
import CustomCursor from "./components/CustomCursor.jsx";
import './App.css';

function App() {
    return (
        <>
            <CustomCursor/>
            <Routes>
                <Route path="/" element={<PortfolioContainer />} />
                <Route path="/projets" element={<ListingProject />} />
                <Route path="/projet/:projectId" element={<DetailProjet />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
}

export default App;
