import { Pressable, ScrollView, View, Text, StyleSheet } from "react-native";
import InputPlusMinus from "../ui/InputPlusMinus";
import ButtonSimple from "../ui/ButtonSimple";
import ButtonWithBorder from "../ui/ButtonWithBorder";
import { colors } from "../../constants/Colors";
import { useState } from "react";



function ModalContent({ modalToggler }) {

    const [defaultValues, setDefaultValues] = useState({
        "armRight": 14,
        "armLeft": 15,
        "leftThigh": 30,
        "rightThigh": 32,
        "leftCalf": 16,
        "rightCalf": 15,
        "waist": 28.5,
        "chest": 45.8,
        "hips": 200,
        "date": new Date()

    })

    const changeTextHandler = (name, val) => {

        setDefaultValues(prev => {
            return ({
                ...prev,
                [name]: val
            })
        })
    }
    const submitHandler = () => {
        // console.log(defaultValues);
        let newDefaultValues = JSON.parse(JSON.stringify(defaultValues))
        for (key in newDefaultValues) {
            if (newDefaultValues[key] == "") {
                newDefaultValues[key] = 0
            }
            else {
                newDefaultValues[key] = parseFloat(newDefaultValues[key])
            }
        }
        console.log(newDefaultValues);

    }
    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 50 }}
        >
            <Pressable style={styles.crossContainer} onPress={modalToggler}>
                <Text style={styles.cross}>x</Text>
            </Pressable>
            <View style={styles.innerModalContent}>
                <InputPlusMinus
                    placeholder={'Arm Right'}
                    label={'Arm Right'}
                    value={defaultValues.armRight}
                    onChangeText={(val) => changeTextHandler('armRight', val)}
                    steps={0.5}
                />
                <InputPlusMinus
                    placeholder={'Arm Left'}
                    label={'Arm Left'}
                    value={defaultValues.armLeft}
                    onChangeText={(val) => changeTextHandler('armLeft', val)}
                    steps={0.5}
                />
                <InputPlusMinus
                    placeholder={'Left Thigh'}
                    label={'Left Thigh'}
                    value={defaultValues.leftThigh}
                    onChangeText={(val) => changeTextHandler('leftThigh', val)}
                    steps={0.5}
                />
                <InputPlusMinus
                    placeholder={'Right Thigh'}
                    label={'Right Thigh'}
                    value={defaultValues.rightThigh}
                    onChangeText={(val) => changeTextHandler('rightThigh', val)}
                    steps={0.5}
                />
                <InputPlusMinus
                    placeholder={'Left Calf'}
                    label={'Left Calf'}
                    value={defaultValues.leftCalf}
                    onChangeText={(val) => changeTextHandler('leftCalf', val)}
                    steps={0.5}
                />
                <InputPlusMinus
                    placeholder={'Right Calf'}
                    label={'Right Calf'}
                    value={defaultValues.rightCalf}
                    onChangeText={(val) => changeTextHandler('rightCalf', val)}
                    steps={0.5}
                />
                <InputPlusMinus
                    placeholder={'Waist'}
                    label={'Waist'}
                    value={defaultValues.waist}
                    onChangeText={(val) => changeTextHandler('waist', val)}
                    steps={0.5}
                />
                <InputPlusMinus
                    placeholder={'Chest'}
                    label={'Chest'}
                    value={defaultValues.chest}
                    onChangeText={(val) => changeTextHandler('chest', val)}
                    steps={0.5}
                />
                <InputPlusMinus
                    placeholder={'Hips'}
                    label={'Hips'}
                    value={defaultValues.hips}
                    onChangeText={(val) => changeTextHandler('hips', val)}
                    steps={0.5}
                />
            </View>
            <ButtonSimple title={'Submit'} style={styles.cancelBtn} onPress={(submitHandler)} color={colors.white} />
            <ButtonWithBorder title={'Cancel'} style={styles.cancelBtn} onPress={(modalToggler)} />
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
        padding: 40
    },
    crossContainer: {
        position: 'absolute',
        top: 0,
        zIndex: 2,
        elevation: 2,
        right: 10,
        padding: 10
    },
    cross: {
        fontSize: 30,
        fontWeight: '400',
        color: colors.primaryDark
    },
})