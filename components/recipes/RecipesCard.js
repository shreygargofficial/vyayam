import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/Colors";
import { SERVERURL } from "../../constants/Environment";
import { useState } from "react";
import ImageLoader from "../ui/ImageLoader";

function RecipesCard({ dishName, totalCalories, photoURL, onPress, _id }) {
    const [imageLoading, setImageLoading] = useState(true);
    return (
        <Pressable
            onPress={() => onPress(_id)}
            style={({ pressed }) => [styles.cardPressable, pressed && styles.pressed]}>

            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    {imageLoading && <ImageLoader style={styles.imageLoader} />}
                    {
                        photoURL ?
                            <Image
                                source={{ uri: `${SERVERURL}/${photoURL}` }}
                                onLoadEnd={() => setImageLoading(false)}
                                style={styles.image} /> :
                            <Image
                                onLoadEnd={() => setImageLoading(false)}
                                source={require('../../assets/images/recipes/recipeDefault.jpg')}
                                style={styles.image} />
                    }
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title} >{dishName}</Text>
                    </View>
                    <View >
                        <Text style={styles.macro}>Calories: {totalCalories}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

export default RecipesCard;

let styles = StyleSheet.create({
    cardPressable: {
        padding: 10,
        alignItems: 'center',
        width: 170,
        margin: 10,
        borderRadius: 10,
        borderWidth: 0.8,
        borderColor: colors.grey,
    },
    card: {
        padding: 2,
        alignItems: 'center',
        flex: 1,
    },
    imageLoader: {
        width: 100,
        height: 100,
        top: -6,
        left: -5,
        borderRadius: Platform.select({ ios: '50%', android: 50 }),
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: Platform.select({ ios: '50%', android: 50 }),
        borderWidth: 6,
        borderColor: 'rgba(0, 150, 255, 0.3)',

    },
    infoContainer: {
        marginTop: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        flex: 1,
        width: 170,
        justifyContent: 'space-between',
        borderRadius: 10

    },
    pressed: {
        opacity: 0.2,
        elevation: 2,
        backgroundColor: colors.white,
        shadowColor: colors.white,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.30,
        shadowRadius: 0,
    },
    image: {
        width: '100%',
        borderRadius: Platform.select({ ios: '50%', android: 50 }),
        height: '100%',
    },
    titleWrapper: {
        borderRadius: 10,
    },
    title: {
        fontSize: 13,
        textAlign: 'center',
        fontWeight: '300',
        textTransform: 'capitalize',
        letterSpacing: 1,
        lineHeight: 20,
        paddingHorizontal: 10,
        color: colors.black,


    },
    macro: {
        fontSize: 11,
        textAlign: 'center',
        marginTop: 5,
        backgroundColor: colors.black,
        color: colors.white,
        paddingVertical: 4,
    }

})