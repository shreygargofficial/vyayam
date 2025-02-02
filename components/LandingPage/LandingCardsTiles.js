import { useNavigation } from '@react-navigation/native';
import { colors } from '../../constants/Colors';
import ButtonSimple from '../ui/ButtonSimple';

const { View, Pressable, Image, Text, StyleSheet } = require('react-native');


function LandingCardsTiles() {
    const navigation = useNavigation()
    const tileClickHandler = (screen) => {
        navigation.navigate(screen)
    }
    return (
        <View style={styles.tilesContainer}>
            <View style={styles.rowFlex}>
                <Pressable
                    style={({ pressed }) => [styles.card, pressed && styles.pressed]}
                    onPress={tileClickHandler.bind(this, 'weight')}>
                    <Image style={styles.cardImage} source={require('../../assets/images/cardHome/weight.jpg')} />
                    <View style={styles.cardTitleContainer}>
                        <Text style={styles.cardTitle}>Weight Log</Text>
                    </View>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [styles.card, pressed && styles.pressed]}
                    onPress={tileClickHandler.bind(this, 'measurement')} >
                    <Image style={styles.cardImage} source={require('../../assets/images/cardHome/measurement.jpg')} />
                    <View style={styles.cardTitleContainer}>
                        <Text style={styles.cardTitle}>Body Measurement</Text>
                    </View>
                </Pressable>
            </View>
            <View style={styles.rowFlex}>
                <Pressable
                    style={({ pressed }) => [styles.card, pressed && styles.pressed]}
                    onPress={tileClickHandler.bind(this, 'splitChoice')}
                >
                    <Image style={styles.cardImage} source={require('../../assets/images/cardHome/split.jpg')} />
                    <View style={styles.cardTitleContainer}>
                        <Text style={styles.cardTitle}>My Workout Split</Text>
                    </View>
                </Pressable>
                <Pressable
                    onPress={tileClickHandler.bind(this, 'log')}
                    style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
                    <Image style={styles.cardImage} source={require('../../assets/images/cardHome/log.jpg')} />
                    <View style={styles.cardTitleContainer}>
                        <Text style={styles.cardTitle}>Exercise Log</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
}

export default LandingCardsTiles;


export const styles = StyleSheet.create({

    tilesContainer: {
        marginTop: 50,
        paddingHorizontal: 30,
    },
    rowFlex: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    card: {
        flex: 1,
        backgroundColor: 'rgba(200,200,200,0.1)',
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    pressed: {
        opacity: 0.3
    },
    cardImage: {
        width: '100%',
        height: 100,
        opacity: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardTitleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8
    },

    cardTitle: {
        color: colors.white,
        fontFamily: 'caviar',
        letterSpacing: 1,
        fontSize: 10,
    },

})