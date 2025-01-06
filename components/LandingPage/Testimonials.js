import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/Colors";

export default function Testimonials() {

    return (
        <View>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/images/testimonials/trainer.png')} style={styles.image} />
            </View>
            <Text style={styles.testimonialsText}>This all in one app will allow you to track all your health related stuff.</Text>

        </View >
    )
}

const styles = StyleSheet.create({
    root: {
        paddingVertical: 40,
        paddingHorizontal: 20,
        marginVertical: 30,
        marginTop: 100,
        margin: 20
    },
    testimonialsText: {
        marginTop: 40,
        color: colors.white,
        fontSize: 17,
        lineHeight: 25,
        fontWeight: '100',
        textAlign: 'center',
        fontFamily: 'caviari',
        letterSpacing: 1,

    },
    imageContainer: {
        width: 120,
        height: 120,
        // padding: 20,
        borderRadius: 60,
        alignSelf: 'center',
        backgroundColor: colors.black,
        marginTop: 100,
    },
    image: {
        alignSelf: 'center',
        borderColor: colors.white,
        borderRadius: 60,
        overflow: 'hidden',
        width: 120,
        height: 120
    }
})