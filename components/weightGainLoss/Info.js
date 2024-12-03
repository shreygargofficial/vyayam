import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

function Info({ bmr, tdee }) {
    const navigation = useNavigation();
    const navigateToMealDesigned = (type) => {
        navigation.navigate('mealsForWeightManagement', {
            type: type,
            tdee: tdee
        })
    }
    return (
        <View style={styles.root}>
            <Text style={styles.text}>
                <Text>Your Total Basal Metabolic Rate: <Text style={styles.strong}>{bmr.toFixed(2)}</Text></Text>
            </Text>
            <Text style={styles.text}>
                <Text>Total Calories needed to Maintain your weight: <Text style={styles.strong}>{tdee.toFixed(2)}</Text></Text>
            </Text>

            <View style={styles.weightTarget}>
                <Text style={styles.chooseGoalHeading}>Choose Your Goal</Text>
                <View style={styles.flex}>
                    <Pressable
                        onPress={navigateToMealDesigned.bind(this, 'gain')}
                        style={({ pressed }) => [styles.weightCard, pressed && styles.pressed]}>
                        <Image
                            source={require('../../assets/images/weightGoal/weightGain.jpg')}
                            style={styles.image}
                        />
                    </Pressable>
                    <Pressable
                        onPress={navigateToMealDesigned.bind(this, 'loss')}
                        style={({ pressed }) => [styles.weightCard, pressed && styles.pressed]}>
                        <Image
                            source={require('../../assets/images/weightGoal/weightLoss.jpg')}
                            style={styles.image}
                        />
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default Info;

const styles = StyleSheet.create({
    root: {
        padding: 10,
        marginTop: 50,
    },
    text: {
        color: colors.black,
        lineHeight: 42,
        letterSpacing: 1,
        fontSize: 18,
    },
    strong: {
        fontWeight: '600',
        fontSize: 14,
    },

    weightTarget: {
        marginTop: 40,
    },
    flex: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center'
    },
    chooseGoalHeading: {
        textAlign: 'center',
        fontWeight: '200',
        fontSize: 26,
        marginBottom: 30,
        lineHeight: 40,
    },
    weightCard: {
        backgroundColor: colors.white,
        elevation: 5,
        borderRadius: 20,
        shadowColor: colors.grey,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        flex: 1,
        marginHorizontal: 10

    },
    pressed: {
        opacity: 0.4,
    },
    image: {
        width: '100%',
        borderRadius: 20,
        height: 140,
    }
})