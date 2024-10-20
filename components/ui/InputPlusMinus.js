import { TextInput, View, StyleSheet, Text } from "react-native";
import IconButton from "./IconButton";
import { colors } from "../../constants/Colors";
import { useState } from "react";

function InputPlusMinus(
    {
        color = colors.white,
        size = 10,
        placeholder,
        onChangeText,
        inputStyle,
        mainStyle,
        steps = 1,
        label,
        value = 0
    }
) {

    const onPressMinus = () => {
        if (value == "" || value == '0' || isNaN(value))
            onChangeText(0)
        else
            onChangeText(parseFloat(value) - steps)
    }
    const onPressPlus = () => {
        if (value == "" || isNaN(value))
            onChangeText(steps)
        else
            onChangeText(parseFloat(value) + steps)
    }
    return (
        <View style={[styles.root, mainStyle]}>
            <View style={styles.rowFlex}>
                <Text style={styles.label}>{label}: </Text>
                <View style={[styles.rowFlex, styles.buttonAndInputContainer]}>
                    <View style={styles.buttonContainer}>
                        <IconButton
                            name="more-horiz"
                            size={size}
                            color={color}
                            onPress={onPressMinus}
                            style={styles.icon}
                        />
                    </View>
                    <TextInput
                        placeholder={placeholder}
                        onChangeText={onChangeText}
                        value={value.toString()}
                        style={[styles.input, inputStyle]}
                        keyboardType="numeric" />
                    <View style={styles.buttonContainer}>
                        <IconButton
                            name="add"
                            size={size}
                            color={color}
                            onPress={onPressPlus}
                            style={styles.icon}
                        />
                    </View>
                </View>

            </View>
        </View>
    );
}

export default InputPlusMinus;

const styles = StyleSheet.create({
    root: {
        marginTop: 30,
    },
    rowFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonAndInputContainer: {
        flex: 4,
    },
    label: {
        flex: 3,
        fontWeight: '600'
    },
    buttonContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primaryDark,
        // flex: 1
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        flex: 8,
        borderRadius: 10,
        marginHorizontal: 5,
        height: 30,
        paddingLeft: 10,
        borderColor: colors.grey,
        borderWidth: 1,

    }
})