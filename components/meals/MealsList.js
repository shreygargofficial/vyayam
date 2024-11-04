import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/Colors";
import { SERVERURL } from "../../constants/Environment";

function MealsList({ dishName, totalCalories, photoURL, onPress, _id }) {

    return (
        <Pressable onPress={() => onPress(_id)} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
            <View style={styles.rowFlexing}>
                <View style={styles.imageContainer}>
                    {
                        photoURL ?
                            <Image source={{ uri: `${SERVERURL}/${photoURL}` }} style={styles.image} /> :
                            <Image source={require('../../assets/images/meals/mealDefault.jpg')} style={styles.image} />
                    }
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.title} >{dishName}</Text>
                    <View style={styles.rowFlexing}>
                        <Text style={styles.macro}>Calories: {totalCalories}</Text>

                    </View>
                </View>
            </View>
        </Pressable>
    );
}

export default MealsList;

let styles = StyleSheet.create({
    button: {
        elevation: 10,
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.30,
        shadowRadius: 5,
        margin: 10,
        borderRadius: 10,
    },
    rowFlexing: {
        flexDirection: 'row',
        gap: 20,
    },
    imageContainer: {
        flex: 3,
        borderRadius: 10,
        overflow: 'hidden',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },
    infoContainer: {
        flex: 7,
        justifyContent: 'space-evenly'
    },
    pressed: {
        opacity: 0.9,
        elevation: 2,
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.30,
        shadowRadius: 0,
    },
    image: {
        width: '100%',
        height: 100,
    },
    title: {
        fontSize: 19,
        fontWeight: '300',
        // textAlign: 'center'
    },
    macro: {
        fontSize: 12,

    }

})