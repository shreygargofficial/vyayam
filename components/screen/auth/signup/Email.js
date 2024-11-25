import { Image, StyleSheet, Text, View } from "react-native";
import ButtonSimple from "../../../ui/ButtonSimple";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { colors } from "../../../../constants/Colors";
import InputCustom from "../../../ui/InputCustom";
import { styles } from "./SignUp";
import { useDispatch } from "react-redux";
import { loaderActions } from "../../../../redux/slice/loaderSlice";
import Axios from "axios";
import { SERVERURL } from "../../../../constants/Environment";
import { styles as SignUpStyles } from "./SignUp";

function Email() {
    const navigation = useNavigation();
    const route = useRoute()
    const [emailAddress, setEmailAddress] = useState('')
    const dispatch = useDispatch()
    const [emailAddressValidators, setEmailAddressValidators] = useState("");
    const nextHandler = async () => {
        try {
            if (!emailAddressValidatorsFunction(emailAddress))
                return
            dispatch(loaderActions.setLoading(true))
            await Axios.get(`${SERVERURL}/emailExist/${emailAddress}`);
            navigation.navigate('contact', {
                ...route.params,
                emailAddress: emailAddress
            })
        }
        catch (e) {
            if (e.response)
                setEmailAddressValidators(e.response.data.message)
            else
                setEmailAddressValidators(e.message)
        }
        finally {
            dispatch(loaderActions.setLoading(false))
        }
    }
    const onChangeValue = (val) => {
        let newVal = val.trim();
        if (newVal.includes(" "))
            return

        setEmailAddress(newVal.toLowerCase())
    }

    const emailAddressValidatorsFunction = (val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (!val) {
            setEmailAddressValidators("Email can't be empty");
            return false;
        }
        else if (!emailRegex.test(val)) {
            setEmailAddressValidators("Enter valid Email!");
            return false;
        }
        else {
            setEmailAddressValidators("")
            return true;
        }
    }
    return (
        <View style={styles.root}>
            <View style={SignUpStyles.imageContainer}>
                <Image source={require('../../../../assets/images/logo.png')} style={SignUpStyles.image} />
            </View>
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
                {emailAddressValidators && <Text style={styles.errorText}>{emailAddressValidators}</Text>}
            </View>
            <View style={styles.buttonContainer}>

                <ButtonSimple
                    style={styles.button} title={'Next'}
                    onPress={nextHandler}
                    color={colors.white} />
            </View>
        </View>);
}

export default Email;


export const emailStyles = StyleSheet.create({

})