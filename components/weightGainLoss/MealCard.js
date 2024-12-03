import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { colors } from "../../constants/Colors";

function MealCard({ item: { _id, dishName, nutritionContent }, index }) {
    const navigation = useNavigation();
    const clickHandlerCard = (_id) => {
        navigation.navigate('myRecipe', {
            id: _id
        })
    }
    return (
        <View style={styles.cardWrapper}>
            <Text style={styles.mealNumber}>Meal {index}</Text>
            <Pressable
                style={styles.card}
                onPress={clickHandlerCard.bind(this, _id)}>
                <Text style={styles.heading}>
                    {dishName}
                </Text>
                <Text style={styles.calories}>
                    {nutritionContent.totalCalories} kcal
                </Text>
                <View style={styles.flex}>
                    <Text style={styles.nutritionContent}>
                        P: {nutritionContent.protein}
                    </Text>
                    <Text style={styles.nutritionContent}>
                        C: {nutritionContent.carbs}
                    </Text>
                    <Text style={styles.nutritionContent}>
                        F: {nutritionContent.fats}
                    </Text>
                </View>
            </Pressable>

        </View>
    );
}

export default MealCard;

const styles = StyleSheet.create({
    cardWrapper: {
        marginTop: 30,
        paddingHorizontal: 40,
    },
    mealNumber: {
        textAlign: 'center'
    },
    card: {
        marginVertical: 10,
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: colors.grey,
    },
    heading: {
        fontSize: 24,
        letterSpacing: 1,
        lineHeight: 40,
        textTransform: 'capitalize',
        textAlign: 'center',
        fontFamily: 'king'
    },
    calories: {
        fontSize: 12,
        textAlign: 'center'
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 20,
        marginBottom: 1,
    },
    nutritionContent: {
        fontSize: 12,
        fontFamily: 'king'
    },
})