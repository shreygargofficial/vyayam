import { StyleSheet, Text, View } from "react-native";
import ButtonSimple from "../../../components/ui/ButtonSimple";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { colors } from "../../../constants/Colors";
import InputCustom from "../../../components/ui/InputCustom";
import { styles } from "./SignUp";

function Email() {
    const navigation = useNavigation();
    const route = useRoute()
    const [emailAddress, setEmailAddress] = useState('')
    const [emailAddressValidators, setEmailAddressValidators] = useState("");
    const [emailAddressValid, setEmailAddressValid] = useState(false)
    const nextHandler = () => {
        navigation.navigate('contact', {
            ...route.params,
            emailAddress: emailAddress
        })
    }
    const onChangeValue = (val) => {
        let newVal = val.trim();
        if (newVal.includes(" "))
            return
        emailAddressValidatorsFunction(newVal)
        setEmailAddress(newVal)
    }

    const emailAddressValidatorsFunction = (val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


        if (!val) {
            setEmailAddressValidators("Email can't be empty");
            setEmailAddressValid(false)
        }
        else if (!emailRegex.test(val)) {
            setEmailAddressValidators("Enter valid Email!");
            setEmailAddressValid(false)
        }
        else {
            setEmailAddressValidators("")
            setEmailAddressValid(true)
        }
    }
    return (
        <View style={styles.root}>
            <View style={styles.signUpTextContainer}>
                <Text style={styles.signUpText}>
                    Email Address
                </Text>
            </View>
            <View style={styles.main}>
                <InputCustom
                    name={'account-circle'}
                    placeholder={'Email'}
                    onChangeText={onChangeValue}
                    style={styles.input}
                    size={30}
                    value={emailAddress}
                />
            </View>
            <View style={styles.buttonContainer}>
                {emailAddressValidators && <Text style={styles.errorText}>{emailAddressValidators}</Text>}
                <ButtonSimple
                    disabled={!emailAddressValid}
                    style={styles.button} title={'Next'}
                    onPress={nextHandler}
                    color={colors.white} />
            </View>
        </View>);
}

export default Email;


export const emailStyles = StyleSheet.create({

})