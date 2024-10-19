import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { updateWeightForUserCreator } from "../../ActionCreators/userActionsCreator";
import { colors } from "../../constants/Colors";
import ButtonWithBorder from "../ui/ButtonWithBorder";
import Slider from "@react-native-community/slider";
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonSimple from "../ui/ButtonSimple";


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

    const updateWeight = (data) => {
        dispatch(updateWeightForUserCreator(userName, data))
        modalToggler()
    }
    return (
        <Pressable style={styles.modalOverlay} onPress={modalToggler}>
            <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
                <Text>Weight: {sliderWeight} kg</Text>
                <Controller
                    name="value"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                        return <Slider
                            style={styles.slider}
                            minimumValue={30}
                            maximumValue={200}
                            value={value}
                            thumbImage={require('../../assets/images/sliders/weight.png')}
                            onValueChange={(val) => {
                                setSliderWeight(val)
                                onChange(val)
                            }}
                            step={0.5}
                            minimumTrackTintColor={colors.primaryDark}
                            maximumTrackTintColor={colors.grey}
                        />
                    }}
                />
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
            </Pressable>
        </Pressable>
    );
}

export default WeightAddModalContent;

let styles = StyleSheet.create({

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#bbb',
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
        marginTop: 40,
        // backgroundColor: '#ddd'
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