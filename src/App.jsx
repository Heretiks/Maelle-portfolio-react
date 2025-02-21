import { useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import Lenis from 'lenis';
import './assets/styles/App.scss';

import PortfolioContainer from './pages/PortfolioContainer.jsx';
import ListingProject from './pages/ListingProjects.jsx';
import Contact from './pages/Contact.jsx';
import DetailProjet from './pages/DetailProjet.jsx';
import CustomCursor from "./components/CustomCursor.jsx";
import LegalPage from "./pages/LegalPage.jsx";
import {AnimatePresence} from "framer-motion";

function App() {
    const location = useLocation();
    const lenisRef = useRef(null);

    // Initialisation de Lenis
    useEffect(() => {
        lenisRef.current = new Lenis({
            smooth: true,
            lerp: 0.15,
            duration: 0.8,
            touch: true,
            inverse: false,
            smoothWheel: false,
            normalizeWheel: true
        });

        function raf(time) {
            lenisRef.current.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenisRef.current.destroy();
        };
    }, []);

    // Scroll to top lors de chaque changement de route
    useEffect(() => {
        // Assurez-vous que Lenis est bien initialisé avant de l'utiliser
        // TEST : j'ai enlever (&& location.pathname !== "/projets") pour test si GSAP fonctionne encore bien malgres le scroll, normalement oui
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: false }); // Scroll to top sur chaque changement d'URL
        }
    }, [location.pathname]);

    return (
        <>
            <SpeedInsights />
            <Analytics />

            <CustomCursor />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<PortfolioContainer />} />
                    <Route path="/projets" element={<ListingProject />} />
                    <Route path="/projet/:projectId" element={<DetailProjet />} />
                    <Route path="/contact" element={<Contact />} />

                    <Route path="/mentions-legales" element={<LegalPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AnimatePresence>
        </>
    );
}

export default App;
