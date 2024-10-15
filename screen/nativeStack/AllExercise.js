import { useEffect } from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

function AllExercise() {
    const exercise = useSelector(state => state.exercise)
    console.log(exercise.exerciseData)
    return (
        <View>
            <Text>Hello</Text>
        </View>
    );
}

export default AllExercise;