import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import ExerciseCard from "../../LandingPage/ExerciseCard";
import { colors } from "../../../constants/Colors";
import IconInputCustom from "../../ui/IconInputCustom";
import { useNavigation } from "@react-navigation/native";

function AllExercise() {
    const [searchTerm, setSearchTerm] = useState('')
    const reduxExercise = useSelector(state => state.exercise);
    const [exercises, setExercises] = useState(reduxExercise.exerciseData);
    const navigation = useNavigation();
    const ITEMS_TO_DISPLAY = 20

    useEffect(() => {

        if (searchTerm.length >= 3 && reduxExercise?.exerciseData) {
            const search = searchTerm.trim().toLowerCase();
            const filteredExercise = reduxExercise.exerciseData.filter(ex =>
                ex.exerciseName.toLowerCase().includes(search) ||
                ex.exerciseType.toLowerCase().includes(search) ||
                ex.primaryMuscleTargeted.toLowerCase().includes(search) ||
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
    const onExerciseClick = (_id) => {
        navigation.navigate('myExercise', {
            _id: _id,
            from: 'Exercises'
        })
    }

    return (
        <View style={styles.root}>
            <View style={styles.searchInputContainer}>
                <IconInputCustom placeholder={'Search Exercise'} name={'search'} style={styles.searchInput} onChangeText={onSearchChange} />
            </View>
            <Text style={styles.itemsToDisplayText}>Top {ITEMS_TO_DISPLAY} Items Search for More</Text>
            {exercises && exercises.length > 0 && <FlatList
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
                data={exercises.slice(0, ITEMS_TO_DISPLAY)}
                numColumns={2}
                keyExtractor={(item) => item._id}
                renderItem={({ item: { _id, exerciseName, photoURL } }) => (
                    <ExerciseCard
                        onPress={onExerciseClick}
                        exerciseName={exerciseName}
                        _id={_id}
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
        alignItems: 'center',
    },
    card: {
        width: 130,
        marginHorizontal: 24,

    },
    searchInputContainer: {
        width: 250,
        alignSelf: 'center'
    },
    searchInput: {
        backgroundColor: 'white',
        paddingVertical: 7,
        paddingLeft: 10,
        borderRadius: 5
    },
    itemsToDisplayText: {
        color: colors.primary,
        textAlign: 'center',
        marginVertical: 10,
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
