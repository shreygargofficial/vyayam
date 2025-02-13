import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { exerciseSplitActionCreator } from "../../../../redux/ActionCreators/exerciseSplitActionCreator";
import SampleSplitDayWiseExerciseCard from "../../../splits/SampleSplitDayWiseExerciseCard";
import { colors } from "../../../../constants/Colors";

function SampleSplit() {
    const dispatch = useDispatch();
    const split = useSelector(state => state.split)
    const [mySampleSplit, setMySampleSplit] = useState(null)
    const allExercise = useSelector(state => state.exercise.exerciseData)
    useEffect(() => {
        if (!split)
            dispatch(exerciseSplitActionCreator())
    }, []);

    useEffect(() => {
        if (split) {
            let finalExercise = {}
            for (let key in split) {
                let exerciseArray = split[key].map(exerciseId => {
                    let { exerciseName, _id } = allExercise?.find(exercise => exercise._id == exerciseId);
                    return { exerciseName, _id };
                })
                finalExercise[key] = exerciseArray;

            }
            setMySampleSplit(finalExercise)

        }
    }, [split, allExercise]);


    if (mySampleSplit)
        return (
            <ScrollView
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 60, backgroundColor: colors.white }}
            >
                <SampleSplitDayWiseExerciseCard
                    exercisesArray={mySampleSplit['Monday']}
                    title={'Monday'}

                />
                <SampleSplitDayWiseExerciseCard
                    exercisesArray={mySampleSplit['Tuesday']}
                    title={'Tuesday'}

                />
                <SampleSplitDayWiseExerciseCard
                    exercisesArray={mySampleSplit['Wednesday']}
                    title={'Wednesday'}

                />
                <SampleSplitDayWiseExerciseCard
                    exercisesArray={mySampleSplit['Thursday']}
                    title={'Thursday'}

                />
                <SampleSplitDayWiseExerciseCard
                    exercisesArray={mySampleSplit['Friday']}
                    title={'Friday'}

                />
                <SampleSplitDayWiseExerciseCard
                    exercisesArray={mySampleSplit['Saturday']}
                    title={'Saturday'}

                />
                <SampleSplitDayWiseExerciseCard
                    exercisesArray={null}
                    title={'Sunday'}

                />
            </ScrollView>

        );
    else {
        return (
            <View style={styles.root}>
                <Text>There is some issue in Loading</Text>
            </View>
        )
    }
}

export default SampleSplit;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
    }
})
