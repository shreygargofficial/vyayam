import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/Colors";
import ButtonWithBorder from "../ui/ButtonWithBorder";
import { useDispatch } from "react-redux";
import { logoutActionCreator } from "../../redux/ActionCreators/userActionsCreator";

function UserInfo({ defaultValueUser: { firstName, lastName, gender, bio, targetedWeight, birthDate, height, weight } }) {
    let dispatch = useDispatch()
    const BMI = ((weight * 10000) / (height * height)).toFixed(1)

    const logoutHandler = () => {
        dispatch(logoutActionCreator())
    }
    let classBMI =
        BMI < 18.5 ? 'underweight' :
            (BMI >= 18.5 && BMI <= 24.9) ? 'normal' :
                (BMI >= 25 && BMI <= 29.9) ? 'overweight' :
                    (BMI >= 30 && BMI <= 34.9) ? 'obese class 1 (moderate)' :
                        (BMI >= 35 && BMI <= 39.9) ? 'obese class 2 (severe)' :
                            'obese class 3 (very severe)';

    return (

        <View style={styles.root}>
            <View style={styles.infoContainer}>
                <Text style={styles.text}>First Name : {firstName}</Text>
                <Text style={styles.text}>Last Name : {lastName}</Text>
                <Text style={styles.text}>Gener : {gender}</Text>
                <Text style={styles.text}>Bio : {bio}</Text>
                <Text style={styles.text}>Height: {height}cm</Text>
                <Text style={styles.text}>Weight: {weight}kg</Text>
                <Text style={[styles.text]}>BMI: <Text style={styles[classBMI]}>{BMI} </Text><Text style={[styles[classBMI], classBMI]}>({classBMI})</Text></Text>
                <Text style={styles.text}>Targeted Weight : {targetedWeight}kg</Text>
                <Text style={styles.text}>Age : {new Date().getFullYear() - birthDate}</Text>
            </View>
            <View style={styles.logoutContainer}>
                <Text style={styles.text}>Do you want to logout?</Text>
                <ButtonWithBorder title={'logout'} onPress={logoutHandler} color={colors.primaryDark} style={styles.buttonLogout} />
            </View>
        </View>

    );
}

export default UserInfo;

const styles = StyleSheet.create({
    root: {
    },

    infoContainer: {
        // paddingHorizontal: 30,
        marginTop: 50,

    },
    text: {
        padding: 10,
        fontSize: 18,
        fontWeight: '200',
        color: colors.primaryDark
    },
    logoutContainer: {
        marginTop: 30,

    },
    buttonLogout: {
        marginTop: 10,
        marginLeft: 10,
        alignSelf: 'flex-start',
        paddingVertical: 10,
        paddingHorizontal: 20
        // width: '50%'
    },
    normal: {
        color: colors.green
    },
    underweight: {
        color: colors.red
    },
    overweight: {
        color: colors.red
    },
    classBMI: {
        fontSize: 10,
    },
    'obese class 1 (moderate)': {
        color: colors.red
    },
    'obese class 2 (severe)': {
        color: colors.red
    },
    'obese class 3 (very severe)': {
        color: colors.red
    },
})