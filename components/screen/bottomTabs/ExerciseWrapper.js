import { StyleSheet } from "react-native";
import { View } from "react-native";
import AllExercise from "../../exercise/AllExercise";
import { colors } from "../../../constants/Colors";

function ExerciseWrapper() {
    return (
        <View style={styles.root}>
            <AllExercise />
        </View>
    );
}

export default ExerciseWrapper;

const styles = StyleSheet.create({
    root: {
        flex: 1,
    }
})