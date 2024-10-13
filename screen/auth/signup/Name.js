import { StyleSheet, Text, View } from "react-native";
import ButtonSimple from "../../../components/ui/ButtonSimple";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { colors } from "../../../constants/Colors";
import InputCustom from "../../../components/ui/InputCustom";
import { styles as SignUpStyles } from "./SignUp";

function Name() {
    const navigation = useNavigation();
    const route = useRoute()
    const [name, setName] = useState({
        firstName: '',
        lastName: ''
    })
    const [nameValidators, setNameValidators] = useState("");
    const [nameValid, setNameValid] = useState({
        firstName: false,
        lastName: false
    })
    const nextHandler = () => {
        navigation.navigate('email', {
            userName: route.params.userName,
            firstName: name.firstName,
            lastName: name.lastName
        })
    }
    const onChangeValue = (val, field) => {

        let newVal = val.trim();

        if (newVal.includes(" "))
            return

        setName(prev => ({ ...prev, [field]: newVal }))


        nameValidatorsFunction(val, field)
    }

    const nameValidatorsFunction = (val, field) => {
        const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/g;
        if (val.length < 4 || val.length > 20) {
            setNameValidators("Enter character between 4 and 20 characters!");
            setNameValid(prev => ({ ...prev, [field]: false }))
        }
        else if (specialCharPattern.test(val)) {
            setNameValidators("Special Character no allowed!");
            setNameValid(prev => ({ ...prev, [field]: false }))
        }
        else {
            setNameValidators('')
            setNameValid(prev => ({ ...prev, [field]: true }))
        }
    }
    return (
        <View style={SignUpStyles.root}>
            <View style={SignUpStyles.signUpTextContainer}>
                <Text style={SignUpStyles.signUpText}>
                    Enter First and Last Name
                </Text>
            </View>
            <View style={SignUpStyles.main}>
                <InputCustom
                    name={'account-circle'}
                    placeholder={'First Name'}
                    onChangeText={(val) => onChangeValue(val, 'firstName')}
                    style={SignUpStyles.input}
                    size={30}
                    value={name.firstName}
                />
                <InputCustom
                    name={'account-circle'}
                    placeholder={'Last Name'}
                    onChangeText={(val) => onChangeValue(val, 'lastName')}
                    style={SignUpStyles.input}
                    size={30}
                    value={name.lastName}
                />
            </View>
            <View style={SignUpStyles.buttonContainer}>
                <ButtonSimple
                    disabled={!nameValid.firstName || !nameValid.lastName}
                    style={SignUpStyles.button} title={'Next'}
                    onPress={nextHandler}
                    color={colors.white} />
            </View>
        </View>);
}

export default Name;


const nameStyles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 40,
        paddingBottom: 40,
    },

})