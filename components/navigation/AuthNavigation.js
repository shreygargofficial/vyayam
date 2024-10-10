import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screen/auth/Login";
import SignUp from "../../screen/auth/SignUp";
function AuthNavigation() {
    let nativeStack = createNativeStackNavigator()
    return (
        <NavigationContainer>
            <nativeStack.Navigator screenOptions={{ headerShown: false }}>
                <nativeStack.Screen name="login" component={Login} />
                <nativeStack.Screen name="signup" component={SignUp} />
            </nativeStack.Navigator>
        </NavigationContainer>);
}

export default AuthNavigation;