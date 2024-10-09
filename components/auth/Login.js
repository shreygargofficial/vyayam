import { Button, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { colors } from "../../constants/Colors";
import ButtonSimple from "../ui/ButtonSimple";
import InputCustom from "../ui/InputCustom";
import { useState } from "react";

function Login({ navigation }) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const onChangePassword = (val) => {
        setPassword(val)
    }
    const onChangeUseName = (val) => {
        setUserName(val)
    }
    const signUpToggler = () => {
        navigation.push('signup')
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >

                <View style={styles.form}>
                    <View style={styles.loginImage}>
                        <Image source={require('../../assets/images/loginIcon.png')} style={{ height: 50, width: 50 }} />
                    </View>
                    <Text style={styles.title}>Login</Text>
                    <InputCustom value={userName} onChangeText={onChangeUseName} style={styles.input} placeholder={'Username or Email Address'} />
                    <InputCustom value={password} onChangeText={onChangePassword} style={styles.input} placeholder={'Password'} secureTextEntry={true} />
                    <ButtonSimple title="Login" color={colors.white} onPress={() => { }} style={styles.button} />
                </View>
                <Pressable style={styles.signUpTextContainer} onPress={signUpToggler}>
                    <Text style={styles.signUpText}>New user? Sign up now</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

export default Login;

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryDark,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 40
    },
    form: {
        backgroundColor: colors.white,
        position: 'relative',
        padding: 30,
        width: '90%',
        alignItems: 'center',
        borderRadius: 10
    },
    loginImage: {
        position: 'absolute',
        top: -40,
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: '50%'
    },
    input: {
        borderBottomWidth: 1,
        color: colors.primaryDark,
        borderBottomColor: colors.grey
    },
    button: {
        borderRadius: 3,
        marginTop: 30,
    },
    signUpTextContainer: {
        padding: 10
    },
    signUpText: {
        color: colors.white,
        fontSize: 15
    }
})