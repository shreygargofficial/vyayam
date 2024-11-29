import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../../constants/Colors";
import { MaterialIcons } from '@expo/vector-icons'


function IconInputCustom({ placeholder, style, styleWrapper, value, onChangeText, secureTextEntry = false, placeholderTextColor, name, size = 25, ...props }) {
    return (
        <View style={[styles.inputWrapper, styleWrapper]}>
            <MaterialIcons name={name} size={size} style={styles.icon} color={colors.primary} />
            <TextInput placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                style={[styles.input, style]}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                {...props}
            />
        </View>
    );
}

export default IconInputCustom;

let styles = StyleSheet.create({
    inputWrapper: {
        marginVertical: 20,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',


    },
    icon: {
        marginRight: 10,
        flex: 1
    },
    input: {
        paddingHorizontal: 4,
        paddingVertical: 5,
        fontSize: 16,
        flex: 9,
        color: colors.black,

    }
})