import { Button, Text, View, StyleSheet, ScrollView, Image, ImageBackground, useWindowDimensions, Pressable } from "react-native";
import { colors } from "../../constants/Colors";
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from "react-redux";

function Landing({ navigation }) {
    const { height, width } = useWindowDimensions()
    const user = useSelector(state => state.user)
    return (
        <ScrollView
            alwaysBounceVertical={false}
            style={{ backgroundColor: colors.black }}
        >
            <ImageBackground
                source={user?.userData?.gender == "male" ?
                    require('../../assets/images/banner/male.jpg') :
                    require('../../assets/images/banner/female.jpg')}
                style={[styles.banner, { width, height }]}
            >
                <View >
                    <Text style={styles.slogan}>"Lets start your journey with us!"</Text>
                </View>
            </ImageBackground>
            <LinearGradient
                colors={['rgba(255,255,255,0.02)', 'rgba(255, 255, 255, 0.1)']}
                style={{ width: width, height: 3000 }}
            >
                <View>
                    <View style={styles.tilesContainer}>
                        <View style={styles.rowFlex}>
                            <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
                                <Image style={styles.cardImage} source={require('../../assets/images/cardHome/weight.jpg')} />
                                <View style={styles.cardTitleContainer}>
                                    <Text style={styles.cardTitle}>Weight Log</Text>
                                </View>
                            </Pressable>
                            <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
                                <Image style={styles.cardImage} source={require('../../assets/images/cardHome/measurement.jpg')} />
                                <View style={styles.cardTitleContainer}>
                                    <Text style={styles.cardTitle}>Body Measurement</Text>
                                </View>
                            </Pressable>
                        </View>
                        <View style={styles.rowFlex}>
                            <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
                                <Image style={styles.cardImage} source={require('../../assets/images/cardHome/measurement.jpg')} />
                                <View style={styles.cardTitleContainer}>
                                    <Text style={styles.cardTitle}>My Workout Split</Text>
                                </View>
                            </Pressable>
                            <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
                                <Image style={styles.cardImage} source={require('../../assets/images/cardHome/log.jpg')} />
                                <View style={styles.cardTitleContainer}>
                                    <Text style={styles.cardTitle}>Exercise Log</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>

                    <Text style={styles.slogan}>Hello</Text>
                </View>
            </LinearGradient>

        </ScrollView>);
}

export default Landing;


const styles = StyleSheet.create({
    banner: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    slogan: {
        marginTop: 60,
        textAlign: 'center',
        fontSize: 40,
        fontWeight: '200',
        color: colors.white
    },
    tilesContainer: {
        marginTop: 100
    },
    rowFlex: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    card: {
        padding: 10,
        flex: 1,
        backgroundColor: 'rgba(200,200,200,0.1)',
        margin: 10,
        borderRadius: 10,
    },
    pressed: {
        opacity: 0.3
    },
    cardImage: {
        width: '100%',
        height: 140,
        opacity: 0.3
    },
    cardTitleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    cardTitle: {
        color: colors.primary
    },

})