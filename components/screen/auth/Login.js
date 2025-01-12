import { Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { colors } from "../../../constants/Colors";
import ButtonSimple from "../../ui/ButtonSimple";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserActionCreator } from "../../../redux/ActionCreators/userActionsCreator";
import IconInputCustom from "../../ui/IconInputCustom";


function Login({ navigation }) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState("");
    const [passwordHide, setPasswordHide] = useState(true)

    const dispatch = useDispatch()
    const mystate = useSelector(state => state.user)
    const onChangePassword = (val) => {
        setPassword(val)
    }
    const onChangeUseName = (val) => {
        setUserName(val);

    }
    const passwordShowToggler = (e) => {
        e.stopPropagation()
        setPasswordHide(prev => !prev)
    }
    const signUpToggler = () => {
        navigation.push('signup')
    }
    const loginHandler = async () => {
        if (!userName || userName.length < 3) {
            setLoginError("username should be more than 3 characters")
            return
        }
        if (!password || password.length < 3) {
            setLoginError("password should be more than 3 characters");
            return
        }

        else {
            setLoginError("")
            dispatch(loginUserActionCreator({ userName, password }))
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.form}>
                    <View style={styles.loginImage}>
                        <Image source={require('../../../assets/images/logo.png')} style={{ height: 120, width: 120, overflow: 'hidden' }} />
                    </View>
                    <Text style={styles.title}>Login</Text>
                    {mystate.error && <Text style={{ color: 'red' }}>{JSON.stringify(mystate.error)}</Text>}
                    {loginError && <Text style={{ color: 'red' }}>{loginError}</Text>}
                    <IconInputCustom value={userName} onChangeText={onChangeUseName}
                        name={'account-circle'}
                        style={styles.input}
                        placeholderTextColor={colors.grey}
                        placeholder={'Username or Email Address'}
                    />
                    <IconInputCustom
                        name={'key'}
                        value={password}
                        onChangeText={onChangePassword}
                        placeholderTextColor={colors.grey}
                        style={styles.input}
                        onPasswordToggle={passwordShowToggler}
                        placeholder={'Password'}
                        secureTextEntry={passwordHide}
                        name2={passwordHide ? 'eye' : 'eye-off'}
                    />
                    <ButtonSimple title="Login"
                        color={colors.white}
                        onPress={loginHandler}
                        style={styles.button}
                    />
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
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: '500',
        marginBottom: 40,
        fontFamily: 'caviar'
    },
    form: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.grey,
        position: 'relative',
        padding: 30,
        width: '90%',
        alignItems: 'center',
        borderRadius: 10
    },
    loginImage: {
        position: 'absolute',
        top: -90,
        borderRadius: 80,
        backgroundColor: colors.white,
        padding: 14,
        // borderRadius: Platform.select({ ios: '50%', android: 100 })
    },
    input: {
        borderBottomWidth: 1,
        color: colors.primaryDark,
        borderBottomColor: colors.grey
    },
    password: {

    },
    button: {
        borderRadius: 3,
        marginTop: 30,
    },
    signUpTextContainer: {
        padding: 10
    },
    signUpText: {
        color: colors.black,
        fontFamily: 'caviar',
        fontSize: 15
    }
})