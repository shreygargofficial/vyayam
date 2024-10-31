import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { colors } from "../../constants/Colors";

function CustomLoader() {
    return (
        <View style={styles.root}>
            <LottieView
                autoPlay
                style={styles.lottie}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require('../../assets/animationLottie/burgerAndGym.json')}
            />
        </View>
    );
}

export default CustomLoader;


let styles = StyleSheet.create({
    root: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 100,
        backgroundColor: colors.white,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    lottie: {
        width: 200,
        height: 200,
    }
})