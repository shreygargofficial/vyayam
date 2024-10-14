import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { styles } from "./SignUp";
import { useState } from "react";
import ButtonSimple from "../../../components/ui/ButtonSimple";
import { useForm, Controller, useWatch } from "react-hook-form";
import { colors } from "../../../constants/Colors";

const weightArray = new Array(170).fill(0).map((_, index) => (index + 30));
const heightArray = new Array(125).fill(0).map((_, index) => (index + 120));
const maxYear = parseInt(new Date().getFullYear() - 14);
const minYear = parseInt(new Date().getFullYear() - 80);
const minimumDate = new Date(`${minYear}-01-01`);
const maximumDate = new Date(`${maxYear}-01-01`);


function BasicInfo() {

    const navigation = useNavigation()
    const route = useRoute()
    const [show, setShow] = useState(false);
    const defaultValues = {
        birthDate: maximumDate,
        gender: 'female',
        height: 175,
        weight: 60,
        targetedWeight: 65
    }
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: defaultValues
    }
    )

    const date = useWatch({ control, name: "birthDate" })
    const nextHandler = (val) => {
        let finalData = {
            ...route.params,
            ...val,
            birthDate: val.birthDate.getFullYear(),
            weight: parseInt(val.weight),
            targetedWeight: parseInt(val.targetedWeight),
            height: parseInt(val.height)
        }
        navigation.navigate('password', {
            ...finalData
        })

    }


    return (
        <ScrollView style={infoStyles.root} contentContainerStyle={{ paddingBottom: 100 }}>
            <View style={styles}>
                <Text style={[styles.signUpText, infoStyles.centerAlign]}>
                    About You
                </Text>
            </View>
            <View style={{ marginTop: -150 }}>
                <View style={infoStyles.rowFlexing}>
                    <View style={infoStyles.marginTop}>
                        <Text style={[infoStyles.centerAlign, infoStyles.bold]}>Weight(kg)</Text>
                        <Controller
                            name="weight"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Picker
                                    selectedValue={value}
                                    onValueChange={onChange}
                                    style={infoStyles.picker}
                                >
                                    {
                                        weightArray.map(ele => {
                                            return <Picker.Item key={ele} label={ele} value={ele} />
                                        })
                                    }

                                </Picker>
                            )}
                        />

                    </View>
                    <View style={infoStyles.marginTop}>
                        <Text style={[infoStyles.centerAlign, infoStyles.bold]}>Targeted Weight(kg)</Text>
                        <Controller
                            name="targetedWeight"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Picker
                                    selectedValue={value}
                                    onValueChange={onChange}
                                    style={infoStyles.picker}
                                >
                                    {
                                        weightArray.map(ele => {
                                            return <Picker.Item key={ele} label={ele} value={ele} />
                                        })
                                    }

                                </Picker>
                            )}
                        />

                    </View>
                </View>
                <View style={infoStyles.rowFlexing}>
                    <View style={infoStyles.marginTop}>
                        <Text style={[infoStyles.centerAlign, infoStyles.bold]}>Height(cm)</Text>
                        <Controller
                            name="height"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Picker
                                    selectedValue={value}
                                    onValueChange={onChange}
                                    style={infoStyles.picker}
                                >
                                    {
                                        heightArray.map(ele => {
                                            return <Picker.Item key={ele} label={ele} value={ele} />
                                        })
                                    }

                                </Picker>
                            )}
                        />

                    </View>
                    <View style={infoStyles.marginTop}>
                        <Text style={[infoStyles.centerAlign, infoStyles.bold]}>Gender</Text>
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Picker
                                    selectedValue={value}
                                    onValueChange={onChange}
                                    style={infoStyles.picker}

                                >
                                    <Picker.Item label={'Male'} value={'male'} />
                                    <Picker.Item label={'Female'} value={'female'} />
                                    <Picker.Item label={'Others'} value={'others'} />
                                </Picker>
                            )}
                        />

                    </View>
                </View>
                <View style={infoStyles.rowFlexing}>
                    <View>
                        <Button title="Select Date of Birth" onPress={() => setShow(true)} color={colors.primary} />
                        {show && <Controller
                            name="birthDate"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <DateTimePicker
                                    value={value}
                                    mode="date"
                                    display="spinner"
                                    onChange={(event, selectedDate) => {
                                        if (event.type === "dismissed" || !selectedDate) {
                                            setShow(false); // Hide picker when dismissed
                                        } else {
                                            if (Platform.OS == 'android')
                                                setShow(false); // Hide picker after selecting date
                                            onChange(selectedDate); // Update the form field with the selected date
                                        }
                                    }}
                                    maximumDate={maximumDate}  // This prevents picking a future year
                                    minimumDate={minimumDate}
                                />
                            )}
                        />}
                    </View>
                </View>
                <Text style={{ textAlign: 'center', marginTop: 10, color: colors.primary }}>{date.toDateString()}</Text>
            </View>
            <View style={[styles.buttonContainer, { marginTop: 40 }]}>
                <ButtonSimple
                    disabled={false}
                    style={styles.button} title={'Next'}
                    onPress={handleSubmit(nextHandler)}
                    color={colors.white} />
            </View>

        </ScrollView>);
}

export default BasicInfo;

const infoStyles = StyleSheet.create({
    root: {
        padding: 10
    },
    rowFlexing: {
        flexDirection: 'row',
        marginTop: 200,
        justifyContent: 'space-evenly'
    },
    centerAlign: {
        textAlign: Platform.select({ android: 'auto', ios: 'center' }),

    },
    bold: {
        fontWeight: '800'
    },
    marginTop: {
        marginTop: 20
    },
    picker: {
        height: 20,
        width: 150
    }
})