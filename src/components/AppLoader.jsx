import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import KineticText from './KineticText.jsx';
import AnimatedLogo from './AnimatedLogo.jsx';

const AppLoader = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [showTransition, setShowTransition] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowTransition(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        }, 3000);
    }, []);

    const blackScreenVariants = {
        hidden: { y: "100%" },
        visible: { y: 0 },
        exit: { y: "-100%" },
    };

    return (
        <>
            <motion.div
                initial={{ visibility: "visible", opacity: 1 }}
                animate={{ visibility: isLoading ? "visible" : "hidden", opacity: isLoading ? 1 : 0  }}
                transition={{ duration: 0.5 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'black',
                    zIndex: 99998,
                }}
            >
                {/* Contenu du preloader */}
                <div className="preloader-content">
                    <AnimatedLogo />
                    <KineticText text="Création des designs ..." />
                </div>
            </motion.div>

            <motion.div
                variants={blackScreenVariants}
                initial="hidden"
                animate={showTransition ? (isLoading ? "visible" : "exit") : "hidden"}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{
                    position: 'fixed',
                    top: '-28%',
                    left: '-25%',
                    right: '-25%',
                    height: '200%',
                    backgroundColor: 'white',
                    borderRadius: '50% / 50%',
                    zIndex: 99998,
                }}
            />

            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: 0.2, delay: 0 }}
            >
                {children}
            </motion.div>
        </>
    );
};

export default AppLoader;
