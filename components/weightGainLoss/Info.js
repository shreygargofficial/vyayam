import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/Colors";

function Info({ bmr, tdee }) {
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
                    <View style={styles.weightCard}>
                        <Image
                            source={require('../../assets/images/weightGoal/weightGain.jpg')}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.weightCard}>
                        <Image
                            source={require('../../assets/images/weightGoal/weightLoss.jpg')}
                            style={styles.image}
                        />
                    </View>
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
        flex: 1,
        marginHorizontal: 10

    },
    image: {
        width: '100%',
        borderRadius: 20,
        height: 140,
    }
})