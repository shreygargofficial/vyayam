import { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { allMealsFetchActionCreator } from "../../../redux/ActionCreators/mealActionsCreator";
import MealsList from "../../meals/MealsList";

function Meals({ navigation }) {
    const meals = useSelector(state => state.meals)
    const dispatch = useDispatch();
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
                <FlatList
                    style={{ marginTop: 60 }}
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={false}
                    data={meals?.allMeals}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item: { dishName, nutritionContent: { totalCalories }, photoURL, _id } }) => {
                        return (
                            <MealsList
                                dishName={dishName}
                                _id={_id}
                                totalCalories={totalCalories}
                                photoURL={photoURL}
                                onPress={navigateMyMeal}
                            />

                        )
                    }}
                />
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
        justifyContent: 'center',
        alignItems: 'center'
    }
})