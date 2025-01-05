import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
import { SERVERURL } from "../../../constants/Environment";
import { colors } from "../../../constants/Colors";
import HTMLView from 'react-native-htmlview';
import NutritionList from "../../recipes/NutritionList";
import CustomLoader from "../../ui/CustomLoader";

const TEXT_COLOR = colors.white

function RecipeById({ route }) {
    const recipes = useSelector(state => state.recipes.allRecipes)
    const [myRecipe, setMyRecipe] = useState(null)
    const [imageLoading, setImageLoading] = useState(true);
    useEffect(() => {
        let recipe = recipes.find(ele => ele._id == route.params.id)
        setMyRecipe(recipe);
    }, [route.params.id])

    if (recipes) {
        return (
            <View style={styles.root}>
                {imageLoading && <CustomLoader />}
                <ScrollView
                    alwaysBounceVertical={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    <View style={styles.photoContainer}>
                        {myRecipe?.photoURL ? <Image onLoadEnd={() => setImageLoading(false)} source={{ uri: `${SERVERURL}/${myRecipe.photoURL}` }} style={styles.photo} /> : <Image onLoadEnd={() => setImageLoading(false)} source={require('../../../assets/images/recipes/recipeDefault.jpg')} style={styles.photo} />}
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.title}> {myRecipe?.dishName} </Text>
                        <View style={styles.description}>
                            <HTMLView
                                stylesheet={{
                                    p: {
                                        color: TEXT_COLOR,
                                        lineHeight: 23,
                                        letterSpacing: 1,
                                        fontFamily: 'caviar'
                                    },
                                    span: {
                                        color: TEXT_COLOR,
                                        fontFamily: 'caviar'
                                    },
                                    h1: {
                                        color: TEXT_COLOR,
                                        fontFamily: 'caviar'
                                    },
                                    h2: {
                                        color: TEXT_COLOR,
                                        fontFamily: 'caviar'
                                    },
                                    h3: {
                                        color: TEXT_COLOR,
                                        fontFamily: 'caviar'
                                    },
                                    h4: {
                                        color: TEXT_COLOR,
                                        fontFamily: 'caviar'
                                    },
                                    strong: {
                                        color: TEXT_COLOR,
                                        fontFamily: 'caviar'
                                    },
                                    ul: {
                                        color: TEXT_COLOR,
                                        fontFamily: 'caviar'
                                    },
                                    b: {
                                        color: TEXT_COLOR,
                                        fontFamily: 'caviar'
                                    },
                                    li: {
                                        color: TEXT_COLOR,
                                        fontFamily: 'caviar'
                                    },

                                }}
                                value={myRecipe?.description || ''}
                            />
                        </View>
                        <NutritionList nutritionContent={myRecipe?.nutritionContent} />
                        <Text style={styles.ingredientsTitle}>Ingredients: </Text>
                        {myRecipe?.ingredients.map(ele => {
                            return (
                                <View key={ele._id} style={[styles.ingredients]}>
                                    <Text style={styles.name}><Text style={styles.bold}>{ele.name} </Text>: {ele.quantity}</Text>
                                </View>
                            )
                        })}
                    </View>

                </ScrollView>
            </View>
        );
    }
    else
        return (
            <View style={styles.root}>
                <Text>Something went Wrong!</Text>
            </View>
        )
}

export default RecipeById;


let styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.darkBackground
    },
    photoContainer: {
        height: 200,
        width: '100%',
        alignSelf: 'center',
        marginBottom: 10,
    },
    photo: {
        width: '100%',
        height: 200,
        flex: 1
    },
    infoContainer: {
        padding: 10,
        paddingHorizontal: 14,
        marginTop: 30,
        fontFamily: 'caviar'
    },
    title: {
        fontSize: 35,
        color: TEXT_COLOR,
        textTransform: 'capitalize',
        fontFamily: 'king',
        fontWeight: '100',
        textAlign: 'center',
        lineHeight: 50,
        fontFamily: 'caviar'
    },

    marginTop: {
        marginTop: 20
    },
    bold: {
        fontWeight: '200',
        fontFamily: 'caviarb'
    },
    description: {
        marginTop: 30,
        fontFamily: 'caviar'
    },

    ingredientsTitle: {
        fontSize: 22,
        marginVertical: 30,
        marginBottom: 30,
        color: TEXT_COLOR,
        fontFamily: 'caviar'
    },
    ingredients: {
        padding: 8,
        color: TEXT_COLOR,
    },
    name: {
        color: TEXT_COLOR,
        textTransform: 'capitalize',
        fontFamily: 'caviar'
    },
    quantity: {
        color: TEXT_COLOR,
        fontFamily: 'caviar'
    }

})