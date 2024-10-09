import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../../constants/Colors";

function InputCustom({ placeholder, style, value, onChangeText, secureTextEntry = false }) {
    return (
        <View style={styles.inputWrapper}>
            <TextInput placeholder={placeholder} style={[styles.input, style]} value={value} onChangeText={onChangeText} secureTextEntry={secureTextEntry} />
        </View>
    );
}

export default InputCustom;

let styles = StyleSheet.create({
    inputWrapper: {
        padding: 10,
        marginVertical: 20,
        width: '100%'
    },
    input: {
        paddingHorizontal: 4,
        paddingVertical: 5,
        fontSize: 20,
        color: colors.black,

    }
})