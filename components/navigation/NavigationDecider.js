import WelcomeNavigation from "./WelcomeNavigation";
import AuthNavigation from "./AuthNavigation";
import { useSelector } from "react-redux";

function NavigationDecider() {

    const userState = useSelector(state => state.user);
    let navigationToRender = userState.userData ? <WelcomeNavigation /> : <AuthNavigation />
    return (navigationToRender);
}

export default NavigationDecider;