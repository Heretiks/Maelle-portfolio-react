import {Routes, Route, Navigate } from 'react-router-dom';
import PortfolioContainer from './pages/PortfolioContainer.jsx';
import ListingProject from './pages/ListingProjects.jsx';
import Contact from './pages/Contact.jsx';
import './App.css';

function App() {
    return (
        <Routes>
            <Route path="/" element={<PortfolioContainer />} />
            <Route path="/projets" element={<ListingProject />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
