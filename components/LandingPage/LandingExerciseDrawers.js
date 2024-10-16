import { ScrollView, StyleSheet, Text, View } from "react-native";

import ExerciseCard from "./ExerciseCard";

function LandingExerciseDrawer({ exerciseArray }) {
    return (
        <View>
            <ScrollView horizontal={true} >
                {exerciseArray?.map(exercise => {
                    return (
                        <ExerciseCard
                            key={exercise._id}
                            exerciseName={exercise.exerciseName}
                            _id={exercise._id}
                            exerciseType={exercise.exerciseType}
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

})