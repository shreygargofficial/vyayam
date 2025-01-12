import { Image, StyleSheet, Text, View } from "react-native";
import ButtonSimple from "../../../ui/ButtonSimple";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { colors } from "../../../../constants/Colors";
import InputCustom from "../../../ui/InputCustom";
import Axios from "axios";
import { SERVERURL } from "../../../../constants/Environment";
import { useDispatch } from "react-redux";
import { loaderActions } from "../../../../redux/slice/loaderSlice";

function SignUp() {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('');
    const dispatch = useDispatch();
    const [userValidators, setUserValidators] = useState("");
    const nextHandler = async () => {
        try {
            if (userName.length < 4 || userName.length > 20) {
                setUserValidators("Enter character between 5 and 20 characters!");
                return;
            }
            dispatch(loaderActions.setLoading(true))
            setUserValidators("");
            await Axios.get(`${SERVERURL}/userNameExist/${userName}`);
            navigation.navigate('name', {
                userName: userName
            })
        }
        catch (e) {
            if (e.response)
                setUserValidators(e.response.data.message)
            else
                setUserValidators(e.message)
        }
        finally {
            dispatch(loaderActions.setLoading(false))
        }
    }
    const onChangeValue = (val) => {
        let newVal = val.trim();
        if (newVal.includes(" "))
            return
        setUserName(newVal)
    }

    return (
        <View style={styles.root}>
            <View style={styles.imageContainer}>
                <Image source={require('../../../../assets/images/logo.png')} style={styles.image} />
            </View>
            <View style={styles.signUpTextContainer}>
                <Text style={styles.signUpText}>
                    Choose Username!
                </Text>
            </View>
            <View style={styles.main}>
                {/* <Text style={styles.label}> User Name</Text> */}
                <InputCustom
                    name={'account-circle'}
                    placeholder={'username'}
                    onChangeText={onChangeValue}
                    style={styles.input}
                    size={30}
                    value={userName}
                />
                <Text style={{ color: colors.red, textAlign: 'center' }}>{userValidators}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <ButtonSimple
                    style={styles.button} title={'Next'}
                    onPress={nextHandler}
                    color={colors.white} />
            </View>
        </View>);
}

export default SignUp;


export const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 40,
        paddingBottom: 40,
        backgroundColor: colors.white
    },
    label: {
        fontSize: 20,

    },
    input: {
        borderWidth: 1,
        borderColor: colors.grey,
        paddingLeft: 20,
        height: 50,
        borderRadius: 5,
    },
    imageContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    image: {
        width: 140,
        height: 140,
    },
    signUpTextContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'

    },
    signUpText: {
        fontSize: 30,
        fontWeight: '200'
    },
    main: {
        flex: 3,
        marginTop: 50,
        justifyContent: 'flex-start'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    button: {
        alignItems: 'center',
        borderRadius: 10,
    },
    errorText: {
        color: colors.red,
        textAlign: 'center',
        margin: 4
    }
})