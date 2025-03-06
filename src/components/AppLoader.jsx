import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import KineticText from "./KineticText";
import AnimatedLogo from "./AnimatedLogo";
import { useLoading } from "./LoadingProvider";

// Variable globale pour suivre si le chargement initial a eu lieu
let initialLoadDone = false;

const AppLoader = ({ children }) => {
    const { isLoading, percentageLoaded } = useLoading();
    const [showPreloader, setShowPreloader] = useState(!initialLoadDone);
    const [showWhiteTransition, setShowWhiteTransition] = useState(false);
    const [removePreloader, setRemovePreloader] = useState(false);

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
                style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0}}
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
                                <div className="preloader-content">
                                    <AnimatedLogo />
                                    <div className="preloader-texts">
                                        <KineticText text="Création" />
                                        <KineticText text="&nbsp; ..." />

                                        {/*<p style={{ fontSize: "5em", color: "white" }}>{Math.round(loadingProgress)} </p>*/}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence
                        onExitComplete={() => {
                            setRemovePreloader(true);
                            initialLoadDone = true; // Marquer le chargement initial comme terminé
                        }}
                    >
                        {showWhiteTransition && (
                            <motion.div
                                key="white-screen"
                                variants={whiteScreenVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                onAnimationComplete={() => {
                                    setShowPreloader(false);
                                    setTimeout(() => {
                                        setShowWhiteTransition(false);
                                    }, 100);
                                }}
                                style={{
                                    position: "fixed",
                                    top: "-25%",
                                    left: "-25%",
                                    right: "-25%",
                                    height: "200%",
                                    backgroundColor: "white",
                                    borderRadius: "50% / 50%",
                                    zIndex: 999999,
                                }}
                            />
                        )}
                    </AnimatePresence>
                </>
            )}
        </>
    );
};

export default AppLoader;
