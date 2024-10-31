import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "../../constants/Colors";

function CustomLoader() {
    return (
        <View style={styles.root}>
            <ActivityIndicator size="medium" color={colors.primaryDark} />
        </View>
    );
}

export default CustomLoader;


let styles = StyleSheet.create({
    root: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 100,
        backgroundColor: colors.white,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
})