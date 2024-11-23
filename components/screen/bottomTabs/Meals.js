import { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { allMealsFetchActionCreator } from "../../../redux/ActionCreators/mealActionsCreator";
import MealCard from "../../meals/MealsCard";
import { colors } from "../../../constants/Colors";
import { StatusBar } from "expo-status-bar";
import { useIsFocused } from "@react-navigation/native";

function Meals({ navigation }) {
    const meals = useSelector(state => state.meals)
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    useEffect(() => {
        if (!meals.allMeals || meals.allMeals?.length == 0)
            dispatch(allMealsFetchActionCreator())
    }, [meals])

    const navigateMyMeal = (_id) => {
        navigation.navigate("myMeal", {
            id: _id
        })
    }
    if (meals.allMeals)
        return (
            <>
                {isFocused && <StatusBar style="light" />}
                <View style={styles.root}>
                    <View>
                        <Text style={styles.title}>
                            Healthy Recipes
                        </Text>
                    </View>
                    <FlatList
                        style={{ marginTop: 60 }}
                        showsVerticalScrollIndicator={false}
                        alwaysBounceVertical={false}
                        data={meals?.allMeals}
                        numColumns={2}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item: { dishName, nutritionContent: { totalCalories }, photoURL, _id } }) => {
                            return (
                                <MealCard
                                    dishName={dishName}
                                    _id={_id}
                                    totalCalories={totalCalories}
                                    photoURL={photoURL}
                                    onPress={navigateMyMeal}
                                />

                            )
                        }}
                    />
                </View>
            </>


        )
    else
        return (
            <>
                <View style={styles.root}>
                    <Text>{meals.mealFetchError}</Text>
                </View>
            </>
        )
}

export default Meals;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.darkBackground,
        justifyContent: 'center',
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        color: colors.white,
        marginTop: 60,
        fontFamily: 'king',
        fontSize: 40,
        fontWeight: '100'
    }
})