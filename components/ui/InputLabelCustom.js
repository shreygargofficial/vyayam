import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../constants/Colors";


function InputLabelCustom({ placeholder, style, value, onChangeText, secureTextEntry = false, placeholderTextColor, label, labelColor, keyboardType, numberOfLines, multiline = false }) {
    return (
        <View style={styles.inputWrapper}>
            <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
            <TextInput placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                style={[styles.input, style, multiline && styles.textArea]}
                value={value}
                multiline={multiline}
                keyboardType={keyboardType}
                onChangeText={onChangeText}
                numberOfLines={numberOfLines}
                secureTextEntry={secureTextEntry} />
        </View>
    );
}

export default InputLabelCustom;

let styles = StyleSheet.create({
    inputWrapper: {
        marginVertical: 20,
        width: '100%',


    },
    label: {

    },
    input: {
        marginTop: 5,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        color: colors.black,

    },
    textArea: {
        height: 100,
    }
})