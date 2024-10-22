import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/Colors";

function SplitExerciseOption() {
    return (<View style={styles.root}>
        <Pressable style={({ pressed }) => [pressed && styles.press, styles.card]}>
            <Text style={styles.text}>Sample Split</Text>
        </Pressable>

        <Pressable style={({ pressed }) => [pressed && styles.press, styles.card, styles.marginTop]}>
            <Text style={styles.text}>Customized Split</Text>
        </Pressable>
    </View>);
}

export default SplitExerciseOption;


const styles = StyleSheet.create({
    root: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        padding: 40
    },
    card: {
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: colors.white,
        elevation: 5,
        shadowColor: colors.grey,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 10,
        shadowRadius: 5,
        height: 140,
    },
    marginTop: {
        marginTop: 30,
    },
    text: {
        textAlign: 'center',
        color: colors.primaryDark,
        fontSize: 27,
        fontWeight: '300'
    },
    press: {
        opacity: 0.5
    }
})