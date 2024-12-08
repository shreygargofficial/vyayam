import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "../screen/nativeStack/Landing";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Octicons, MaterialIcons, Entypo } from '@expo/vector-icons'
import Logout from "../screen/Drawer/Logout";
import { colors } from "../../constants/Colors";
import Supplements from "../screen/bottomTabs/Supplements";
import Recipes from "../screen/bottomTabs/Recipes";
import User from "../screen/bottomTabs/User";
import RecipeById from "../screen/nativeStack/RecipeById";
import { View } from "react-native";
import ExerciseById from "../screen/nativeStack/ExerciseById";
import AllExercise from "../exercise/AllExercise"
import WeightLog from "../screen/nativeStack/WeightLog";
import BodyMeasurement from "../screen/nativeStack/BodyMeasurement";
import About from "../screen/Drawer/About";
import Privacy from "../screen/Drawer/Privacy";
import Contact from "../screen/Drawer/Contact";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ExerciseWrapper from "../screen/bottomTabs/ExerciseWrapper";
import TdeeAndChoice from "../screen/nativeStack/weightManagement/TdeeAndChoice";
import SplitExerciseOption from "../screen/nativeStack/exerciseSplit/SplitExerciseOption";
import CustomSplit from "../screen/nativeStack/exerciseSplit/CustomSplit";
import PerDaySplitScreen from "../screen/nativeStack/exerciseSplit/PerDaySplitScreen";
import EditSplitPerDay from "../screen/nativeStack/exerciseSplit/EditSplitPerDay";
import SampleSplit from "../screen/nativeStack/exerciseSplit/SampleSplit";
import AllMealsForWeightManagement from "../screen/nativeStack/weightManagement/AllMealsForWeightManagement";
import DietById from "../screen/nativeStack/weightManagement/DietById";

const drawer = createDrawerNavigator();
const tab = createBottomTabNavigator();

function DrawerNavigator() {
    return <drawer.Navigator screenOptions={
        {
            headerTransparent: false,
            headerTintColor: colors.primary,
            headerStyle: {
                backgroundColor: colors.black,
                shadowColor: 'transparent', // Remove shadow
                elevation: 0, // For Android
            },
            drawerActiveBackgroundColor: colors.primaryDark,
            drawerActiveTintColor: colors.white,
            drawerInactiveTintColor: colors.primary,
            headerTitleAlign: 'left',
            drawerContentStyle: {
                backgroundColor: colors.black
            }

        }
    }>
        <drawer.Screen
            name="Vyayam"
            component={Landing}
            options={{
                headerTintColor: colors.primary,

                drawerIcon: ({ size, color }) => <Entypo name="home" size={size} color={color}

                />,
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
                headerShown: true,
                tabBarActiveTintColor: colors.grey,
                tabBarInactiveTintColor: colors.primary,
                headerStyle: {
                    backgroundColor: colors.black,
                    borderBottomColor: 'transparent'
                },
                headerTintColor: colors.primary,
                tabBarStyle: {
                    backgroundColor: colors.black,
                    paddingTop: 10,
                    borderTopColor: 'transparent'
                },

            }
        }>
            <tab.Screen
                name="landing"
                component={DrawerNavigator}
                options={
                    {
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => <Entypo name="home" color={color} size={size} />,
                    }
                }
            />

            <tab.Screen
                name="exercise"
                component={ExerciseWrapper}
                options={
                    {
                        headerShown: true,
                        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="dumbbell" color={color} size={size} />,
                        title: 'Exercise',

                    }
                }
            />

            <tab.Screen
                name="diet"
                component={AllMealsForWeightManagement}
                options={
                    {
                        tabBarIcon: ({ color, size }) => <MaterialIcons name="fastfood" color={color} size={size} />,
                        title: 'Diet Plans',

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
                    headerTintColor: colors.primary,
                    headerStyle: {
                        backgroundColor: colors.black
                    },
                }
            }>
                <nativeStack.Screen
                    name="home"
                    component={BottomTabNavigator}
                    options={{ headerShown: false }} />

                <nativeStack.Screen
                    options={{ title: 'All Recipe', headerBackTitle: 'Home' }}
                    name="recipes"
                    component={Recipes}
                />
                <nativeStack.Screen
                    options={{ title: 'Recipe', headerBackTitle: 'All Recipe' }}
                    name="myRecipe"
                    component={RecipeById}
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
                    options={{ title: 'Weight Loss/Gain', headerBackTitle: 'Home' }}
                    name="TdeeAndChoice"
                    component={TdeeAndChoice}
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
                <nativeStack.Screen
                    options={{ title: 'Meals Designed for you', headerBackTitle: 'Back' }}
                    name="mealsForWeightManagement"
                    component={AllMealsForWeightManagement}
                />
                <nativeStack.Screen
                    options={{ title: 'Diet', headerBackTitle: 'All' }}
                    name="myDiet"
                    component={DietById}
                />

            </nativeStack.Navigator>
        </NavigationContainer>);
}

export default WelcomeNavigation;