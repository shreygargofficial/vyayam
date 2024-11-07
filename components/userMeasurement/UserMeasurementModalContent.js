import { Pressable, ScrollView, View, Text, StyleSheet, Platform } from "react-native";
import InputPlusMinus from "../ui/InputPlusMinus";
import ButtonSimple from "../ui/ButtonSimple";
import ButtonWithBorder from "../ui/ButtonWithBorder";
import { colors } from "../../constants/Colors";
import { Controller, useForm, useWatch } from "react-hook-form";
import { styles as weightLogModalStyle } from "../weight/WeightAddModalContent";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserMeasurementForUserCreator, updateWeightForUserCreator } from "../../redux/ActionCreators/userActionsCreator";
const maximumDate = new Date();
const minimumDate = new Date(`${maximumDate.getFullYear() - 2}-01-01`)

function ModalContent({ modalToggler, userName, sortedBodyMeasurement }) {
    const [showDatePicker, setShowDatePicker] = useState(false)
    const defaultValues = {
        "armRight": sortedBodyMeasurement?.measurements?.armRight || 0,
        "armLeft": sortedBodyMeasurement?.measurements?.armLeft || 0,
        "leftThigh": sortedBodyMeasurement?.measurements?.leftThigh || 0,
        "rightThigh": sortedBodyMeasurement?.measurements?.rightThigh || 0,
        "leftCalf": sortedBodyMeasurement?.measurements?.leftCalf || 0,
        "rightCalf": sortedBodyMeasurement?.measurements?.rightCalf || 0,
        "waist": sortedBodyMeasurement?.measurements?.waist || 0,
        "chest": sortedBodyMeasurement?.measurements?.chest || 0,
        "hips": sortedBodyMeasurement?.measurements?.hips || 0,
        "date": new Date()

    }
    const dispatch = useDispatch();
    const { control, formState: { errors }, handleSubmit } = useForm({
        defaultValues,
    })

    const selectedDate = useWatch({ control, name: "date" })

    const submitHandler = (val) => {
        let newDefaultValues = JSON.parse(JSON.stringify(val))
        for (key in newDefaultValues) {
            if (key !== 'date')
                if (newDefaultValues[key] == "") {
                    newDefaultValues[key] = 0
                }
                else {
                    newDefaultValues[key] = parseFloat(newDefaultValues[key])
                }
        }
        dispatch(updateUserMeasurementForUserCreator(userName, newDefaultValues))
        modalToggler()

    }
    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 50, backgroundColor: '#bbb' }}
        >
            <View style={styles.innerModalContent}>
                <Controller
                    name="armLeft"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <InputPlusMinus
                            placeholder={'Arm Left'}
                            label={'Arm Left(cm)'}
                            value={value}
                            onChangeText={onChange}
                            steps={0.5}
                        />
                    )}
                />
                <Controller
                    name="armRight"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <InputPlusMinus
                            placeholder={'Arm Right'}
                            label={'Arm Right(cm)'}
                            value={value}
                            onChangeText={onChange}
                            steps={0.5}
                        />
                    )}
                />
                <Controller
                    name="leftCalf"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <InputPlusMinus
                            placeholder={'Left Calf'}
                            label={'Left Calf(cm)'}
                            value={value}
                            onChangeText={onChange}
                            steps={0.5}
                        />
                    )}
                />

                <Controller
                    name="rightCalf"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <InputPlusMinus
                            placeholder={'Right Calf'}
                            label={'Right Calf(cm)'}
                            value={value}
                            onChangeText={onChange}
                            steps={0.5}
                        />
                    )}
                />
                <Controller
                    name="leftThigh"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <InputPlusMinus
                            placeholder={'Left Thigh'}
                            label={'Left Thigh(cm)'}
                            value={value}
                            onChangeText={onChange}
                            steps={0.5}
                        />
                    )}
                />
                <Controller
                    name="rightThigh"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <InputPlusMinus
                            placeholder={'Right Thigh'}
                            label={'Right Thigh(cm)'}
                            value={value}
                            onChangeText={onChange}
                            steps={0.5}
                        />
                    )}
                />


                <Controller
                    name="waist"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <InputPlusMinus
                            placeholder={'Waist'}
                            label={'Waist(cm)'}
                            value={value}
                            onChangeText={onChange}
                            steps={0.5}
                        />
                    )}
                />
                <Controller
                    name="chest"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <InputPlusMinus
                            placeholder={'Chest'}
                            label={'Chest(cm)'}
                            value={value}
                            onChangeText={onChange}
                            steps={0.5}
                        />
                    )}
                />
                <Controller
                    name="hips"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <InputPlusMinus
                            placeholder={'Hips'}
                            label={'Hips(cm)'}
                            value={value}
                            onChangeText={onChange}
                            steps={0.5}
                        />
                    )}
                />
                <Text style={{ marginTop: 30 }}>{selectedDate.toDateString()}</Text>
                <View style={weightLogModalStyle.dateContainer}>
                    <ButtonWithBorder
                        title="Measurement Date"
                        style={weightLogModalStyle.buttonDate}
                        onPress={() => setShowDatePicker((prev) => !prev)} color={colors.primaryDark} />
                    {showDatePicker &&
                        <Controller
                            name="date"
                            control={control}
                            render={({ field: { onChange, value } }) => {
                                return <DateTimePicker
                                    value={value}
                                    mode="date"
                                    textColor="red" //Not working
                                    display="inline"
                                    onChange={(event, selectedDate) => {
                                        if (event.type === "dismissed" || !selectedDate) {
                                            setShowDatePicker(false); // Hide picker when dismissed
                                        } else {
                                            if (Platform.OS == 'android')
                                                setShowDatePicker(false); // Hide picker after selecting date
                                            onChange(selectedDate); // Update the form field with the selected date
                                        }
                                    }}
                                    maximumDate={maximumDate}  // This prevents picking a future year
                                    minimumDate={minimumDate}
                                />
                            }}
                        />}
                </View>
                <ButtonSimple title={'Submit'} style={styles.cancelBtn} onPress={(handleSubmit(submitHandler))} color={colors.white} />
                <ButtonWithBorder title={'Cancel'} style={styles.cancelBtn} onPress={(modalToggler)} />
            </View>

        </ScrollView>
    );
}

export default ModalContent;

const styles = StyleSheet.create({

    cancelBtn: {
        margin: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    innerModalContent: {
        padding: 40,
        backgroundColor: '#bbb',
    },

})