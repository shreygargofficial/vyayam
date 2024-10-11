import { createContext, useState } from "react";

export const authContext = createContext({
    isLoggedIn: false
})
function LoaderContextProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false)
    let loadingHandler = (value) => {
        setIsLoading(value)
    }

    const value = {
        isLoading,
        loadingHandler,
    }
    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    );
}

export default LoaderContextProvider;