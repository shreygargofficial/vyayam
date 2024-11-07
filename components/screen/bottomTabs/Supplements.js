import { View, Text, StyleSheet } from "react-native";

function Supplements() {
    return (<View style={styles.root}>
        <Text>
            Supplements
        </Text>
    </View>);
}

export default Supplements;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})