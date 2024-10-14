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
import MyMeal from "../../screen/welcome/MyMeal";
import { View } from "react-native";
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
            component={Landing}
            options={{
                headerTintColor: colors.primary,
                headerTransparent: true,
                drawerIcon: ({ size, color }) => <Entypo name="home" size={size} color={color} />,
                headerBackground: () => (
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: '100%', }}>

                    </View>
                )
            }}
        />
        <drawer.Screen
            name="Logout"
            component={Logout}
            options={{ drawerIcon: ({ size, color }) => <Entypo name="log-out" size={size} color={color} /> }}
        />
    </drawer.Navigator>
}

function BottomTabNavigator() {
    return (
        <tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.grey, tabBarInactiveTintColor: colors.primary }}>
            <tab.Screen
                name="landing"
                component={DrawerNavigator}
                options={
                    {
                        tabBarIcon: ({ color, size }) => <Entypo name="home" color={color} size={size} />,
                        tabBarStyle: {
                            position: 'absolute',               // Makes the tab bar overlay content
                            backgroundColor: 'rgba(0, 0, 0, 0.5)', // White with 50% opacity
                            borderTopWidth: 0,                  // Optional: Remove top border
                            elevation: 0,                       // Optional: Remove shadow on Android
                        },

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
        </tab.Navigator>)
}
function WelcomeNavigation() {
    let nativeStack = createNativeStackNavigator()
    return (
        <NavigationContainer>
            <nativeStack.Navigator screenOptions={
                {
                    headerTintColor: colors.white,
                    headerStyle: { backgroundColor: colors.primaryDark }
                }
            }>
                <nativeStack.Screen
                    name="home"
                    component={BottomTabNavigator}
                    options={{ headerShown: false }} />
                <nativeStack.Screen
                    options={{ title: 'Meal', headerBackTitle: 'All Meals' }}
                    name="myMeal"
                    component={MyMeal}
                />
            </nativeStack.Navigator>
        </NavigationContainer>);
}

export default WelcomeNavigation;