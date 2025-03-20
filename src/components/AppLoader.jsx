import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "./LoadingProvider";

// Variable globale pour suivre si le chargement initial a eu lieu
let initialLoadDone = false;

const AppLoader = ({ children }) => {
    const { isLoading } = useLoading();
    const [showPreloader, setShowPreloader] = useState(!initialLoadDone);
    const [showWhiteTransition, setShowWhiteTransition] = useState(false);
    const [removePreloader, setRemovePreloader] = useState(false);
    const [gridConfig, setGridConfig] = useState({ columns: 0, rows: 0, cellWidth: 0, cellHeight: 0, gap: 10 });

    const isMobileFormat = window.innerWidth < window.innerHeight;
    const whiteTransitionDuration = isMobileFormat ? 0.6 : 0.9;

    // code pour le mode puzzle
    const [randomOrder, setRandomOrder] = useState([]);
    useEffect(() => {
        const totalCells = gridConfig.columns * gridConfig.rows;
        const order = Array.from({ length: totalCells }, (_, i) => i);
        for (let i = order.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [order[i], order[j]] = [order[j], order[i]];
        }
        setRandomOrder(order);
    }, [gridConfig]);
    // Fin code pour le mode puzzle

    const delay = 2.5 / ( gridConfig.columns * gridConfig.rows);

    const updateGridConfig = useCallback(() => {
        const aspectRatio = 150 / 38.81;
        const gap = 10; // Espacement entre les éléments
        const availableWidth = window.innerWidth - (Math.floor(window.innerWidth / 150) - 1) * gap;
        const cellWidth = Math.ceil(availableWidth / Math.floor(availableWidth / 150));
        const cellHeight = cellWidth / aspectRatio;
        const columns = Math.ceil(window.innerWidth / (cellWidth + gap));
        const rows = Math.ceil(window.innerHeight / (cellHeight + gap));
        setGridConfig({ columns, rows, cellWidth, cellHeight, gap });
    }, []);

    useEffect(() => {
        if (!initialLoadDone) {
            const timer = setTimeout(() => {
                if (!isLoading) {
                    setShowWhiteTransition(true);
                }
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    useEffect(() => {
        updateGridConfig();
        const debouncedResize = debounce(updateGridConfig, 250);
        window.addEventListener("resize", debouncedResize);
        return () => window.removeEventListener("resize", debouncedResize);
    }, [updateGridConfig]);

    const blackScreenVariants = {
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    };

    const whiteScreenVariants = {
        hidden: { y: "100%" },
        visible: { y: 0 },
        exit: { y: "-100%" },
    };

    if (initialLoadDone) {
        return <>{children}</>;
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
            >
                {children}
            </motion.div>

            {!removePreloader && (
                <>
                    <AnimatePresence>
                        {(showPreloader || showWhiteTransition) && (
                            <motion.div
                                key="black-screen"
                                variants={blackScreenVariants}
                                initial="visible"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                                style={{
                                    position: "fixed",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "black",
                                    zIndex: 999998,
                                }}
                            >
                                <div className="preloader-content" style={{
                                    gridTemplateColumns: `repeat(${gridConfig.columns}, ${gridConfig.cellWidth}px)`,
                                    gridTemplateRows: `repeat(${gridConfig.rows}, ${gridConfig.cellHeight}px)`,
                                    gap: `${gridConfig.gap}px`,
                                    // gridAutoFlow: "column", // Disposition en colonnes (inutile en mode puzzle)
                                }}>

                                    {/* Début de la version Puzzle */}

                                    {randomOrder.map((index, orderIndex) => {
                                        const colIndex = Math.floor(index / gridConfig.rows);
                                        const rowIndex = index % gridConfig.rows;
                                        return (
                                            <motion.img
                                                src="/images/motif-grand.png"
                                                alt="Motif de Maëlle Camissogo"
                                                key={index}
                                                initial={{ opacity: 0, scale: 0.2 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{
                                                    delay: orderIndex * delay, // Délai basé sur l'ordre aléatoire
                                                    duration: 0.5,
                                                    ease: "easeOut"
                                                }}
                                                className="preloader-motif"
                                                style={{
                                                    gridColumn: colIndex + 1,
                                                    gridRow: rowIndex + 1
                                                }}
                                            />
                                        );
                                    })}

                                    {/* Fin du mode Puzzle */}

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence
                        onExitComplete={() => {
                            setRemovePreloader(true);
                            initialLoadDone = true;
                        }}
                    >
                        {showWhiteTransition && (
                            <motion.div
                                key="white-screen"
                                variants={whiteScreenVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: whiteTransitionDuration, ease: "linear" }}
                                onAnimationComplete={() => {
                                    setShowPreloader(false);
                                    setTimeout(() => {
                                        setShowWhiteTransition(false);
                                    }, 100);
                                }}
                                style={{
                                    position: "fixed",
                                    top: "-50%",
                                    left: "-150vw",
                                    right: "-150vw",
                                    height: "400vw",
                                    width: "400vw",
                                    backgroundColor: "white",
                                    borderRadius: "50% / 50%",
                                    zIndex: 999999,

                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "flex-end"
                                }}
                            >

                                <img src="/images/logo.svg" alt="Logo de Maëlle Camissogo" style={{filter: "invert(0)", width: '10%', height: '10%', marginBottom: '10vh'}}/>

                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}
        </>
    );
};

// Fonction utilitaire de debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export default AppLoader;
