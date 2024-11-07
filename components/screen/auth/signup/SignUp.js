import { StyleSheet, Text, View } from "react-native";
import ButtonSimple from "../../../ui/ButtonSimple";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { colors } from "../../../../constants/Colors";
import InputCustom from "../../../ui/InputCustom";

function SignUp() {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('')
    const [userValidators, setUserValidators] = useState("");
    const [userValid, setUserValid] = useState(false)
    const nextHandler = () => {
        navigation.navigate('name', {
            userName: userName
        })
    }
    const onChangeValue = (val) => {
        let newVal = val.trim();
        if (newVal.includes(" "))
            return
        userValidatorsFunction(newVal)
        setUserName(newVal)
    }

    const userValidatorsFunction = (val) => {
        if (val.length < 4 || val.length > 20) {
            setUserValidators("Enter character between 5 and 20 characters!");
            setUserValid(false)
        }
        else {
            setUserValid(true)
        }
    }
    return (
        <View style={styles.root}>
            <View style={styles.signUpTextContainer}>
                <Text style={styles.signUpText}>
                    Create User Name
                </Text>
            </View>
            <View style={styles.main}>
                {/* <Text style={styles.label}> User Name</Text> */}
                <InputCustom
                    name={'account-circle'}
                    placeholder={'UserName'}
                    onChangeText={onChangeValue}
                    style={styles.input}
                    size={30}
                    value={userName}
                />
            </View>
            <View style={styles.buttonContainer}>
                <ButtonSimple
                    disabled={!userValid}
                    style={styles.button} title={'Next'}
                    onPress={nextHandler}
                    color={colors.white} />
            </View>
        </View>);
}

export default SignUp;


export const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 40,
        paddingBottom: 40,
    },
    label: {
        // textAlign: 'center',
        fontSize: 20,

    },
    input: {
        borderWidth: 1,
        borderColor: colors.grey,
        paddingLeft: 20,
        height: 50,
        borderRadius: 10,
    },
    signUpTextContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'

    },
    signUpText: {
        fontSize: 30,
        fontWeight: '200'
    },
    main: {
        flex: 5,
        justifyContent: 'center'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    button: {
        alignItems: 'center',
        borderRadius: 10,
    },
    errorText: {
        color: colors.red,
        textAlign: 'center',
        margin: 4
    }
})