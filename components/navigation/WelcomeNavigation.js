import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "../../screen/welcome/Landing";
function WelcomeNavigation() {
    let nativeStack = createNativeStackNavigator()
    return (
        <NavigationContainer>
            <nativeStack.Navigator>
                <nativeStack.Screen name="welcome" component={Landing} />
            </nativeStack.Navigator>
        </NavigationContainer>);
}

export default WelcomeNavigation;