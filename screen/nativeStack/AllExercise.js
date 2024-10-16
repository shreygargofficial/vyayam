import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import ExerciseCard from "../../components/LandingPage/ExerciseCard";
import { colors } from "../../constants/Colors";
import IconInputCustom from "../../components/ui/IconInputCustom";

function AllExercise() {
    const [searchTerm, setSearchTerm] = useState('')
    const reduxExercise = useSelector(state => state.exercise);
    const [exercises, setExercises] = useState(reduxExercise.exerciseData)

    useEffect(() => {

        if (searchTerm.length >= 3 && reduxExercise?.exerciseData) {
            const search = searchTerm.trim().toLowerCase();
            const filteredExercise = reduxExercise.exerciseData.filter(ex =>
                ex.exerciseName.toLowerCase().includes(search) ||
                ex.exerciseType.toLowerCase().includes(search) ||
                ex.primaryMuscleTargeted.toLowerCase().includes(search) ||
                ex.allMusclesUsed.some(ele => ele.toLowerCase().includes(search)) ||
                ex.splitDerivative.some(ele => ele.toLowerCase().includes(search))
            );
            setExercises(filteredExercise);
        }
        else {
            setExercises(reduxExercise.exerciseData)
        }
    }, [searchTerm])


    const onSearchChange = (val) => {
        setSearchTerm(val)
    }


    return (
        <View style={styles.root}>
            <View style={styles.searchInputContainer}>
                <IconInputCustom placeholder={'Search Exercise'} name={'search'} style={styles.searchInput} onChangeText={onSearchChange} />
            </View>
            {exercises && exercises.length > 0 && <FlatList
                alwaysBounceVertical={false}
                data={exercises}
                keyExtractor={(item) => item._id}
                renderItem={({ item: { _id, exerciseName, exerciseType, photoURL } }) => (
                    <ExerciseCard
                        exerciseName={exerciseName}
                        _id={_id}
                        exerciseType={exerciseType}
                        photoURL={photoURL}
                        style={styles.card}
                    />
                )}
            />}
            {
                (!exercises || !exercises.length) &&
                <View style={styles.noExercise}>
                    <Text style={styles.noExerciseText}>No Exercises</Text>
                </View>
            }
        </View>
    );
}

export default AllExercise;

let styles = StyleSheet.create({
    root: {
        backgroundColor: 'rgba(0,0,0,0.9)',
        flex: 1,
    },
    card: {
        alignSelf: 'center',
        width: 300,
        backgroundColor: 'rgba(8,133,142,0.2)'
    },
    searchInputContainer: {
        width: 250,
        alignSelf: 'center'
    },
    searchInput: {
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingLeft: 10,
        borderRadius: 5
    },
    noExercise: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        color: colors.primaryDark
    },
    noExerciseText: {
        color: colors.primary
    }
})
