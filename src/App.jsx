import React, { useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import Lenis from 'lenis';
import './assets/styles/App.scss';
import {AnimatePresence} from "framer-motion";

import AppLoader from "./components/AppLoader.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
// import PortfolioContainer from './pages/PortfolioContainer.jsx';
// import ListingProject from './pages/ListingProjects.jsx';
// import Contact from './pages/Contact.jsx';
// import DetailProjet from './pages/DetailProjet.jsx';
// import LegalPage from "./pages/LegalPage.jsx";

const PortfolioContainer = React.lazy(() => import('./pages/PortfolioContainer.jsx'));
const ListingProject = React.lazy(() => import('./pages/ListingProjects.jsx'));
const Contact = React.lazy(() => import('./pages/Contact.jsx'));
const DetailProjet = React.lazy(() => import('./pages/DetailProjet.jsx'));
const LegalPage = React.lazy(() => import('./pages/LegalPage.jsx'));

function App() {
    const location = useLocation();
    const lenisRef = useRef(null);
    const actualRoute = useRef(location.pathname);

    // Initialisation de Lenis
    useEffect(() => {
        lenisRef.current = new Lenis({
            smooth: true,
            lerp: 0.1,
            duration: 0.8,
            touch: true,
            inverse: false,
            smoothWheel: true,
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

    // Scroll top lors de chaque changement de route et refresh (sauf quand on quitte Listing)
    useEffect(() => {
        const handleScroll = () => {
            if (lenisRef.current) {
                if (actualRoute.current === '/projets') {
                    setTimeout(() => {
                        lenisRef.current.scrollTo(-100, { immediate: false, force: true, duration: 0.4 });
                    }, 1000);
                } else {
                    lenisRef.current.scrollTo(-100, { immediate: false, force: true, duration: 0.4 });
                }

                setTimeout(() => {
                    lenisRef.current.stop();
                }, 500);

                setTimeout(() => {
                    lenisRef.current.start();
                }, 2000);
            }
        };

        handleScroll();
        window.addEventListener('load', handleScroll);
        actualRoute.current = location.pathname;

        return () => {
            window.removeEventListener('load', handleScroll);
        };
    }, [location.pathname]);

    // Stop scroll si menu mobile ouvert
    const handleInteraction = () => {
        let isMobileMenuOpen;

        setTimeout(() => {
            isMobileMenuOpen = document.querySelectorAll(".open");

            if (isMobileMenuOpen.length > 0) {
                lenisRef.current.stop();
            } else {
                lenisRef.current.start();
            }

        }, 150)


    };

    // Stop scroll si menu mobile ouvert
    useEffect(() => {
        document.addEventListener('mousedown', handleInteraction);
        document.addEventListener('touchstart', handleInteraction);

        return () => {
            document.removeEventListener('mousedown', handleInteraction);
            document.removeEventListener('touchstart', handleInteraction);
        };
    }, []);

    return (
        <>
            <CustomCursor />
            <AppLoader>
                <SpeedInsights />
                <Analytics />

                <ScrollToTop lenis={lenisRef} />

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
            </AppLoader>
        </>
    );
}

export default App;
