import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/Colors";
function ExerciseCard({
    exerciseName,
    onPress,
    _id,
    exerciseType,
    photoURL,
    style
}) {

    return (
        <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.pressed, style]}
            onPress={onPress.bind(this, _id)}>

            <View style={styles.imageContainer}>
                {photoURL ?
                    <Image source={{ uri: `${SERVERURL}/${photoURL}` }} style={styles.cardImage} /> :
                    <Image source={require('../../assets/images/exercise/dumbelllunges.jpg')} style={styles.cardImage} />}

            </View>
            <View style={styles.infoContainer}>
                <Text style={[styles.cardTitle]}>{exerciseName}</Text>
                <Text style={[styles.cardSubTitle]}>{exerciseType} Exercise</Text>
            </View>
        </Pressable>
    );
}

export default ExerciseCard;

let styles = StyleSheet.create({

    card: {
        borderRadius: 10,
        width: 120,
        margin: 10,
        padding: 10,
        backgroundColor: colors.white

    },
    imageContainer: {
        flex: 5,
        borderRadius: 4,
        overflow: 'hidden'
    },
    infoContainer: {
        flex: 2,
        marginTop: 10,
        alignItems: 'center'
    },
    cardTitle: {
        color: colors.primaryDark,
        fontWeight: '300',
        fontSize: 14,
        flex: 2,
        marginBottom: 6
    },
    cardSubTitle: {
        fontSize: 12,
        color: colors.primary,
        flex: 1,
        marginBottom: 3
    },
    rowFlex: {
        flexDirection: 'row'
    },
    cardImage: {
        width: '100%',
        height: 100
    },
    pressed: {
        opacity: 0.3
    }
})