import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "../../screen/welcome/Landing";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Octicons, MaterialIcons, Entypo } from '@expo/vector-icons'
import Logout from "../../screen/Drawer/Logout";
import { colors } from "../../constants/Colors";
import Supplements from "../../screen/bottomTabs/Supplements";
import Meals from "../../screen/bottomTabs/Meals";
import User from "../../screen/bottomTabs/User";
const drawer = createDrawerNavigator();
const tab = createBottomTabNavigator();

function DrawerNavigator() {
    return <drawer.Navigator screenOptions={
        {
            headerTransparent: false,
            headerTintColor: colors.white,
            headerStyle: { backgroundColor: colors.primaryDark },
            drawerActiveBackgroundColor: colors.primaryDark,
            drawerActiveTintColor: colors.white,
            headerTitleAlign: 'left'

        }
    }>
        <drawer.Screen
            name="Vyayam"
            component={BottomTabNavigator}
            options={{ drawerIcon: ({ size, color }) => <Entypo name="home" size={size} color={color} /> }}
        />
        <drawer.Screen
            name="Logout"
            component={Logout}
            options={{ drawerIcon: ({ size, color }) => <Entypo name="log-out" size={size} color={color} /> }}
        />
    </drawer.Navigator>
}

function BottomTabNavigator() {
    return <tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.primaryDark, }}>
        <tab.Screen
            name="landing"
            component={Landing}
            options={
                {
                    tabBarIcon: ({ color, size }) => <Entypo name="home" color={color} size={size} />,

                }
            }
        />

        <tab.Screen
            name="Meals"
            component={Meals}
            options={
                {
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="fastfood" color={color} size={size} />
                }
            }
        />
        <tab.Screen
            name="Supplements"
            component={Supplements}
            options={
                {
                    tabBarIcon: ({ color, size }) => <Octicons name="archive" color={color} size={size} />
                }
            }
        />
        <tab.Screen
            name="User"
            component={User}
            options={
                {
                    tabBarIcon: ({ color, size }) => <Entypo name="user" color={color} size={size} />
                }
            }
        />
    </tab.Navigator>
}
function WelcomeNavigation() {
    let nativeStack = createNativeStackNavigator()
    return (
        <NavigationContainer>
            <nativeStack.Navigator screenOptions={{ headerTintColor: colors.primaryDark }}>
                <nativeStack.Screen
                    name="home"
                    component={DrawerNavigator}
                    options={{ headerShown: false }} />
            </nativeStack.Navigator>
        </NavigationContainer>);
}

export default WelcomeNavigation;