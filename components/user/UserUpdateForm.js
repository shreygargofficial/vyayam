import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import InputLabelCustom from "../../components/ui/InputLabelCustom";
import ButtonSimple from "../../components/ui/ButtonSimple";
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';



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
    // const { firstName, lastName, age, gender, bio, targetedWeight, birthDate }  = defaultValueUser;
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValueUser
    });
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

            </View>
        </View>
    );
}

export default UserUpdateForm;

const styles = StyleSheet.create({


    canEditTextContainer: {
        marginTop: 70
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