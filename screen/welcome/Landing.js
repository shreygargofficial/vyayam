import { useLayoutEffect } from "react";
import { Button, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { userActions } from "../../slice/userSlice";

function Landing({ navigation }) {
    const dispatch = useDispatch()
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Button title="Logout" onPress={() => dispatch(userActions.deleteUserData())} />
        })
    }, [])
    return (
        <View>
            <Text>
                Landing Page
            </Text>

        </View>);
}

export default Landing;