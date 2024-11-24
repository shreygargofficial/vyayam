import { Image, Text, View, StyleSheet } from 'react-native';
import { colors } from '../../constants/Colors';


const TEXT_COLOR = colors.white;

export default function ({ nutritionContent }) {
    return (
        <>
            <View style={styles.flexRow}>
                <View style={styles.nutrient}>
                    <Text style={styles.nutrientHeading}>
                        Protein
                    </Text>
                    <View style={styles.nutrientImageWrapper}>
                        <Image source={require('../../assets/images/meals/protein.png')} style={styles.nutrientImage} />
                    </View>
                    <Text style={styles.nutrientValue}>
                        {nutritionContent?.protein}g
                    </Text>
                </View>
                <View style={styles.nutrient}>
                    <Text style={styles.nutrientHeading}>
                        Fats
                    </Text>
                    <View style={styles.nutrientImageWrapper}>
                        <Image source={require('../../assets/images/meals/fats.png')} style={styles.nutrientImage} />
                    </View>
                    <Text style={styles.nutrientValue}>
                        {nutritionContent?.fats}g
                    </Text>
                </View>
                <View style={styles.nutrient}>
                    <Text style={styles.nutrientHeading}>
                        Carbs
                    </Text>
                    <View style={styles.nutrientImageWrapper}>
                        <Image source={require('../../assets/images/meals/carbs.png')} style={styles.nutrientImage} />
                    </View>
                    <Text style={styles.nutrientValue}>
                        {nutritionContent?.carbs}g
                    </Text>
                </View>
                <View style={styles.nutrient}>
                    <Text style={styles.nutrientHeading}>
                        Fiber
                    </Text>
                    <View style={styles.nutrientImageWrapper}>
                        <Image source={require('../../assets/images/meals/fiber.png')} style={styles.nutrientImage} />
                    </View>
                    <Text style={styles.nutrientValue}>
                        {nutritionContent?.fiber}g
                    </Text>
                </View>
            </View>
            <View>
                <View style={styles.nutrient}>
                    <Text style={styles.nutrientHeading}>
                        Total Calories
                    </Text>
                    <View style={styles.nutrientImageWrapper}>
                        <Image source={require('../../assets/images/meals/calories.png')} style={styles.nutrientImage} />
                    </View>
                    <Text style={styles.nutrientValue}>
                        {nutritionContent?.totalCalories}Kcal
                    </Text>
                </View>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30
    },
    nutrient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nutrientHeading: {
        color: TEXT_COLOR,
        textAlign: 'center',
        marginVertical: 10,
        letterSpacing: 1,

    },
    nutrientImageWrapper: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.grey,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nutrientImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    nutrientValue: {
        color: TEXT_COLOR,
        textAlign: 'center',
        marginVertical: 10,
        letterSpacing: 1,
    },
})