import {motion} from 'framer-motion';

const KineticText = ({ text }) => {
    const letterVariants = {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 }
    };

    return (
        <motion.h1 className="preloader-text">
            {text.split('').map((char, index) => (
                <motion.span
                    key={index}
                    variants={letterVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    style={{color: '#FFFFFF'}}
                >
                    {char}
                </motion.span>
            ))}
        </motion.h1>
    );
};

export default KineticText;