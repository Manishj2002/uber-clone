import { createContext, useState, useContext } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const UpdateCaptain = (captainData) => {
        setCaptain(captainData);
        setError(null);
    };


    const value = {
        captain,
        setCaptain,
        UpdateCaptain,
        setIsLoading,
        setError,
        isLoading,
        error,
        
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext