import { StyleSheet, Text, View } from "react-native";
import ButtonSimple from "../../../components/ui/ButtonSimple";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { colors } from "../../../constants/Colors";
import InputCustom from "../../../components/ui/InputCustom";
import { styles } from "./SignUp";
import { useDispatch } from "react-redux";
import { SERVERURL } from "../../../constants/Environment";
import { loaderActions } from "../../../slice/loaderSlice";
import { snackbarActions } from "../../../slice/snakbarSlice";
import { mealActions } from "../../../slice/MealsSlice";
import axios from "axios";

function Password() {
    const navigation = useNavigation();
    const route = useRoute()
    const [password, setPassword] = useState('')
    const [passwordValidators, setPasswordValidators] = useState("");
    const [passwordValid, setPasswordValid] = useState(false);
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
                    dispatch(mealActions.logError(e.response.data.message))
                    dispatch(snackbarActions.enableSnakBar('Error ' + e.response.data.message))
                }
                else {
                    dispatch(mealActions.logError(e.message))
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
            <View style={styles.signUpTextContainer}>
                <Text style={styles.signUpText}>
                    Password
                </Text>
            </View>
            <View style={styles.main}>
                <InputCustom
                    name={'account-circle'}
                    placeholder={'Password'}
                    onChangeText={onChangeValue}
                    secureTextEntry={true}
                    style={styles.input}
                    size={30}
                    value={password}
                />
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

})