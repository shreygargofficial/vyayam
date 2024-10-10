import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

function User() {
    const user = useSelector(state => state.user);
    console.log(user);
    return (<View style={styles.root}>
        <Text>
            {user?.userData?.userData?.userName}
        </Text>
        <Text>
            {user?.userData?.userData?.lastName}
        </Text>
        <Text>
            {user?.userData?.userData?.userName}
        </Text>
        <Text>
            {user?.userData?.userData?.emailAddress}
        </Text>
        <Text>
            {user?.userData?.userData?.age}
        </Text>
        <Text>
            {user?.userData?.userData?.height}
        </Text>
        {/* <Text>
            {user?.userData?.userData?.weight}
        </Text> */}
        <Text>
            {user?.userData?.userData?.targetedWeight}
        </Text>
    </View>);
}

export default User;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})