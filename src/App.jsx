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
import {AnimatePresence, useAnimate} from "framer-motion";

function App() {
    const location = useLocation();
    const lenisRef = useRef(null);

    // Pour data-jumble
    const [scope, animate] = useAnimate();

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

    // Scroll to top lors de chaque changement de route et refresh
    useEffect(() => {
        const handleScroll = () => {
            if (lenisRef.current) {
                lenisRef.current.scrollTo(-100, { immediate: false, force: true, duration: 0.4 });

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

        return () => {
            window.removeEventListener('load', handleScroll);
        };
    }, [location.pathname]);

    // Pour data-jumble
    useEffect(() => {

        const jumbleElements = document.querySelectorAll('[data-jumble]');
        jumbleElements.forEach((element) => {
            const originalText = element.textContent;

            const scrambleText = () => {
                return originalText
                    .split('')
                    .sort(() => Math.random() - 0.5)
                    .join('');
            };

            element.addEventListener('mouseenter', () => {
                let iterations = 0;
                const interval = setInterval(() => {
                    if (iterations < 3) {
                        animate(element, { opacity: [1, 0, 1] }, { duration: 0.1 });
                        element.textContent = scrambleText();
                        iterations++;
                    } else {
                        clearInterval(interval);
                        animate(element, { opacity: 1 }, { duration: 0.2 });
                        element.textContent = originalText;
                    }
                }, 100);
            });

            element.addEventListener('mouseleave', () => {
                animate(element, { opacity: 1 }, { duration: 0.2 });
                element.textContent = originalText;
            });

        });
    }, [animate, location.pathname]);

    return (
        <div ref={scope}>
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
        </div>
    );
}

export default App;
