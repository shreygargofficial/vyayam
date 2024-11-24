import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Pressable, Text } from "react-native";

function ButtonWithIcon({ onPress, name, title, color, size, textStyle, iconStyle, buttonStyle }) {
    return (
        <Pressable onPress={onPress} style={[styles.buttonStyle, buttonStyle]}>
            <MaterialIcons name={name} size={size} color={color} style={iconStyle} />
            <Text style={[{ color: color }, textStyle]}>{title}</Text>
        </Pressable>
    );
}

export default ButtonWithIcon;


const styles = StyleSheet.create({
    buttonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})