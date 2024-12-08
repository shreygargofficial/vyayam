import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { colors } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { commonStyle } from '../../constants/Style';

function WeightManagementCard() {
    const navigation = useNavigation()
    const tileClickHandler = (screen) => {
        navigation.navigate(screen)
    }
    return (
        <Pressable
            onPress={tileClickHandler.bind(this, 'TdeeAndChoice')}
            style={({ pressed }) => [weightCardStyles.cardFull, pressed && commonStyle.pressed]}>
            <Image
                source={require('../../assets/images/weightGoal/loveBody.jpg')}
                style={commonStyle.imageOverlay}
            />
            <View style={commonStyle.overlay}>
                <Text style={[commonStyle.overlayText]}>Want to Gain/Loss weight</Text>
            </View>
        </Pressable>
    );
}

export default WeightManagementCard;

const weightCardStyles = StyleSheet.create({
    cardFull: {
        height: 160,
        flex: 1,
        marginHorizontal: 30,
        borderRadius: 10,
        overflow: 'hidden',
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