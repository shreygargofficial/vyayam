import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import ButtonSimple from "../../../ui/ButtonSimple";
import { colors } from "../../../../constants/Colors";
import { useDispatch } from "react-redux";
import { TextInput } from "react-native";
import { generateOTP, validateOTP } from "../../../../redux/ActionCreators/ValidateActionCreator";

export default function ({ route, navigation }) {

    const { emailAddress } = route.params;
    const [disabledButton, setDisabledButton] = useState(true)
    const dispatch = useDispatch()
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [emailAddressValidators, setEmailAddressValidators] = useState("");
    const inputRefs = useRef(new Array(6).fill(''));

    const nextHandler = async () => {
        try {
            let response = await dispatch(validateOTP(emailAddress, otp.join('')));
            if (response.data) {
                navigation.navigate('contact', {
                    ...route.params,
                })
            }
            else {
                setEmailAddressValidators("Incorrect OTP!")
            }
        }
        catch (e) {
            if (e.response)
                setEmailAddressValidators(e.response.data.message)
            else
                setEmailAddressValidators(e.message)
        }

    }

    const otpValueChanger = (val, index) => {
        setOtp(prev => {
            let arr = [...prev];
            arr[index] = val;
            return arr;
        })

    }
    const keyPressOtp = (e, index) => {
        e.persist();
        if (index >= 0 && index < otp.length && e.nativeEvent) {
            if (e.nativeEvent.key == "Backspace") {
                if (!otp[index] && index != 0) {
                    inputRefs.current[index - 1].focus()

                }
            }
            else {
                if (otp[index] && index != (otp.length - 1) && !isNaN(e.nativeEvent.key)) {
                    inputRefs.current[index + 1].focus()
                    setOtp(prev => {
                        let arr = [...prev];
                        arr[index + 1] = e.nativeEvent.key;
                        return arr;
                    })

                }
            }
        }

    }
    const onResend = async () => {
        dispatch(generateOTP(emailAddress, setEmailAddressValidators))
        setDisabledButton(true)
        timerFunction();
    }

    const timerFunction = () => {
        const timerFunction = setTimeout(() => {
            setDisabledButton(false);
            clearTimeout(timerFunction)
        }, 1000 * 60 * 5);

        return () => {
            clearTimeout(timerFunction);
        }
    }


    useEffect(() => {
        timerFunction();
    }, [])


    return (
        <View style={styles.root}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Enter OTP,
                </Text>
                <Text style={styles.headerText}>
                    Sent to {emailAddress}
                </Text>

            </View>
            <View style={styles.containerOtp}>
                {otp.map((ele, key) => {
                    return (
                        <TextInput
                            ref={(ref) => (inputRefs.current[key] = ref)}
                            maxLength={1}
                            onKeyPress={(e) => keyPressOtp(e, key)}
                            keyboardType="numeric"
                            onChangeText={(val) => otpValueChanger(val, key)}
                            style={styles.inputOTP}
                            value={ele}
                            key={key} />
                    )
                })}

            </View>
            <View style={styles.validateButtonContainer}>
                <ButtonSimple
                    style={styles.validateButton}
                    title={'Validate'}
                    onPress={nextHandler}
                    color={colors.white}
                />
                {emailAddressValidators && <Text style={styles.errorText}>{emailAddressValidators}</Text>}
            </View>
            <Text style={styles.validityText}>The OTP is valid for 5 minutes</Text>
            <ButtonSimple
                title={'Resend'}
                color={disabledButton ? colors.grey : colors.primary}
                onPress={onResend}
                disabled={disabledButton}
                style={styles.resendBtn}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 20,
    },
    header: {
        flex: 1
    },
    headerText: {
        fontSize: 20,
        lineHeight: 30,
        fontWeight: '200',
        letterSpacing: 1,
        textAlign: 'center'
    },
    errorText: {
        color: colors.red,
        marginTop: 20,
        textAlign: 'center'
    },
    disabledBtn: {
        color: colors.grey
    },
    validateButtonContainer: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    validityText: {
        textAlign: 'center',
        fontSize: 12,

    },
    containerOtp: {
        flex: 4,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'

    },
    inputOTP: {
        width: 50,
        height: 50,
        textAlign: 'center',
        marginHorizontal: 2,
        borderColor: colors.grey,
        borderWidth: 1,
    },
    resendBtn: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: 200,
        backgroundColor: 'transparent'
    }
})