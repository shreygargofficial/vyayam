import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
import { SERVERURL } from "../../../constants/Environment";
import { colors } from "../../../constants/Colors";
import HTMLView from 'react-native-htmlview';
import NutritionList from "../../meals/NutritionList";
import ImageLoader from "../../ui/ImageLoader";
import CustomLoader from "../../ui/CustomLoader";

const TEXT_COLOR = colors.white

function MyMeal({ route }) {
    const meals = useSelector(state => state.meals.allMeals)
    const [myMeal, setMyMeal] = useState(null)
    const [imageLoading, setImageLoading] = useState(true);
    useEffect(() => {
        let meal = meals.find(ele => ele._id == route.params.id)
        setMyMeal(meal);
    }, [route.params.id])

    if (meals)
        return (
            <>
                {imageLoading && <CustomLoader />}
                <View style={styles.root}>
                    <ScrollView
                        style={styles}
                        alwaysBounceVertical={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 100 }}
                    >
                        <View style={styles.photoContainer}>
                            {myMeal?.photoURL ? <Image onLoadEnd={() => setImageLoading(false)} source={{ uri: `${SERVERURL}/${myMeal.photoURL}` }} style={styles.photo} /> : <Image source={require('../../../assets/images/meals/mealDefault.jpg')} style={styles.photo} />}
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.title}> {myMeal?.dishName} </Text>
                            <View style={styles.description}>
                                <HTMLView
                                    stylesheet={{
                                        p: {
                                            color: TEXT_COLOR,
                                            lineHeight: 23,
                                            letterSpacing: 1,
                                        },
                                        span: {
                                            color: TEXT_COLOR
                                        },
                                        h1: {
                                            color: TEXT_COLOR
                                        },
                                        h2: {
                                            color: TEXT_COLOR
                                        },
                                        h3: {
                                            color: TEXT_COLOR
                                        },
                                        h4: {
                                            color: TEXT_COLOR
                                        },
                                        strong: {
                                            color: TEXT_COLOR
                                        },
                                        ul: {
                                            color: TEXT_COLOR
                                        },
                                        b: {
                                            color: TEXT_COLOR
                                        },
                                        li: {
                                            color: TEXT_COLOR
                                        },

                                    }}
                                    value={myMeal?.description || ''}
                                />
                            </View>
                            <NutritionList nutritionContent={myMeal?.nutritionContent} />
                            <Text style={styles.ingredientsTitle}>Ingredients: </Text>
                            {myMeal?.ingredients.map(ele => {
                                return (
                                    <View key={ele._id} style={[styles.ingredients]}>
                                        <Text style={styles.name}><Text style={styles.bold}>{ele.name} </Text>: {ele.quantity}</Text>
                                    </View>
                                )
                            })}
                        </View>

                    </ScrollView>
                </View>
            </>
        );
    else
        return (
            <View style={styles.root}>
                <Text>Something went Wrong!</Text>
            </View>
        )
}

export default MyMeal;


let styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    title: {
        fontSize: 35,
        color: TEXT_COLOR,
        textTransform: 'capitalize',
        fontFamily: 'king',
        fontWeight: '100',
        textAlign: 'center',
        lineHeight: 50,
    },

    marginTop: {
        marginTop: 20
    },
    bold: {
        fontWeight: '700',

    },
    description: {
        marginTop: 30,
    },

    ingredientsTitle: {
        fontSize: 22,
        marginVertical: 30,
        marginBottom: 30,
        color: TEXT_COLOR
    },
    ingredients: {
        padding: 8,
        color: TEXT_COLOR
    },
    name: {
        color: TEXT_COLOR,
        textTransform: 'capitalize'
    },
    quantity: {
        color: TEXT_COLOR
    }

})