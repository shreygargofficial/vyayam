import { ScrollView, StyleSheet, Text, View } from "react-native";
import ExerciseCard from "../LandingPage/ExerciseCard";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../constants/Colors";

export default function ({ exercisesArray, title }) {
    const navigation = useNavigation()
    const onPress = (_id) => {
        navigation.navigate("myExercise", {
            _id: _id,
            from: 'Sample Split'
        })
    }

    return (
        <View>
            <Text style={styles.title}>{title}</Text>
            {exercisesArray ? <ScrollView
                horizontal={true}>
                {exercisesArray.map(exercise => {
                    return (
                        <ExerciseCard
                            key={exercise._id}
                            exerciseName={exercise.exerciseName}
                            _id={exercise._id}
                            exerciseType={""}
                            onPress={onPress}
                            style={styles.card}
                            imageContainerStyle={styles.imageContainerStyle}
                            infoContainerStyle={styles.infoContainerStyle}
                        />
                    )
                }
                )}
            </ScrollView>
                :
                <Text style={[styles.title, styles.subtitle]}>Its Your Rest Day</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: '200',
        textAlign: 'center',
        marginVertical: 10
    },
    card: {
        borderRadius: 50,
        width: 100,
        height: 100,
        justifyContent: 'center',
        // overflow: 'hidden',
        elevation: 5,
        shadowColor: colors.grey,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: { width: 2, height: 2 },
        backgroundColor: colors.white
    },
    imageContainerStyle: {
        display: 'none'

    },
    infoContainerStyle: {
        marginTop: 30
    },
    subtitle: {
        fontSize: 18
    }
})