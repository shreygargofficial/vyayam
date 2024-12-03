import { useForm, Controller } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { RadioButton } from "react-native-paper";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Picker } from '@react-native-picker/picker';
import InputLabelCustom from "../ui/InputLabelCustom";
import ButtonSimple from "../ui/ButtonSimple";
import { sortArrayBasedOnDate } from "../../utils/helperFunction/DateFunction";
import { colors } from "../../constants/Colors";

const schema = yup.object().shape({
    age: yup.number().typeError('Age must be a number').required('Age is required').positive(),
    height: yup.number().typeError('Height must be a number').required('Height is required').positive(),
    weight: yup.number().typeError('Weight must be a number').required('Weight is required').positive(),
    gender: yup.string().oneOf(['male', 'female', 'others'], 'Gender must be either male or female').required('Gender is required'),
    activityLevel: yup.number().required()
});



export default function TDEE({ setTdee, setBMR }) {

    const userData = useSelector(state => state.user.userData);
    const sortedWeightArray = useMemo(
        () => sortArrayBasedOnDate(userData?.weight),
        [userData?.weight]
    )
    const defaultValue = {
        age: new Date().getFullYear() - userData.birthDate,
        height: userData.height,
        gender: userData.gender,
        weight: sortedWeightArray[userData?.weight?.length - 1].value,
        activityLevel: 1.2
    }
    const { control, formState: { errors }, handleSubmit } = useForm({
        defaultValues: defaultValue,
        resolver: yupResolver(schema)
    })

    const tdeeCalculater = ({ weight, height, age, gender, activityLevel }) => {
        const bmr = 10 * weight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161);
        const tdee = bmr * activityLevel;
        setTdee(tdee);
        setBMR(bmr)
    }
    return (
        <View style={styles.form}>
            <View style={styles.formInputWrapper}>
                <Controller
                    control={control}
                    name="height"
                    render={({ field: { onChange, value } }) => (
                        <InputLabelCustom
                            labelColor={colors.primary}
                            onChangeText={onChange}
                            value={value.toString()}
                            label={'Height (cm)'}
                            style={styles.inputNormal}
                        />

                    )}
                />
                <Text style={styles.error}>{errors?.height?.message}</Text>
            </View>
            <View style={styles.formInputWrapper}>
                <Controller
                    control={control}
                    name="weight"
                    render={({ field: { onChange, value } }) => (
                        <InputLabelCustom
                            labelColor={colors.primary}
                            onChangeText={onChange}
                            value={value.toString()}
                            label={'Weight (kg)'}
                            style={styles.inputNormal}
                        />
                    )}
                />
                <Text style={styles.error}>{errors?.weight?.message}</Text>
            </View>
            <View style={styles.formInputWrapper}>
                <Controller
                    control={control}
                    name="age"
                    render={({ field: { onChange, value } }) => (
                        <InputLabelCustom
                            labelColor={colors.primary}
                            onChangeText={onChange}
                            value={value.toString()}
                            label={'Age'}
                            style={styles.inputNormal}
                        />
                    )}
                />
                <Text style={styles.error}>{errors?.age?.message}</Text>
            </View>
            <View style={styles.formInputWrapper}>
                <Controller
                    name="gender"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <RadioButton.Group onValueChange={onChange} value={value}>
                            <Text style={styles.label}>Gender</Text>
                            <View style={styles.flex}>
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
            </View>
            <View style={[styles.formInputWrapper, styles.selectFormField]}>
                <Controller
                    name="activityLevel"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <RadioButton.Group onValueChange={onChange} value={value}>
                            <Text style={styles.label}>Your Activity Level</Text>
                            <View style={styles.radioContainer}>
                                <Text>Sedentary</Text>
                                <RadioButton value={1.2} />
                            </View>
                            <View style={styles.radioContainer}>
                                <Text>Lightly Active</Text>
                                <RadioButton value={1.375} />
                            </View>
                            <View style={styles.radioContainer}>
                                <Text>Moderately Active</Text>
                                <RadioButton value={1.55} />
                            </View>
                            <View style={styles.radioContainer}>
                                <Text>Very Activee</Text>
                                <RadioButton value={1.725} />
                            </View>
                            <View style={styles.radioContainer}>
                                <Text>Extremely Active</Text>
                                <RadioButton value={1.9} />
                            </View>
                        </RadioButton.Group>
                    )}
                />
            </View>



            <View style={styles.formInputWrapper}>
                <ButtonSimple
                    title={'Calculate'}
                    style={styles.tdeeButton}
                    onPress={handleSubmit(tdeeCalculater)}
                    color={colors.white}
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 20,
    },
    tdeeHeading: {
        lineHeight: 30,
        letterSpacing: 1,
        fontWeight: '200',
        fontSize: 22,
    },
    form: {
        borderColor: colors.primaryDark,
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 30,
        paddingVertical: 40,
    },
    error: {
        color: colors.red200,
        fontSize: 12,
        marginBottom: 10,
    },
    formInputWrapper: {
        marginVertical: -10,
        paddingHorizontal: 30,
    },
    selectFormField: {
        marginTop: 50,
    },
    itemStyleList: {

    },
    inputNormal: {
        borderColor: colors.grey,
        borderBottomWidth: 1
    },
    flex: {
        flexDirection: 'row',
    },
    label: {
        color: colors.primary,
        marginBottom: 10,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tdeeButton: {
        backgroundColor: colors.primaryDark,
        marginTop: 60,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
    },
})