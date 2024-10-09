import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/Colors";

function ButtonSimple({ onPress, title, color, style, disabled }) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed, disabled && styles.disabled, style]} disabled={disabled} >
            <Text style={[styles.text, { color: color }]}>{title}</Text>
        </Pressable>
    );
}

export default ButtonSimple;

let styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primaryDark,
        paddingVertical: 12,
        paddingHorizontal: 34
    },
    disabled: {
        backgroundColor: colors.grey,
    },
    text: {
        color: colors.white,
        textTransform: 'uppercase'
    },
    pressed: {
        opacity: 0.5
    }
})