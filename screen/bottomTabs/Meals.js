import { View, Text, StyleSheet } from "react-native";

function Meals() {
    return (<View style={styles.root}>
        <Text>
            Meals
        </Text>
    </View>);
}

export default Meals;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})