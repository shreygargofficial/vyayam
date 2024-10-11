import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "../../constants/Colors";

function CustomLoader() {
    return (
        <View style={styles.root}>
            <ActivityIndicator size="small" color={colors.primaryDark} />
        </View>
    );
}

export default CustomLoader;


let styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})