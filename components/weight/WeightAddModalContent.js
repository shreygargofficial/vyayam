import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { useDispatch } from "react-redux";
import { updateWeightForUserCreator } from "../../redux/ActionCreators/userActionsCreator";
import { colors } from "../../constants/Colors";
import ButtonWithBorder from "../ui/ButtonWithBorder";
import Slider from "@react-native-community/slider";
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonSimple from "../ui/ButtonSimple";
import InputPlusMinus from "../ui/InputPlusMinus";
import { dateFormatterToShowOnXAxis } from "../../utils/helperFunction/DateFunction";


const maximumDate = new Date();
const minimumDate = new Date(`${maximumDate.getFullYear() - 2}-01-01`)

function WeightAddModalContent({ sortedWeightArray, userName, modalToggler }) {
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [sliderWeight, setSliderWeight] = useState(sortedWeightArray[sortedWeightArray.length - 1].value)
    const dispatch = useDispatch()
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            value: sortedWeightArray[sortedWeightArray.length - 1].value,
            date: new Date()
        }
    })
    const selectedDate = useWatch({ control, name: "date" })

    const updateWeight = (newDefaultValues) => {
        let dataToSend = JSON.parse(JSON.stringify(sortedWeightArray));
        let flag = 0;
        dataToSend.forEach((ele, index) => {
            let existDate = dateFormatterToShowOnXAxis(ele.date);
            let currentDate = dateFormatterToShowOnXAxis(newDefaultValues.date);
            if (existDate == currentDate) {
                flag = 1;
                ele.value = newDefaultValues['value'];
            }
        })
        if (flag == 0) {
            dataToSend.push({ date: newDefaultValues.date, value: newDefaultValues['value'] })
        }

        dispatch(updateWeightForUserCreator(userName, dataToSend))

        modalToggler()
    }
    return (
        <Pressable style={styles.modalOverlay} onPress={modalToggler}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={0} // Adjust based on your UI
                >
                    <View>
                        <ScrollView contentContainerStyle={styles.modalContent} onPress={(e) => e.stopPropagation()}>
                            <Text>Weight: {sliderWeight} kg</Text>
                            <Controller
                                name="value"
                                control={control}
                                render={({ field: { onChange, value } }) => {
                                    return <InputPlusMinus
                                        placeholder={"Your Weight"}
                                        onChangeText={onChange}
                                        steps={0.5}
                                        value={value}
                                        label={"Your Weight"}

                                    />
                                }}
                            />
                            <Text style={{ marginTop: 10 }}>{selectedDate.toDateString()}</Text>
                            <View style={styles.dateContainer}>
                                <ButtonWithBorder
                                    title="Date of Measurement"
                                    style={styles.buttonDate}
                                    onPress={() => setShowDatePicker((prev) => !prev)} color={colors.primaryDark} />
                                {showDatePicker && <Controller
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
                            <ButtonSimple
                                onPress={handleSubmit(updateWeight)}
                                color={colors.white}
                                title="Submit"
                                style={styles.submitBtn} />
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Pressable>
    );
}


export default WeightAddModalContent;

export let styles = StyleSheet.create({

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    slider: {
        width: '80%',
        height: 40,
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 20,
        marginLeft: Platform.select({ ios: 0, android: -8 }),
        maxWidth: 700,
    },
    dateContainer: {
        marginTop: 20,
    },
    buttonDate: {
        paddingVertical: 8,
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        marginBottom: 40,
    },
    submitBtn: {
        alignItems: 'center',
        borderRadius: 9
    },
})