import { Image, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import ButtonSimple from '../ui/ButtonSimple';
import { styles } from './LandingCardsTiles';
import { colors } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

function WeightManagementCard() {
    const navigation = useNavigation()
    const tileClickHandler = (screen) => {
        navigation.navigate(screen)
    }
    return (
        <View
            style={[styles.card, weightCardStyles.cardFull]}>
            <View style={[styles.cardTitleContainer]}>
                <Image
                    source={require('../../assets/images/weightGoal/loveBody.jpg')}
                    style={styles.cardImage}
                />
                <Text style={[styles.cardTitle, weightCardStyles.weightAlterHeadeing]}>Do You want to gain muscle or lose fat?</Text>
                <ButtonSimple
                    title={'Yes'}
                    onPress={tileClickHandler.bind(this, 'weightLossGain')}
                    color={colors.grey}
                    style={weightCardStyles.yesBtn}
                />
            </View>
        </View>
    );
}

export default WeightManagementCard;

const weightCardStyles = StyleSheet.create({
    cardFull: {
        flex: 1,
        // backgroundColor: 'rgba(255,255,255,0.5)',
        marginHorizontal: 30,
        marginTop: 50,
    },
    weightAlterHeadeing: {
        color: colors.white,
        letterSpacing: 1,
        lineHeight: 20,
        marginTop: 20,
    },
    yesBtn: {
        backgroundColor: colors.primaryDark,
        marginTop: 20,
        borderRadius: 10,
    },
})