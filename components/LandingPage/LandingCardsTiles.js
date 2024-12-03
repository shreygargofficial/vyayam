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
                    style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
                    <Image style={styles.cardImage} source={require('../../assets/images/cardHome/log.jpg')} />
                    <View style={styles.cardTitleContainer}>
                        <Text style={styles.cardTitle}>Exercise Log</Text>
                    </View>
                </Pressable>
            </View>
            <View style={styles.rowFlex}>
                <View
                    style={[styles.card, styles.cardFull]}>
                    <View style={[styles.cardTitleContainer]}>
                        <Text style={[styles.cardTitle, styles.weightAlterHeadeing]}>Do You want to gain muscle or lose fat?</Text>
                        <ButtonSimple
                            title={'Yes'}
                            onPress={tileClickHandler.bind(this, 'weightLossGain')}
                            color={colors.grey}
                            style={styles.yesBtn}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

export default LandingCardsTiles;


const styles = StyleSheet.create({

    tilesContainer: {
        marginTop: 50
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
    cardFull: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginHorizontal: 30,
        marginTop: 50,
    },
    pressed: {
        opacity: 0.3
    },
    cardImage: {
        width: '100%',
        height: 140,
        opacity: 0.9,
        borderRadius: 10
    },
    cardTitleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    weightAlterHeadeing: {
        color: colors.white,
        letterSpacing: 1,
        lineHeight: 20,
    },
    cardTitle: {
        color: colors.primary
    },
    yesBtn: {
        backgroundColor: colors.primaryDark,
        marginTop: 20,
        borderRadius: 10,
    },
})