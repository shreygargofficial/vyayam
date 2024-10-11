import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/Colors";

function ButtonWithBorder({ onPress, title, color, style, disabled }) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed, disabled && styles.disabled, style]} disabled={disabled} >
            <Text style={[styles.text, { color: color }]}>{title}</Text>
        </Pressable>
    );
}

export default ButtonWithBorder;

let styles = StyleSheet.create({
    button: {
        borderColor: colors.primaryDark,
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 34
    },
    disabled: {
        backgroundColor: colors.grey,
    },
    text: {
        color: colors.primary,
        textTransform: 'uppercase'
    },
    pressed: {
        opacity: 0.2
    }
})