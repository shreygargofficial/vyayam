import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/Colors";


export default function Testimonials() {

    return (
        <View style={styles.root}>
            <View style={styles.topLeft}></View>
            <View style={styles.bottomRight}></View>
            <View style={styles.rightBottom}></View>
            <View style={styles.leftTop}></View>
            <View style={styles.rightTop}></View>
            <View style={styles.topRight}></View>
            <View style={styles.leftBottom}></View>
            <View style={styles.bottomLeft}></View>

            <Text style={styles.testimonialsText}>This all in one app will allow you to track all your health related stuff.</Text>

        </View>
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
        color: colors.white,
        fontSize: 26,
        lineHeight: 60,
        fontWeight: '100',
        textAlign: 'center',
        fontFamily: 'king',
        // textTransform: 'capitalize',
        letterSpacing: 3,

    },
    topLeft: {
        position: 'absolute',
        width: 60,
        height: 6,
        backgroundColor: colors.white
    },
    leftTop: {
        position: 'absolute',
        left: 0,
        width: 6,
        height: 60,
        backgroundColor: colors.white
    },
    rightBottom: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 6,
        height: 60,
        backgroundColor: colors.white
    },
    bottomRight: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 60,
        height: 6,
        backgroundColor: colors.white
    },

    topRight: {
        position: 'absolute',
        right: 0,
        width: 60,
        height: 6,
        backgroundColor: colors.white
    },
    rightTop: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: 60,
        width: 6,
        backgroundColor: colors.white
    },
    leftBottom: {
        position: 'absolute',
        bottom: 0,
        width: 6,
        height: 60,
        backgroundColor: colors.white
    },
    bottomLeft: {
        position: 'absolute',
        bottom: 0,
        width: 60,
        height: 6,
        backgroundColor: colors.white
    },

})