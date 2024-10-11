import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";

function IconButton({ name, size, color, style, onPress }) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.pressed, styles.IconButton, style]}>
            <MaterialIcons name={name} size={size} color={color} />
        </Pressable>
    );
}

export default IconButton;

let styles = StyleSheet.create({
    pressed: {
        opacity: 0.5
    },
    IconButton: {
        padding: 10,
    }
})