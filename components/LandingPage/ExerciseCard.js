import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
function ExerciseCard({
    exerciseName,
    _id,
    exerciseType,
    photoURL,
    style
}) {
    const navigation = useNavigation()
    const onExerciseCardPress = (_id) => {
        navigation.navigate('myExercise', {
            _id: _id,
            from: 'back'
        })
    }
    return (
        <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed, style]} onPress={onExerciseCardPress.bind(this, _id)}>
            <View style={styles.rowFlex}>
                <View style={styles.imageContainer}>
                    {photoURL ?
                        <Image source={{ uri: `${SERVERURL}/${photoURL}` }} style={styles.cardImage} /> :
                        <Image source={require('../../assets/images/exercise/dumbelllunges.jpg')} style={styles.cardImage} />}

                </View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.cardTitle]}>{exerciseName}</Text>
                    <Text style={[styles.cardSubTitle]}>{exerciseType} Exercise</Text>
                </View>
            </View>
        </Pressable>
    );
}

export default ExerciseCard;

let styles = StyleSheet.create({

    card: {
        width: 250,
        backgroundColor: 'rgba(70,70,70,0.4)',
        padding: 4,
        margin: 10,
        borderRadius: 4,
    },
    imageContainer: {
        flex: 5,
        borderRadius: 4,
        overflow: 'hidden'
    },
    infoContainer: {
        flex: 7,
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    cardTitle: {
        color: colors.white,
        fontWeight: '300',
        fontSize: 20,
        flex: 2,
    },
    cardSubTitle: {
        fontSize: 12,
        color: colors.white,
        flex: 1
    },
    rowFlex: {
        flexDirection: 'row'
    },
    cardImage: {
        width: '100%',
        height: 70
    },
    pressed: {
        opacity: 0.3
    }
})