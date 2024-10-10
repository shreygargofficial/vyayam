import { View, Text, StyleSheet, Image, ScrollView, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../constants/Colors";
import { useState, useEffect } from "react";
import InputLabelCustom from "../../components/ui/InputLabelCustom";
import ButtonSimple from "../../components/ui/ButtonSimple";
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateUserCreator } from "../../utils/userActionsCreator";


const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    birthDate: yup.number().typeError('Birth Date must be a number').required('Birth is required').positive().integer(),
    height: yup.number().typeError('Height must be a number').required('Height is required').positive(),
    targetedWeight: yup.number().typeError('Targeted Weight must be a number').required('Targeted weight is required').positive(),
    bio: yup.string().max(50, "Bio should not more than 50 character"),
    gender: yup.string().oneOf(['male', 'female', 'others'], 'Gender must be either male or female').required('Gender is required'),
});

function User() {
    const user = useSelector(state => state.user);
    const [scrollViewPadding, setScrollViewPadding] = useState(100)
    const dispatch = useDispatch()
    const defaultValueUser = {
        firstName: user?.userData?.firstName || "",
        lastName: user?.userData?.lastName || "",
        birthDate: user?.userData?.birthDate || 0,
        height: user?.userData?.height || 0,
        targetedWeight: user?.userData?.targetedWeight || 0,
        bio: user?.userData?.bio || "",
        gender: user?.userData?.gender || ""


    };

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValueUser
    });
    const randomFolder = user?.userData?.gender ? user?.userData?.gender : 'others'
    const images = {
        'male': require('../../assets/images/avatar/male/3.png'),
        'female': require('../../assets/images/avatar/female/3.png'),
        'others': require('../../assets/images/avatar/others/3.png')
    }



    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
            setScrollViewPadding(event.endCoordinates.height); // Set padding based on keyboard height
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setScrollViewPadding(100); // Reset padding when keyboard hides
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);


    const submitHandler = (val) => {
        dispatch(updateUserCreator(user?.userData?.userName, val))

    }
    return (
        <ScrollView
            style={styles.root}
            alwaysBounceVertical={false}
            contentContainerStyle={{ paddingBottom: scrollViewPadding }}>
            <View style={styles.rowFlexing}>
                <View style={styles.imageContainer}>
                    <Image source={images[randomFolder]} style={styles.image} />
                </View>
                <View style={styles.unEditTextContainer}>
                    <Text style={[styles.userName, styles.lineHeight]}>
                        {user?.userData?.userName}
                    </Text>
                    <Text style={styles.emailAddress}>
                        {user?.userData?.emailAddress}
                    </Text>
                    <Text style={styles.phoneNumber}>
                        {user?.userData?.userPhoneNumber}
                    </Text>
                </View>
            </View>
            <View style={styles.canEditTextContainer}>
                <Text style={styles.basicInfoText}>Basic Information</Text>
                <View style={styles.inputsContainer}>
                    <Controller
                        name="bio"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <InputLabelCustom
                                value={value}
                                onChangeText={onChange}
                                label={'Bio'}
                                style={styles.LabelInput}
                                numberOfLines={4}
                                multiline={true}
                                labelColor={colors.primaryDark} />
                        )}
                    />
                    {errors.bio && <Text style={styles.errorText}>{errors.bio.message}</Text>}
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <InputLabelCustom
                                value={value}
                                onChangeText={onChange}
                                label={'Gender*'}
                                style={styles.LabelInput}
                                labelColor={colors.primaryDark} />
                        )}
                    />
                    {errors.gender && <Text style={styles.errorText}>{errors.gender.message}</Text>}
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <InputLabelCustom
                                value={value}
                                label={'FirstName*'}
                                onChangeText={onChange}
                                style={styles.LabelInput}
                                labelColor={colors.primaryDark} />
                        )}
                    />
                    {errors.firstName && <Text style={styles.errorText}>{errors.firstName.message}</Text>}
                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <InputLabelCustom
                                value={value}
                                label={'LastName*'}
                                onChangeText={onChange}
                                style={styles.LabelInput}
                                labelColor={colors.primaryDark} />
                        )}
                    />
                    {errors.lastName && <Text style={styles.errorText}>{errors.lastName.message}</Text>}
                    <Controller
                        name="birthDate"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <InputLabelCustom
                                keyboardType={"numeric"}
                                value={value?.toString()}
                                label={'Birth Year*'}
                                onChangeText={onChange}
                                style={styles.LabelInput}
                                labelColor={colors.primaryDark} />
                        )}
                    />
                    {errors.birthDate && <Text style={styles.errorText}>{errors.birthDate.message}</Text>}
                    <Controller
                        name="height"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <InputLabelCustom
                                value={value?.toString()}
                                keyboardType={"numeric"}
                                onChangeText={onChange}
                                label={'Height(cm)*'}
                                style={styles.LabelInput}
                                labelColor={colors.primaryDark} />
                        )}
                    />
                    {errors.height && <Text style={styles.errorText}>{errors.height.message}</Text>}
                    <Controller
                        name="targetedWeight"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <InputLabelCustom
                                value={value?.toString()}
                                keyboardType={"numeric"}
                                onChangeText={onChange}
                                label={'Targeted Weight(kg)*'}
                                style={styles.LabelInput}
                                labelColor={colors.primaryDark} />
                        )}
                    />
                    {errors.targetedWeight && <Text style={styles.errorText}>{errors.targetedWeight.message}</Text>}
                    <ButtonSimple
                        title={'Submit'}
                        color={colors.white}
                        onPress={handleSubmit(submitHandler)}
                        style={styles.button} />
                    {user?.error && <Text style={[styles.errorText, { textAlign: 'center', marginTop: 10 }]}>{user?.error}</Text>}
                </View>
            </View>

        </ScrollView>);
}

export default User;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingHorizontal: 30,
    },
    lineHeight: {
        lineHeight: 50,
    },
    rowFlexing: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 50,
    },
    imageContainer: {
        flex: 3,
        overflow: 'hidden',
    },
    image: {
        width: 80,
        height: 80
    },

    unEditTextContainer: {
        flex: 8,
        paddingLeft: 20

    },
    canEditTextContainer: {
        marginTop: 70
    },
    userName: {
        fontSize: 36,
        fontWeight: '300',
        color: '#222',
    },
    emailAddress: {
        fontSize: 20,
        fontWeight: '200',
        lineHeight: 30,
        color: '#222',
    },
    phoneNumber: {
        fontSize: 16,
        fontWeight: '200',
        color: '#222',
    },
    basicInfoText: {
        textAlign: 'center',
        fontSize: 34,
        fontWeight: '200',
    },
    inputsContainer: {
        marginTop: 20,
    },
    LabelInput: {
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 2,
        paddingVertical: 10,

    },
    errorText: {
        fontSize: 12,
        color: 'red',
    },
    button: {
        textAlign: 'center',
        alignItems: 'center'
    },

})