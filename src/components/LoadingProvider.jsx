// LoadingProvider.jsx
import { createContext, useState, useContext } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    const setImagesLoaded = (loaded) => {
        setIsLoading(!loaded);
    };

    return (
        <LoadingContext.Provider value={{ isLoading, setImagesLoaded }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);
