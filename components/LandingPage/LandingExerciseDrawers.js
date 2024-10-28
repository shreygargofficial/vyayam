import { ScrollView, StyleSheet, Text, View } from "react-native";

import ExerciseCard from "./ExerciseCard";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../constants/Colors";

function LandingExerciseDrawer({ exerciseArray }) {
    const navigation = useNavigation()
    const onExerciseClick = (_id) => {
        navigation.navigate('myExercise', {
            _id: _id,
            from: 'Home'
        })
    }
    return (
        <View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {exerciseArray?.map(exercise => {
                    return (
                        <ExerciseCard
                            titleColor={colors.white}
                            style={styles.card}
                            onPress={onExerciseClick}
                            key={exercise._id}
                            exerciseName={exercise.exerciseName}
                            _id={exercise._id}
                            photoURL={exercise.photoURL}
                        />
                    )
                }
                )}

            </ScrollView>
        </View>);
}

export default LandingExerciseDrawer;

let styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255,255,255,0.1)',

    }
})