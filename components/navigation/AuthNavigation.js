import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screen/auth/Login";
import SignUp from "../screen/auth/signup/SignUp";
import { colors } from "../../constants/Colors";
import Name from "../screen/auth/signup/Name";
import BasicInfo from "../screen/auth/signup/BasicInfo";
import Email from "../screen/auth/signup/Email";
import Contact from "../screen/auth/signup/Contact";
import Password from "../screen/auth/signup/Password";
function AuthNavigation() {
    let nativeStack = createNativeStackNavigator()
    return (
        <NavigationContainer>
            <nativeStack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.primaryDark }, headerTintColor: colors.white }}>
                <nativeStack.Screen name="login" component={Login} options={{ headerShown: false }} />
                <nativeStack.Screen name="signup" component={SignUp} options={{ title: 'Sign Up' }} />
                <nativeStack.Screen name="name" component={Name} options={{ title: 'Your Name', headerBackTitle: "User" }} />
                <nativeStack.Screen name="email" component={Email} options={{ title: 'Your Email', headerBackTitle: "Name" }} />
                <nativeStack.Screen name="contact" component={Contact} options={{ title: 'Your Phone', headerBackTitle: "Email" }} />
                <nativeStack.Screen name="metric" component={BasicInfo} options={{ title: 'Your Metrics', headerBackTitle: "contact" }} />
                <nativeStack.Screen name="password" component={Password} options={{ title: 'Set Password', headerBackTitle: "metric" }} />


            </nativeStack.Navigator>
        </NavigationContainer>);
}

export default AuthNavigation;