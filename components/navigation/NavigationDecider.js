import { useContext } from "react";
import { authContext } from "../context/ContextProvider";
import WelcomeNavigation from "./WelcomeNavigation";
import AuthNavigation from "./AuthNavigation";

function NavigationDecider() {
    let authCTX = useContext(authContext);
    let navigationToRender = authCTX.isLoggedIn ? <WelcomeNavigation /> : <AuthNavigation />
    return (navigationToRender);
}

export default NavigationDecider;