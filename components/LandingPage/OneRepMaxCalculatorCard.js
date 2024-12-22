import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { commonStyle } from "../../constants/Style";
import { useNavigation } from "@react-navigation/native";

function OneRepMaxCalculatorCard() {
    const navigation = useNavigation();
    const navigateToCalculator = () => {
        navigation.navigate('oneRep')
    }
    return (
        <Pressable
            onPress={navigateToCalculator}
            style={({ pressed }) => [pressed && commonStyle.pressed, styles.root]}
        >
            <ImageBackground source={require('../../assets/images/exercise/maxCalculator.jpg')} style={styles.image}>
                <View style={[commonStyle.overlay, styles.textContainer]}>
                    <Text style={commonStyle.overlayText}>
                        Calculate your One Rep Max
                    </Text>
                </View>
            </ImageBackground>
        </Pressable>
    );
}

export default OneRepMaxCalculatorCard;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        height: 160,
        marginHorizontal: 30,
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 50,
    },
    image: {
        width: '100%',
        flex: 1
    },
    textContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 40,
        alignItems: 'center'
    },
})