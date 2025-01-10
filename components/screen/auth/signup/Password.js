import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import ButtonSimple from "../../../ui/ButtonSimple";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { colors } from "../../../../constants/Colors";
import InputCustom from "../../../ui/InputCustom";
import { styles } from "./SignUp";
import { useDispatch } from "react-redux";
import { SERVERURL } from "../../../../constants/Environment";
import { loaderActions } from "../../../../redux/slice/loaderSlice";
import { snackbarActions } from "../../../../redux/slice/snakbarSlice";
import { recipeActions } from "../../../../redux/slice/recipeSlice";
import axios from "axios";
import { styles as SignUpStyles } from "./SignUp";
import Feather from '@expo/vector-icons/Feather';

function Password() {
    const navigation = useNavigation();
    const route = useRoute()
    const [password, setPassword] = useState('')
    const [passwordValidators, setPasswordValidators] = useState("");
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const dispatch = useDispatch()
    const nextHandler = () => {

        let finalData = {
            ...route.params,
            password: password
        }
        async function getRegister() {

            try {
                dispatch(loaderActions.setLoading(true))
                let response = await axios.post(`${SERVERURL}/registerUser/`, finalData)
                dispatch(snackbarActions.enableSnakBar('Successfully Registered ! ' + finalData.userName))
                navigation.navigate('login')
            }
            catch (e) {
                if (e.response) {
                    dispatch(recipeActions.logError(e.response.data.message))
                    dispatch(snackbarActions.enableSnakBar('Error ' + e.response.data.message))
                }
                else {
                    dispatch(recipeActions.logError(e.message))
                    dispatch(snackbarActions.enableSnakBar('Error ' + e.message))
                }
            }
            finally {
                dispatch(loaderActions.setLoading(false))
            }


        }
        getRegister()
    }
    const onChangeValue = (val) => {
        let newVal = val.trim();
        passwordValidatorsFunction(newVal)
        setPassword(newVal)
    }
    const onPasswordToggle = () => {
        setPasswordVisible(prev => !prev)
    }
    const passwordValidatorsFunction = (val) => {
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,16}$/;

        if (!val) {
            setPasswordValidators("Password can't be empty");
            setPasswordValid(false)
        }
        else if (!passwordRegex.test(val)) {
            setPasswordValidators("Password should contain one special character and should be between 8 to 16 characters long ");
            setPasswordValid(false)
        }
        else {
            setPasswordValidators("")
            setPasswordValid(true)
        }
    }
    return (
        <View style={styles.root}>
            <View style={SignUpStyles.imageContainer}>
                <Image source={require('../../../../assets/images/logo.png')} style={SignUpStyles.image} />
            </View>
            <View style={styles.signUpTextContainer}>
                <Text style={styles.signUpText}>
                    Password
                </Text>
            </View>
            <View style={[styles.main]}>
                <View style={passwordStyles.flex}>
                    <InputCustom
                        name={'account-circle'}
                        placeholder={'Password'}
                        onChangeText={onChangeValue}
                        secureTextEntry={!passwordVisible}
                        style={[styles.input, passwordStyles.input]}
                        size={30}
                        value={password}
                    />
                    <Pressable onPress={onPasswordToggle} >
                        <Feather name={!passwordVisible ? 'eye' : 'eye-off'} size={25} style={passwordStyles.icon} color={colors.primary} />
                    </Pressable>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                {passwordValidators && <Text style={styles.errorText}>{passwordValidators}</Text>}
                <ButtonSimple
                    disabled={!passwordValid}
                    style={styles.button} title={'Next'}
                    onPress={nextHandler}
                    color={colors.white} />
            </View>
        </View>);
}

export default Password;


export const passwordStyles = StyleSheet.create({
    flex: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        marginLeft: -20,
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})