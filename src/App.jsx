import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
// import 'lenis/dist/lenis.css'

import PortfolioContainer from './pages/PortfolioContainer.jsx';
import ListingProject from './pages/ListingProjects.jsx';
import Contact from './pages/Contact.jsx';
import DetailProjet from './pages/DetailProjet.jsx';
import CustomCursor from "./components/CustomCursor.jsx";
import './App.css';

function App() {
    const location = useLocation();

    useEffect(() => {
        const lenis = new Lenis({
            smooth: true,
            lerp: 0.2,
            duration: 1,
            touch: true,
            inverse: false,
            smoothWheel: true,
            normalizeWheel: true
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
            <CustomCursor />
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
