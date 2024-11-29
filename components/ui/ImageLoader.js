import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "../../constants/Colors";

function ImageLoader({ style }) {
    return (
        <View style={[styles.root, style]}>
            <ActivityIndicator
                color={colors.white}
            />
        </View>
    );
}

export default ImageLoader;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 10,
        justifyContent: "center",
        alignItems: 'center'
    }
})