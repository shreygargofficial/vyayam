import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

function ExerciseById() {
    const route = useRoute();
    const navigation = useNavigation()
    const [myExercise, setMyExercise] = useState(null)
    const exercise = useSelector(state => state.exercise)
    const { _id, from } = route.params;

    useEffect(() => {
        navigation.setOptions({ headerBackTitle: from })
        let myExercise = exercise?.exerciseData.filter(ele => ele._id == _id);
        setMyExercise(myExercise);
    }, [_id])


    console.log(myExercise);
    return (
        <View>
            <Text>Hekl</Text>
        </View>
    );
}

export default ExerciseById;