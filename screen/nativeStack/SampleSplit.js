import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { exerciseSplitActionCreator } from "../../ActionCreators/exerciseSplitActionCreator";
import ExerciseCard from "../../components/LandingPage/ExerciseCard";
import CustomLoader from "../../components/ui/CustomLoader";
import SampleSplitDayWiseExerciseCard from "../../components/splits/SampleSplitDayWiseExerciseCard";

function SampleSplit({ navigation }) {
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
                    let { exerciseName, _id } = allExercise.find(exercise => exercise._id == exerciseId);
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
                contentContainerStyle={{ paddingBottom: 60 }}
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
            <CustomLoader />
        )
    }
}

export default SampleSplit;

