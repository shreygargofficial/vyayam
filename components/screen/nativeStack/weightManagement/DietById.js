import { useRoute } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../constants/Colors";
import { useSelector } from "react-redux";
import { useMemo } from "react";

function DietById() {
    const { params: { _id } } = useRoute();
    const dietData = useSelector(state => state.diet.dietData);

    const { mealTotal, meals, veg, nutrient } = useMemo(() => {
        return dietData?.find(ele => ele._id === _id)
    }, [])

    return (
        <View style={styles.root}>
            <ScrollView
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20 }}
            >
                <Text style={styles.heading}> {mealTotal} kcal</Text>
                <View style={styles.mealType}>
                    <View style={veg ? styles.veg : styles.nonVeg}>
                    </View>
                </View>
                <View style={styles.nutrientLabel}>
                    <Text style={styles.bold}>Protein: {nutrient.protein}g</Text>
                    <Text style={[styles.bold, styles.ml]}>Fats: {nutrient.fats}g</Text>
                    <Text style={[styles.bold, styles.ml]}>Carbs: {nutrient.carbs}g</Text>
                </View>

                <View style={styles.mealCategory}>
                    {meals?.map((mealCategory, key) => {
                        return (
                            <View key={key} style={styles.mealCategoryCard}>
                                <Text style={styles.mealCategoryHeading}>
                                    {mealCategory.name}
                                </Text>
                                <View style={styles.mealPartContainer}>
                                    {mealCategory.meal.map((mealPart, index) => {
                                        return (
                                            <View key={index} style={[styles.flex, styles.mealPart]}>
                                                <Text style={styles.bold}>{mealPart.ingredient} </Text>
                                                <Text>{mealPart.quantity}</Text>
                                            </View>
                                        )
                                    })}
                                </View>
                                <View style={styles.flex}>
                                    <Text style={styles.nutrientContent}>
                                        <Text style={styles.bold}>Cal: </Text>{mealCategory.nutrient.calories}kcal
                                    </Text>
                                    <Text style={styles.nutrientContent}>
                                        <Text style={styles.bold}> P: </Text>{mealCategory.nutrient.protein}g
                                    </Text>
                                    <Text style={styles.nutrientContent}>
                                        <Text style={styles.bold}> C: </Text>{mealCategory.nutrient.carbs}g
                                    </Text>
                                    <Text style={styles.nutrientContent}>
                                        <Text style={styles.bold}> F: </Text>{mealCategory.nutrient.fats}g
                                    </Text>
                                </View>

                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    );
}

export default DietById;

const styles = StyleSheet.create({
    root: {
        backgroundColor: colors.white,
        flex: 1
    },
    flex: {
        flexDirection: 'row'
    },
    bold: {
        fontWeight: '500',
        textTransform: 'capitalize'
    },
    ml: {
        marginLeft: 10
    },
    heading: {
        letterSpacing: 1,
        marginTop: 30,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
        textTransform: 'capitalize',
    },

    mealType: {
        width: 20,
        position: 'absolute',
        top: 10,
        right: 10,
        height: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        borderColor: colors.grey,
    },
    veg: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.green
    },
    nonVeg: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.red200
    },
    nutrientLabel: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    mealCategory: {
        marginTop: 60
    },
    mealCategoryCard: {
        backgroundColor: colors.white,
        borderWidth: 0.8,
        borderColor: colors.grey,
        borderRadius: 10,
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,

    },
    mealCategoryHeading: {
        fontSize: 20,
        fontWeight: '300',
        textTransform: 'capitalize',
        letterSpacing: 1,
    },
    mealPartContainer: {
        marginVertical: 10
    },
    mealPart: {
        marginVertical: 3,
    },
    nutrientContent: {
        fontSize: 11,
        marginTop: 10
    },
})