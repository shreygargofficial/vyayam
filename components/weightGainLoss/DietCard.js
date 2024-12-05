import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { colors } from "../../constants/Colors";

function DietCard({ item: { _id, mealTotal, nutrient, veg }, index }) {
    const navigation = useNavigation();
    const clickHandlerCard = (_id) => {
        navigation.navigate('myDiet', {
            _id: _id
        })
    }
    return (
        <View style={styles.cardWrapper}>
            <Pressable
                style={styles.card}
                onPress={clickHandlerCard.bind(this, _id)}>
                <Text style={styles.heading}>
                    Diet-{index}
                </Text>
                <View style={styles.mealType}>
                    <View style={veg ? styles.veg : styles.nonVeg}>
                    </View>
                </View>

                <View style={styles.nutrient}>
                    <Text style={styles.nutritionContent}>
                        Total Calories: {mealTotal} kcal
                    </Text>
                    <Text style={styles.nutritionContent}>
                        Protein: {nutrient.protein}
                    </Text>
                    <Text style={styles.nutritionContent}>
                        Carbs: {nutrient.carbs}
                    </Text>
                    <Text style={styles.nutritionContent}>
                        Fats: {nutrient.fats}
                    </Text>
                </View>
            </Pressable>

        </View>
    );
}

export default DietCard;

const styles = StyleSheet.create({
    cardWrapper: {
        marginTop: 30,
        paddingHorizontal: 40,
    },

    heading: {
        letterSpacing: 1,
        fontSize: 14,
        fontWeight: '800',
        textTransform: 'capitalize',
    },
    card: {
        marginVertical: 0,
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: colors.white,
        shadowColor: colors.grey,
        elevation: 5,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 9,
        borderRadius: 10,
    },
    mealType: {
        width: 20,
        position: 'absolute',
        bottom: 10,
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
    flex: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 1,
    },
    nutrient: {
        marginVertical: 5,
        marginTop: 10,
    },
    nutritionContent: {
        fontSize: 12,
        lineHeight: 15,
        letterSpacing: 1,
    },
})