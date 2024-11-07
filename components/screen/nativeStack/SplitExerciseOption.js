import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../constants/Colors";
import ButtonSimple from "../../ui/ButtonSimple";

export default function SplitExerciseOption({ navigation }) {
    function splitChoosen(splitType) {
        navigation.navigate(splitType)
    }
    return (<View style={styles.root}>
        <Image
            source={require('../../../assets/images/splits/chooseSplit.png')}
            style={styles.image}
        />
        <View style={styles.imageBelowTextContainer}>
            <Text style={styles.imageBelowTextHeading}>
                Want Our Designed Split?
            </Text>
            <Text style={styles.imageBelowTextDescription}>
                You can also create your own split based on your goals and requirement choose from the range of exercises and edit anytime
            </Text>
        </View>

        <View style={styles.rowFlex}>
            <ButtonSimple
                title={'Our Designed'}
                onPress={splitChoosen.bind(this, 'sampleSplit')}
                color={colors.white}
                style={styles.button}
            />
            <ButtonSimple
                title={'Your Custom'}
                onPress={splitChoosen.bind(this, 'customSplit')}
                color={colors.white}
                style={styles.button}
            />
        </View>

    </View>);
}



const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingHorizontal: 20
    },
    image: {
        width: '80%',
        maxWidth: 400,
        alignSelf: 'center',
        height: 300,
    },
    imageBelowTextContainer: {
        alignItems: 'center'
    },
    imageBelowTextHeading: {
        fontSize: 36,
        fontWeight: '200',
        textAlign: 'center',
        color: colors.black,
        marginVertical: 10
    },
    imageBelowTextDescription: {
        fontSize: 18,
        color: colors.black,
        lineHeight: 24,
        fontWeight: '300',
        textAlign: 'center',
        marginVertical: 26,
    },
    rowFlex: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,

    },
    button: {
        margin: 5,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 20

    },

})