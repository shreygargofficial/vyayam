import { useLayoutEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../../../../constants/Colors";
import ExerciseCard from "../../../exercise/ExerciseCard";
import IconButton from "../../../ui/IconButton";

function PerDaySplitScreen({ navigation, route }) {
    const { day } = route.params;
    const user = useSelector(state => state.user.userData);
    const allExercise = useSelector(state => state.exercise.exerciseData);
    useLayoutEffect(() => {
        navigation.setOptions({
            title: day,
            headerRight: () => (
                <IconButton
                    name={'edit'}
                    size={30}
                    color={'white'}
                    onPress={() => navigation.navigate('EditSplit', {
                        day: day
                    })} />
            )
        })
    }, [navigation]);

    const onExerciseClick = (_id) => {
        navigation.navigate('myExercise', {
            _id: _id,
            from: day
        })
    }

    if (user.exerciseSplit[day]?.length) {
        return (
            <View style={styles.root}>
                <View style={styles.textContainer}>
                    <Text style={styles.HeadingText}>Your Split for {day}</Text>
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    alwaysBounceHorizontal={false}
                // contentContainerStyle={{ flex: 2 }}
                >

                    {user.exerciseSplit[day].map(ele => {
                        const exercise = allExercise.find(exercise => exercise._id == ele)
                        return (
                            <ExerciseCard
                                key={ele}
                                exerciseName={exercise.exerciseName}
                                style={styles.card}
                                photoURL={exercise.photoURL}
                                _id={exercise._id}
                                onPress={onExerciseClick.bind(this, exercise._id)}
                            />
                        )
                    })}
                </ScrollView>
            </View>
        )
    }
    return (<View style={styles.root}>
        <Text style={styles.restText}>Seems Your Rest day</Text>
    </View>);
}

export default PerDaySplitScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    restText: {
        color: colors.primary,
        fontSize: 18,
        fontWeight: '300'
    },
    card: {
        height: 140,
        // marginTop: 200
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    HeadingText: {
        fontFamily: 'king',
        letterSpacing: 2,
        fontSize: 28,
        fontWeight: '300'
    }
})