import { View, Text, StyleSheet, Platform } from "react-native";
import { colors } from "../../constants/Colors";
import InputLabelCustom from "../../components/ui/InputLabelCustom";
import ButtonSimple from "../../components/ui/ButtonSimple";
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Slider from '@react-native-community/slider';
import { RadioButton } from 'react-native-paper';
import { useState } from "react";

const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    birthDate: yup.number().typeError('Birth Date must be a number').required('Birth is required').positive().integer(),
    height: yup.number().typeError('Height must be a number').required('Height is required').positive(),
    targetedWeight: yup.number().typeError('Targeted Weight must be a number').required('Targeted weight is required').positive(),
    bio: yup.string().max(50, "Bio should not more than 50 character"),
    gender: yup.string().oneOf(['male', 'female', 'others'], 'Gender must be either male or female').required('Gender is required'),
});
function UserUpdateForm({ defaultValueUser, submitHandler }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValueUser
    });
    const [height, setHeight] = useState(defaultValueUser.height)
    const [targetedWeight, setTargetedWeight] = useState(defaultValueUser.targetedWeight)

    return (
        <View style={styles.canEditTextContainer}>
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
                <Text style={styles.label}>Gender</Text>
                <Controller
                    name="gender"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <RadioButton.Group onValueChange={onChange} value={value} style={styles.flex}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={styles.radioContainer}>
                                    <Text>Male</Text>
                                    <RadioButton value="male" />
                                </View>
                                <View style={styles.radioContainer}>
                                    <Text>Female</Text>
                                    <RadioButton value="female" />
                                </View>
                                <View style={styles.radioContainer}>
                                    <Text>Others</Text>
                                    <RadioButton value="others" />
                                </View>
                            </View>
                        </RadioButton.Group>
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
                <Text style={styles.label}>Height {height} cm</Text>
                <Controller
                    name="height"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Slider
                            style={styles.slider}
                            minimumValue={120}
                            maximumValue={240}
                            value={value}
                            thumbImage={Platform.OS == "ios" ? require('../../assets/images/sliders/tape.png') : require('../../assets/images/sliders/tapeAndroid.png')}
                            onValueChange={(val) => {
                                setHeight(val)
                                onChange(val)
                            }}
                            step={1}
                            minimumTrackTintColor={colors.primaryDark}
                            maximumTrackTintColor={colors.grey}
                        />

                    )}
                />
                {errors.height && <Text style={styles.errorText}>{errors.height.message}</Text>}
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

                <Text style={styles.label}>Targeted Weight {targetedWeight} kg</Text>
                <Controller
                    name="targetedWeight"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Slider
                            style={styles.slider}
                            minimumValue={30}
                            maximumValue={200}
                            value={value}
                            thumbImage={Platform.OS == "ios" ? require('../../assets/images/sliders/weight.png') : require('../../assets/images/sliders/weightAndroid.png')}
                            onValueChange={(val) => {
                                setTargetedWeight(val)
                                onChange(val)
                            }}
                            step={1}
                            minimumTrackTintColor={colors.primaryDark}
                            maximumTrackTintColor={colors.grey}
                        />
                    )}
                />
                {errors.targetedWeight && <Text style={styles.errorText}>{errors.targetedWeight.message}</Text>}
                <ButtonSimple
                    title={'Submit'}
                    color={colors.white}
                    onPress={handleSubmit(submitHandler)}
                    style={styles.button} />

            </View>
        </View>
    );
}

export default UserUpdateForm;

const styles = StyleSheet.create({


    canEditTextContainer: {
        marginTop: 0
    },
    flex: {
        flexDirection: 'row',
    },
    label: {
        color: colors.primaryDark,
        paddingVertical: 10
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
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
    slider: {
        width: '80%',
        height: 40,
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft: Platform.select({ ios: 0, android: -8 }),
        maxWidth: 700,
    },

    button: {
        marginTop: 30,
        textAlign: 'center',
        alignItems: 'center'
    },
})