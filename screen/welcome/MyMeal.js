import { useEffect, useLayoutEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { singleMealFetchActionCreator } from "../../ActionCreators/mealActionsCreator";
import { SERVERURL } from "../../constants/Environment";
import { colors } from "../../constants/Colors";

function MyMeal({ route }) {
    const dispatch = useDispatch();
    const meals = useSelector(state => state.meals)

    useEffect(() => {
        dispatch(singleMealFetchActionCreator(route.params.id))
    }, [route.params.id])

    if (meals.myMeal)
        return (
            <ScrollView
                style={styles}
                alwaysBounceVertical={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View style={styles.photoContainer}>
                    {meals.myMeal?.photoURL ? <Image source={{ uri: `${SERVERURL}/${meals.myMeal?.photoURL}` }} style={styles.photo} /> : <Image source={require('../../assets/images/meals/mealDefault.jpg')} style={styles.photo} />}
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}> {meals.myMeal?.dishName} </Text>
                    <Text style={styles.description}>{meals.myMeal?.description}</Text>
                    <Text style={[styles.marginTop]}> <Text style={styles.bold}>Total Calories: </Text>{meals.myMeal?.nutritionContent?.totalCalories}Kcal</Text>
                    <Text style={[styles.marginTop]}> <Text style={styles.bold}> Protein: </Text> {meals.myMeal?.nutritionContent?.protein}g</Text>
                    <Text style={[styles.marginTop]}> <Text style={styles.bold}> Fats: </Text> {meals.myMeal?.nutritionContent?.fats}g</Text>
                    <Text style={[styles.marginTop]}> <Text style={styles.bold}> Carbs: </Text>{meals.myMeal?.nutritionContent?.carbs}g</Text>
                    <Text style={[styles.marginTop]}> <Text style={styles.bold}>Fiber: </Text> {meals.myMeal?.nutritionContent?.fiber}g</Text>
                    <Text style={styles.ingredientsTitle}>Ingredients: </Text>
                    {meals.myMeal?.ingredients.map(ele => {
                        return (
                            <View key={ele._id} style={[styles.ingredients]}>
                                <Text>{ele.name}</Text>
                                <Text>{ele.quantity}</Text>

                            </View>
                        )
                    })}
                </View>

            </ScrollView>
        );
    else
        return (
            <View style={styles.root}>
                <Text>{meals.mealFetchError}</Text>
            </View>
        )
}

export default MyMeal;


let styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoContainer: {
        padding: 10,
        marginTop: 30,
    },
    photoContainer: {
        height: 200
    },
    photo: {
        width: '100%',
        flex: 1
    },
    title: {
        fontSize: 25,
        fontWeight: '300',
        textAlign: 'center',
        lineHeight: 40

    },
    description: {
        marginTop: 30,
        fontSize: 20,
        fontWeight: '200',
        color: colors.black
    },
    marginTop: {
        marginTop: 10
    },
    bold: {
        fontWeight: '700'
    },
    ingredientsTitle: {
        fontSize: 22,
        marginTop: 30,
        marginBottom: 10
    },
    ingredients: {
        padding: 8
    }

})