import { createContext, useState } from "react";

export const authContext = createContext({
    isLoggedIn: false
})
function ContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    let loginHandler = () => {
        setIsLoggedIn(true)
    }
    let logoutHandler = () => {
        setIsLoggedIn(false)
    }
    const value = {
        isLoggedIn,
        loginHandler,
        logoutHandler
    }
    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    );
}

export default ContextProvider;