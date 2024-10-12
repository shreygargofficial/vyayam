import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/Colors";
import ButtonWithBorder from "../ui/ButtonWithBorder";
import { useDispatch } from "react-redux";
import { logoutActionCreator } from "../../ActionCreators/userActionsCreator";

function UserInfo({ defaultValueUser: { firstName, lastName, gender, bio, targetedWeight, birthDate } }) {
    let dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logoutActionCreator())
    }

    return (

        <View style={styles.root}>
            <View style={styles.infoContainer}>
                <Text style={styles.text}>First Name : {firstName}</Text>
                <Text style={styles.text}>Last Name : {lastName}</Text>
                <Text style={styles.text}>Gener : {gender}</Text>
                <Text style={styles.text}>Bio : {bio}</Text>
                <Text style={styles.text}>Targeted Weight : {targetedWeight}</Text>
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
    }
})