import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import ExerciseCard from "./ExerciseCard";
import { useNavigation } from "@react-navigation/native";
import { usePaginationNormal } from "../../hooks/usePaginationNormal";
import { colors } from "../../constants/Colors";
import IconInputCustom from "../ui/IconInputCustom";
import ButtonWithIcon from "../ui/ButtonWithIcon";

function AllExercise() {
    const ITEMS_TO_DISPLAY = 10
    const [searchTerm, setSearchTerm] = useState('')
    const reduxExercise = useSelector(state => state.exercise);
    const [exercises, setExercises] = useState(reduxExercise.exerciseData);
    const { firstIndex, lastIndex, nextPage, prevPage } = usePaginationNormal(ITEMS_TO_DISPLAY, exercises)
    const navigation = useNavigation();
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
                <IconInputCustom
                    placeholder={'Search Exercise'}
                    name={'search'}
                    styleWrapper={styles.searchWrapper}
                    style={styles.searchInput}
                    placeholderTextColor={colors.primaryDark}
                    onChangeText={onSearchChange} />
            </View>
            <Text style={styles.itemsToDisplayText}> Navigate Left or Right for more</Text>
            <View style={styles.flexRow}>
                <ButtonWithIcon
                    title={"Left"}
                    name={'keyboard-arrow-left'}
                    color={firstIndex === 0 ? colors.grey : colors.primary}
                    size={30}
                    onPress={prevPage} />
                <ButtonWithIcon
                    buttonStyle={styles.rightButtonStyle}
                    title={"Right"}
                    name={'keyboard-arrow-right'}
                    color={lastIndex >= exercises?.length ? colors.grey : colors.primary}
                    size={30}
                    onPress={nextPage} />
            </View>
            {exercises && exercises.length > 0 && <FlatList
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
                data={exercises.slice(firstIndex, lastIndex)}
                numColumns={2}
                contentContainerStyle={{ paddingBottom: 100 }}
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
        backgroundColor: colors.white,
        flex: 1,
        alignItems: 'center',
    },
    card: {
        width: 130,
        marginHorizontal: 24,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    searchInputContainer: {
        width: 280,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 11,
        marginVertical: 20,

    },
    searchWrapper: {
        marginVertical: 0
    },
    searchInput: {
        paddingVertical: 0,
        width: 200,
        borderRadius: 5,
        color: colors.primary
    },
    flexRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    rightButtonStyle: {
        flexDirection: 'row-reverse'
    },
    textNavigation: {
        color: colors.white
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
