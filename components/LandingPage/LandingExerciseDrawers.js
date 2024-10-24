import { ScrollView, StyleSheet, Text, View } from "react-native";

import ExerciseCard from "./ExerciseCard";
import { useNavigation } from "@react-navigation/native";

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
            <ScrollView horizontal={true} >
                {exerciseArray?.map(exercise => {
                    return (
                        <ExerciseCard
                            onPress={onExerciseClick}
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