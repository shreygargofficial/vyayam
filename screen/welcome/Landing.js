import { useLayoutEffect } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { userActions } from "../../slice/userSlice";

function Landing({ navigation }) {
    const dispatch = useDispatch()
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Button title="Logout" onPress={() => dispatch(userActions.logoutUser())} />
        })
    }, [])
    return (
        <View style={styles.root}>
            <Text>
                Landing Page
            </Text>

        </View>);
}

export default Landing;


const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})