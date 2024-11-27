import { StyleSheet, Text, View, Image } from "react-native";
import ButtonSimple from "../../../ui/ButtonSimple";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { colors } from "../../../../constants/Colors";
import InputCustom from "../../../ui/InputCustom";
import { styles } from "./SignUp";
import { loaderActions } from "../../../../redux/slice/loaderSlice";
import { SERVERURL } from "../../../../constants/Environment";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { styles as SignUpStyles } from "./SignUp";
import { Button } from "react-native";

function Contact() {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const [userPhoneNumber, setUserPhoneNumber] = useState('')
    const [userPhoneNumberValidators, setUserPhoneNumberValidators] = useState("");


    const nextHandler = async () => {
        try {
            if (!userPhoneNumberValidatorsFunction(userPhoneNumber))
                return
            dispatch(loaderActions.setLoading(true))
            await Axios.get(`${SERVERURL}/userPhoneExist/${userPhoneNumber}`);
            navigation.navigate('metric', {
                ...route.params,
                userPhoneNumber: userPhoneNumber
            })

        }
        catch (e) {
            if (e.response)
                setUserPhoneNumberValidators(e.response.data.message)
            else
                setUserPhoneNumberValidators(e.message)
        }
        finally {
            dispatch(loaderActions.setLoading(false))
        }
    }
    const onChangeValue = (val) => {
        let newVal = val.trim();
        if (newVal.includes(" "))
            return
        setUserPhoneNumber(newVal)
    }

    const userPhoneNumberValidatorsFunction = (val) => {
        const phoneRegex = /^[4-9]{1}[0-9]{9,11}$/;


        if (!val) {
            setUserPhoneNumberValidators("Phone Number can't be empty");
            return false
        }
        else if (!phoneRegex.test(val)) {
            setUserPhoneNumberValidators("Enter valid Phone Number!");
            return false
        }
        else {
            setUserPhoneNumberValidators("");
            return true
        }
    }
    return (
        <View style={styles.root}>
            <View style={SignUpStyles.imageContainer}>
                <Image source={require('../../../../assets/images/logo.png')} style={SignUpStyles.image} />
            </View>
            <View style={styles.signUpTextContainer}>
                <Text style={styles.signUpText}>
                    Phone Number
                </Text>
            </View>
            <View style={styles.main}>
                <InputCustom
                    name={'account-circle'}
                    placeholder={'Phone Number'}
                    // keyboardType={'numeric'}
                    onChangeText={onChangeValue}
                    style={styles.input}
                    size={30}
                    value={userPhoneNumber}
                />
                {userPhoneNumberValidators && <Text style={styles.errorText}>{userPhoneNumberValidators}</Text>}
            </View>
            <View style={styles.buttonContainer}>
                <ButtonSimple
                    style={styles.button} title={'Next'}
                    onPress={nextHandler}
                    color={colors.white} />
            </View>
        </View>);
}

export default Contact;


export const emailStyles = StyleSheet.create({

})