import { StyleSheet, Text, View } from "react-native";
import ButtonSimple from "../../../ui/ButtonSimple";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { colors } from "../../../../constants/Colors";
import InputCustom from "../../../ui/InputCustom";
import { styles } from "./SignUp";

function Contact() {
    const navigation = useNavigation();
    const route = useRoute()
    const [userPhoneNumber, setUserPhoneNumber] = useState('')
    const [userPhoneNumberValidators, setUserPhoneNumberValidators] = useState("");
    const [userPhoneNumberValid, setUserPhoneNumberValid] = useState(false)
    const nextHandler = () => {
        navigation.navigate('metric', {
            ...route.params,
            userPhoneNumber: userPhoneNumber
        })
    }
    const onChangeValue = (val) => {
        let newVal = val.trim();
        if (newVal.includes(" "))
            return
        userPhoneNumberValidatorsFunction(newVal)
        setUserPhoneNumber(newVal)
    }

    const userPhoneNumberValidatorsFunction = (val) => {
        const phoneRegex = /^[4-9]{1}[0-9]{9,11}$/;


        if (!val) {
            setUserPhoneNumberValidators("Phone Number can't be empty");
            setUserPhoneNumberValid(false)
        }
        else if (!phoneRegex.test(val)) {
            setUserPhoneNumberValidators("Enter valid Phone Number!");
            setUserPhoneNumberValid(false)
        }
        else {
            setUserPhoneNumberValidators("")
            setUserPhoneNumberValid(true)
        }
    }
    return (
        <View style={styles.root}>
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
            </View>
            <View style={styles.buttonContainer}>
                {/* {userPhoneNumberValidators && <Text style={styles.errorText}>{userPhoneNumberValidators}</Text>} */}
                <ButtonSimple
                    disabled={!userPhoneNumberValid}
                    style={styles.button} title={'Next'}
                    onPress={nextHandler}
                    color={colors.white} />
            </View>
        </View>);
}

export default Contact;


export const emailStyles = StyleSheet.create({

})