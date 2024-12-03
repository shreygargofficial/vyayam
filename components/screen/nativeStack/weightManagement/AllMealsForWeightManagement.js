import { useRoute } from "@react-navigation/native";
import { useEffect, useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { allRecipesFetchActionCreator } from "../../../../redux/ActionCreators/recipeActionsCreator";
import { FlatList } from "react-native";
import MealCard from "../../../weightGainLoss/MealCard";

function AllMealsForWeightManagement() {
    const { params: { type, tdee } } = useRoute();
    const dispatch = useDispatch()
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    const resultCalories = type === "loss" ? tdee - 500 : tdee + 500;
    const recipes = useSelector(state => state.recipes.allRecipes);

    const filteredRecipes = useMemo(() => {
        if (recipes?.length) {
            return recipes.filter(recipe => {
                if (recipe?.nutritionContent?.totalCalories + totalCalories < resultCalories) {
                    totalCalories = recipe?.nutritionContent?.totalCalories + totalCalories;
                    totalProtein = recipe?.nutritionContent?.protein + totalProtein;
                    totalCarbs = recipe?.nutritionContent?.carbs + totalCarbs;
                    totalFats = recipe?.nutritionContent?.fats + totalFats;
                    return recipe;
                }
            })
        }
    }, [recipes])



    useEffect(() => {
        if (!recipes || recipes?.length == 0)
            dispatch(allRecipesFetchActionCreator())
    }, [recipes])

    return (
        <View>
            <ScrollView
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View style={styles.mainWrapper}>
                    <Text style={styles.description}>
                        You need to eat around {totalCalories} kcal for weight {type}. Below meals totals upto your desired daily calories intake.
                    </Text>
                    <View style={styles.nutritionContent}>
                        <Text style={styles.nutrientValue}>
                            Total nutrient breakdown for all the meal!
                        </Text>
                        <Text style={styles.nutrientValue}>
                            Protein: {totalProtein} g
                        </Text>
                        <Text style={styles.nutrientValue}>
                            Carbs: {totalCarbs} g
                        </Text>
                        <Text style={styles.nutrientValue}>
                            Fats: {totalFats} g
                        </Text>
                    </View>

                </View>
                {filteredRecipes && filteredRecipes.length &&
                    filteredRecipes.map((ele, index) => {
                        return (
                            <MealCard key={ele._id} item={ele} index={index + 1} />
                        )
                    })
                }

            </ScrollView>
        </View>
    );
}

export default AllMealsForWeightManagement;

const styles = StyleSheet.create({
    mainWrapper: {
        paddingHorizontal: 30,
        marginVertical: 30
    },
    nutritionContent: {
        marginVertical: 10,

    },
    nutrientValue: {
        marginTop: 5,
    },
    description: {
        letterSpacing: 1,
        fontSize: 18,
    },
})