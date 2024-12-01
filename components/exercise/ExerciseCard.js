import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/Colors";
import { SERVERURL } from "../../constants/Environment";
import { useState } from "react";
import CustomLoader from "../ui/CustomLoader";
import ImageLoader from "../ui/ImageLoader";

function ExerciseCard({
    exerciseName,
    onPress,
    _id,
    exerciseType,
    photoURL,
    style,
    imageContainerStyle,
    infoContainerStyle,
    titleColor,
    loading = true
}) {
    const [imageLoading, setImageLoading] = useState(loading);
    return (
        <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.pressed, style]}
            onPress={onPress.bind(this, _id)}>
            {imageLoading && <ImageLoader />}
            <View style={[styles.imageContainer, imageContainerStyle]}>
                {photoURL ?
                    <Image
                        onLoadEnd={() => setImageLoading(false)}
                        source={{ uri: `${SERVERURL}/${photoURL}` }}
                        style={styles.cardImage} /> :
                    <Image
                        onLoadEnd={() => setImageLoading(false)}
                        source={require('../../assets/images/exercise/exercise.jpg')}
                        style={styles.cardImage} />}

            </View>
            <View style={[styles.infoContainer, infoContainerStyle]}>
                <Text style={[styles.cardTitle, titleColor ? { color: titleColor } : { color: colors.primaryDark }]}>{exerciseName}</Text>
                {exerciseType && <Text style={[styles.cardSubTitle]}>{exerciseType} Exercise</Text>}
            </View>
        </Pressable >
    );
}

export default ExerciseCard;

let styles = StyleSheet.create({

    card: {
        borderRadius: 10,
        width: 120,
        margin: 10,
        backgroundColor: colors.white,


    },
    imageContainer: {
        flex: 5,
        borderRadius: 4,
        overflow: 'hidden',
    },
    infoContainer: {
        flex: 2,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTitle: {
        color: colors.primaryDark,
        fontWeight: '300',
        fontSize: 14,
        marginBottom: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardSubTitle: {
        fontSize: 12,
        color: colors.primary,
        marginBottom: 3,
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