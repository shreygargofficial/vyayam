import WelcomeNavigation from "./WelcomeNavigation";
import AuthNavigation from "./AuthNavigation";
import { useSelector } from "react-redux";
import CustomLoader from "../ui/CustomLoader";
import Snackbar from "../ui/Snackbar";

function NavigationDecider() {

    const userState = useSelector(state => state.user);
    const loader = useSelector(state => state.loader)
    const snackbar = useSelector(state => state.snackbar)
    let navigationToRender = userState.userData ? <WelcomeNavigation /> : <AuthNavigation />

    return <>
        {snackbar?.show && <Snackbar />}
        {loader && <CustomLoader />}
        {navigationToRender}
    </>
}

export default NavigationDecider;