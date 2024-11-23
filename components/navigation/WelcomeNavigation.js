import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "../screen/nativeStack/Landing";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Octicons, MaterialIcons, Entypo } from '@expo/vector-icons'
import Logout from "../screen/Drawer/Logout";
import { colors } from "../../constants/Colors";
import Supplements from "../screen/bottomTabs/Supplements";
import Meals from "../screen/bottomTabs/Meals";
import User from "../screen/bottomTabs/User";
import MyMeal from "../screen/nativeStack/MyMeal";
import { View } from "react-native";
import ExerciseById from "../screen/nativeStack/ExerciseById";
import AllExercise from "../screen/nativeStack/AllExercise";
import WeightLog from "../screen/nativeStack/WeightLog";
import BodyMeasurement from "../screen/nativeStack/BodyMeasurement";
import SplitExerciseOption from "../screen/nativeStack/SplitExerciseOption";
import SampleSplit from "../screen/nativeStack/SampleSplit";
import CustomSplit from "../screen/nativeStack/CustomSplit";
import PerDaySplitScreen from "../screen/nativeStack/PerDaySplitScreen";
import EditSplitPerDay from "../screen/nativeStack/EditSplitPerDay";
import About from "../screen/Drawer/About";
import Privacy from "../screen/Drawer/Privacy";
import Contact from "../screen/Drawer/Contact";
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
            drawerInactiveTintColor: colors.primary,
            headerTitleAlign: 'left',
            drawerContentStyle: {
                backgroundColor: colors.bottomNavigation
            }

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
            name="About"
            component={About}
            options={{ drawerIcon: ({ size, color }) => <Entypo name="users" size={size} color={color} /> }}
        />
        <drawer.Screen
            name="Privacy"
            component={Privacy}
            options={{ drawerIcon: ({ size, color }) => <Entypo name="text-document" size={size} color={color} /> }}
        />
        <drawer.Screen
            name="Contact"
            component={Contact}
            options={{ drawerIcon: ({ size, color }) => <Entypo name="chat" size={size} color={color} /> }}
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
        <tab.Navigator screenOptions={
            {
                headerShown: false,
                tabBarActiveTintColor: colors.grey,
                tabBarInactiveTintColor: colors.primary,
                tabBarStyle: {
                    backgroundColor: colors.bottomNavigation
                },

            }
        }>
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
                        tabBarIcon: ({ color, size }) => <MaterialIcons name="fastfood" color={color} size={size} />,
                        title: 'Recipes',

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
                    headerStyle: { backgroundColor: colors.primaryDark },
                    contentStyle: {
                        // backgroundColor: colors.darkBackground
                    }
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
                <nativeStack.Screen
                    options={{ title: 'Exercises', headerBackTitle: 'Home' }}
                    name="allExercise"
                    component={AllExercise}
                />
                <nativeStack.Screen
                    options={{ title: 'Exercise', headerBackTitle: 'All Exercise' }}
                    name="myExercise"
                    component={ExerciseById}
                />
                <nativeStack.Screen
                    options={{ title: 'Weight', headerBackTitle: 'Home' }}
                    name="weight"
                    component={WeightLog}
                />
                <nativeStack.Screen
                    options={{ title: 'Your Measurement', headerBackTitle: 'Home' }}
                    name="measurement"
                    component={BodyMeasurement}
                />
                <nativeStack.Screen
                    options={{ title: 'Workout Splits', headerBackTitle: 'Home' }}
                    name="splitChoice"
                    component={SplitExerciseOption}
                />
                <nativeStack.Screen
                    options={{ title: 'Sample Split', headerBackTitle: 'Split Type' }}
                    name="sampleSplit"
                    component={SampleSplit}
                />
                <nativeStack.Screen
                    options={{ title: 'Your Split', headerBackTitle: 'Split Type' }}
                    name="customSplit"
                    component={CustomSplit}
                />
                <nativeStack.Screen
                    options={{ title: 'Day Wise Split', headerBackTitle: 'Back' }}
                    name="perDaySplitScreen"
                    component={PerDaySplitScreen}
                />
                <nativeStack.Screen
                    options={{ title: 'Edit Day Split', headerBackTitle: 'Back' }}
                    name="EditSplit"
                    component={EditSplitPerDay}
                />
            </nativeStack.Navigator>
        </NavigationContainer>);
}

export default WelcomeNavigation;