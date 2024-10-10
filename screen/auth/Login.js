import { Button, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { colors } from "../../constants/Colors";
import ButtonSimple from "../../components/ui/ButtonSimple";
import InputCustom from "../../components/ui/InputCustom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActionCreator } from "../../utils/userActionsCreator";
import IconInputCustom from "../../components/ui/IconInputCustom";


function Login({ navigation }) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState("");
    const [userError, setUserError] = useState("");

    const dispatch = useDispatch()
    const mystate = useSelector(state => state.user)
    const onChangePassword = (val) => {
        if (password.length < 4) {
            setPasswordError('password should be greater than 4')
        }
        else {
            setPasswordError('')
        }
        setPassword(val)
    }

    const onChangeUseName = (val) => {

        if (userName.length < 4) {
            setPasswordError('username should be greater than 4')
        }
        else {
            setPasswordError('')
        }
        setUserName(val);

    }
    const signUpToggler = () => {
        navigation.push('signup')
    }
    const loginHandler = async () => {
        if (!userName) {
            setUserError("Enter username")
        }
        if (!password) {
            setPasswordError("Enter password")
        }

        else {
            dispatch(userActionCreator({ userName, password }))
        }
    }
    const disabledCondition = () => {
        if (!passwordError && !userError && userName && password) {
            return false;
        }
        return true;
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
                    {mystate.error && <Text style={{ color: 'red' }}>{JSON.stringify(mystate.error)}</Text>}
                    <IconInputCustom value={userName} onChangeText={onChangeUseName}
                        name={'user'}
                        style={styles.input}
                        placeholderTextColor={colors.grey}
                        placeholder={'Username or Email Address'}

                    />
                    <IconInputCustom
                        name={'lock'}
                        value={password}
                        onChangeText={onChangePassword}
                        placeholderTextColor={colors.grey}
                        style={styles.input}
                        placeholder={'Password'}
                        secureTextEntry={true} />
                    <ButtonSimple title="Login" color={colors.white} onPress={loginHandler} style={styles.button} disabled={disabledCondition()} />
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
        borderRadius: Platform.select({ ios: '50%', android: 40 })
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