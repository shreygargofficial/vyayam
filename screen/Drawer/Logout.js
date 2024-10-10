import { StyleSheet, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../slice/userSlice";
import ButtonWithBorder from "../../components/ui/ButtonWithBorder";

function Logout() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const logoutHandler = () => {
        dispatch(userActions.deleteUserData())
    }
    return (
        <View style={styles.root}>
            <Text style={styles.text}>Are you sure to logout <Text style={styles.textUserName}>{user?.userData?.userData?.userName}</Text>?</Text>
            <ButtonWithBorder title={'Logout'} onPress={logoutHandler} />
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
    text: {
        marginVertical: 10,
        fontSize: 16,
        color: '#999'
    },
    textUserName: {
        fontWeight: '900',
        fontSize: 17
    }

})