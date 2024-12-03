import { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { allRecipesFetchActionCreator } from "../../../redux/ActionCreators/recipeActionsCreator";
import RecipesCard from "../../recipes/RecipesCard";
import { colors } from "../../../constants/Colors";
import { StatusBar } from "expo-status-bar";
import { useIsFocused } from "@react-navigation/native";

function Recipes({ navigation }) {
    const recipes = useSelector(state => state.recipes)
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    useEffect(() => {
        if (!recipes.allRecipes || recipes.allRecipes?.length == 0)
            dispatch(allRecipesFetchActionCreator())
    }, [recipes])

    const navigateMyRecipe = (_id) => {
        navigation.navigate("myRecipe", {
            id: _id
        })
    }
    if (recipes.allRecipes)
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
                        data={recipes?.allRecipes}
                        numColumns={2}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item: { dishName, nutritionContent: { totalCalories }, photoURL, _id } }) => {
                            return (
                                <RecipesCard
                                    dishName={dishName}
                                    _id={_id}
                                    totalCalories={totalCalories}
                                    photoURL={photoURL}
                                    onPress={navigateMyRecipe}
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
                    <Text>{recipes.recipeFetchError}</Text>
                </View>
            </>
        )
}

export default Recipes;

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