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
import { dateFormatterToShowOnXAxis } from "../../utils/helperFunction/DateFunction";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { commonStyle } from "../../constants/Style";
const maximumDate = new Date();
const minimumDate = new Date(`${maximumDate.getFullYear() - 2}-01-01`)



function UserManagementModalContent({ modalToggler, userName, data, field, label }) {
    const [showDatePicker, setShowDatePicker] = useState(false)
    const defaultValues = {
        [field]: data[data.length - 1]?.value || 0,
        "date": new Date()

    }
    const validationSchema = Yup.object().shape({
        [field]: Yup.number()
            .typeError(`Value must be a number`)       // Show error if not a number
            .positive(`Value must be a positive value`) // Must be positive
            .max(140, `Value must be less than 140`)   // Max value of 140
            .required(`Value is required`),            // Required field
        date: Yup.date().required("Date is required"),   // Validate the date field
    });
    const dispatch = useDispatch();
    const { control, formState: { errors }, handleSubmit } = useForm({
        defaultValues,
        resolver: yupResolver(validationSchema),
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
        let dataToSend = JSON.parse(JSON.stringify(data));
        let flag = 0;
        dataToSend.forEach((ele, index) => {
            let existDate = dateFormatterToShowOnXAxis(ele.date);
            let currentDate = dateFormatterToShowOnXAxis(newDefaultValues.date);
            if (existDate == currentDate) {
                flag = 1;
                ele.value = newDefaultValues[field];
            }
        })
        if (flag == 0) {
            dataToSend.push({ date: newDefaultValues.date, value: newDefaultValues[field] })
        }
        dispatch(updateUserMeasurementForUserCreator(userName, field, dataToSend))
        modalToggler()
    }
    return (
        <View style={styles.scrollViewContainer}>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 50, backgroundColor: '#fff' }}
            >
                <View style={styles.innerModalContent}>
                    <Controller
                        name={field}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <InputPlusMinus
                                placeholder={label}
                                label={`${label} (inch)`}
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
                        {errors[field] && <Text style={[commonStyle.textDanger, styles.error]}>{errors[field]?.message}</Text>}
                    </View>
                    <ButtonSimple title={'Submit'} style={styles.cancelBtn} onPress={(handleSubmit(submitHandler))} color={colors.white} />
                    <ButtonWithBorder title={'Cancel'} style={styles.cancelBtn} onPress={(modalToggler)} />
                </View>

            </ScrollView>
        </View>

    );
}

export default UserManagementModalContent;

const styles = StyleSheet.create({
    scrollViewContainer: {
        backgroundColor: colors.white,
        paddingVertical: 30,
    },
    cancelBtn: {
        margin: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    innerModalContent: {
        padding: 40,
        backgroundColor: colors.white,
    },
    error: {
        marginTop: -10,
    }
})