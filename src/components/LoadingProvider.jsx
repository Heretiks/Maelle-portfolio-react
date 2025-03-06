import { createContext, useState, useContext } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [imagesLoaded, setImagesLoaded] = useState(false);

    return (
        <LoadingContext.Provider value={{ imagesLoaded, setImagesLoaded }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);
