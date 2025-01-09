import { StyleSheet, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logoutActionCreator } from "../../../redux/ActionCreators/userActionsCreator";
import ButtonWithBorder from "../../ui/ButtonWithBorder";

function Logout() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const logoutHandler = () => {
        dispatch(logoutActionCreator())
    }
    return (
        <View style={styles.root}>
            <Text style={styles.text}>Are you sure to logout <Text style={styles.textUserName}>{user?.userData?.userName}</Text>?</Text>
            <ButtonWithBorder style={styles.button} title={'Logout'} onPress={logoutHandler} />
        </View>
    );
}

export default Logout;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        paddingVertical: 8,
        borderRadius: 4,
        marginTop: 20,
        fontFamily: 'caviar',
        paddingHorizontal: 18
    },
    text: {
        marginVertical: 10,
        fontSize: 16,
        color: '#999',
        fontFamily: 'caviar',
    },
    textUserName: {
        fontWeight: '900',
        fontSize: 17,
        fontFamily: 'caviarb',
    }

})