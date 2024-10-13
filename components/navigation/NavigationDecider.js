import WelcomeNavigation from "./WelcomeNavigation";
import AuthNavigation from "./AuthNavigation";
import { useSelector } from "react-redux";
import CustomLoader from "../ui/CustomLoader";

function NavigationDecider() {

    const userState = useSelector(state => state.user);
    const loader = useSelector(state => state.loader)
    let navigationToRender = userState.userData ? <WelcomeNavigation /> : <AuthNavigation />
    return <>
        {loader && <CustomLoader />}
        {navigationToRender}
    </>
}

export default NavigationDecider;