import { FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { styles as weightLogStyles } from "./WeightLog";
import IconButton from "../../ui/IconButton";
import { colors } from "../../../constants/Colors";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import UserMeasurementModalContent from "../../userMeasurement/UserMeasurementModalContent";
import { sortArrayBasedOnDate } from "../../../utils/helperFunction/DateFunction";
import GraphUserMeasurements from "../../ui/GraphUserMeasurements";
import { MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { commonStyle } from "../../../constants/Style";

function ListCardComponentBodyMeasurement({ label, data, onPress }) {

    return (
        <Pressable
            onPress={() => onPress(label)}
            style={({ pressed }) => [styles.listCard, pressed && commonStyle.pressed]}
        >
            <Text style={styles.listLabel}>{label}</Text>
            <Text style={styles.listValue}>{data[data.length - 1]} inch</Text>
            <MaterialIcons style={styles.listIcon} name="arrow-forward-ios" size={30} color={colors.primary} />
        </Pressable>
    )
}

export default function BodyMeasurementList() {
    const [showModal, setShowModal] = useState(false);
    const [selectedMuscle, setSelectedMuscle] = useState(null);
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.userData.bodyMeasurements.length == 0) {
            setShowModal(true)
        }
    }, [user.userData.bodyMeasurements])

    const muscleSelectedToggle = (label) => {
        if (selectedMuscle !== label)
            setSelectedMuscle(label)
        else
            setSelectedMuscle(null)
    }
    const modalToggler = useCallback(() => {
        setShowModal((prev) => !prev);
    }, []);

    let sortedBodyMeasurement = useMemo(() => {
        return sortArrayBasedOnDate(user.userData.bodyMeasurements)
    }, [user.userData]);



    const {
        dateData,
        armLeftData,
        armRightData,
        chestData,
        hipsData,
        leftCalfData,
        leftThighData,
        rightCalfData,
        rightThighData,
        waistData,
        forearmData,
        bellyInData,
        bellyOutData
    } = useMemo(() => {
        let dateData = [];
        let armLeftData = [];
        let armRightData = [];
        let chestData = [];
        let hipsData = [];
        let leftCalfData = [];
        let leftThighData = [];
        let rightCalfData = [];
        let rightThighData = [];
        let waistData = [];
        let forearmData = [];
        let bellyOutData = [];
        let bellyInData = [];
        for (let measurementData of sortedBodyMeasurement) {
            dateData.push(measurementData.date);
            armLeftData.push(measurementData.measurements.armLeft)
            armRightData.push(measurementData.measurements.armRight)
            chestData.push(measurementData.measurements.chest)
            hipsData.push(measurementData.measurements.hips)
            leftCalfData.push(measurementData.measurements.leftCalf)
            leftThighData.push(measurementData.measurements.leftThigh)
            rightCalfData.push(measurementData.measurements.rightCalf)
            rightThighData.push(measurementData.measurements.rightThigh)
            waistData.push(measurementData.measurements.waist);
            forearmData.push(measurementData.measurements.forearm || 0);
            bellyOutData.push(measurementData.measurements.bellyOut || 0);
            bellyInData.push(measurementData.measurements.bellyIn || 0);


        }
        return {
            dateData,
            armLeftData,
            armRightData,
            chestData,
            hipsData,
            leftCalfData,
            leftThighData,
            rightCalfData,
            rightThighData,
            waistData,
            forearmData,
            bellyInData,
            bellyOutData
        }
    }, [sortedBodyMeasurement]);

    let arrayMuscleData = [
        {
            label: 'Arm Left',
            data: armLeftData,
            color: colors.red
        },
        {
            label: 'Arm Right',
            data: armRightData,
            color: colors.primary
        },
        {
            label: 'Chest',
            data: chestData,
            color: colors.green
        },
        {
            label: 'Hips',
            data: hipsData,
            color: colors.purple100
        },
        {
            label: 'Left Calf',
            data: leftCalfData,
            color: colors.red200
        },
        {
            label: 'Right Calf',
            data: rightCalfData,
            color: colors.orange
        },
        {
            label: 'Forearm',
            data: forearmData,
            color: colors.brown
        },
        {
            label: 'Left Thigh',
            data: leftThighData,
            color: colors.black
        },
        {
            label: 'Right Thigh',
            data: rightThighData,
            color: colors.primaryDark
        },
        {
            label: 'Belly In',
            data: bellyInData,
            color: colors.purple800
        },
        {
            label: 'Belly Out',
            data: bellyOutData,
            color: colors.red
        },

        {
            label: 'Waist',
            data: waistData,
            color: colors.brown
        }


    ]

    return (
        <View style={styles.root}>
            {
                (sortedBodyMeasurement && sortedBodyMeasurement?.length) ?
                    <View style={styles.allGraphs}>
                        <View>
                            <Text style={styles.heading}>Measurements </Text>
                        </View>

                        <ScrollView contentContainerStyle={{
                            paddingBottom: 260
                        }}
                            alwaysBounceVertical={false}
                            showsVerticalScrollIndicator={false}
                        >
                            {arrayMuscleData.map(muscleData => (
                                <View key={muscleData.label}>
                                    <ListCardComponentBodyMeasurement label={muscleData.label} data={muscleData.data} onPress={muscleSelectedToggle} />
                                    {muscleData.label == selectedMuscle &&
                                        (
                                            <Animatable.View
                                                style={styles.rowFlexing}
                                                animation="fadeInDown"
                                                easing={'linear'}
                                                duration={360}
                                                iterationCount={1}
                                            >
                                                <Text style={styles.subHeading}>{muscleData.label}</Text>
                                                <GraphUserMeasurements color={muscleData.color} dateData={dateData} measurementData={muscleData.data} />
                                            </Animatable.View>
                                        )}
                                </View>
                            ))}

                        </ScrollView>

                    </View>
                    :
                    <View style={{ flex: 1, justifyContent: 'center', marginTop: -130 }}>
                        <Text style={styles.headingMuscle}>
                            Please Log your First Measurement!
                        </Text>
                    </View>
            }

            <Modal
                visible={showModal}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.overlay} >
                    <View style={styles.modalContent}>
                        <Pressable style={styles.crossContainer} onPress={modalToggler}>
                            <Text style={styles.cross}>x</Text>
                        </Pressable>
                        <UserMeasurementModalContent
                            modalToggler={modalToggler}
                            userName={user.userData.userName}
                            sortedBodyMeasurement={
                                (sortedBodyMeasurement && sortedBodyMeasurement.length)
                                    ? (sortedBodyMeasurement[sortedBodyMeasurement.length - 1])
                                    : null
                            }
                        />
                    </View>

                </View>


            </Modal>
            {/* </ScrollView> */}

            <IconButton
                name={'add'}
                size={25}
                color={colors.white}
                style={[weightLogStyles.iconButton, styles.iconButton]}
                onPress={modalToggler}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.white
    },
    heading: {
        margin: 20,
        fontFamily: 'caviarb',
        fontSize: 40,

    },
    subHeading: {
        margin: 20,
        fontFamily: 'caviarb',
        fontSize: 20,
        textAlign: 'center'
    },
    iconButton: {
        top: 16,
        right: 16
    },
    listCard: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        paddingVertical: 20,
        paddingHorizontal: 5,
        margin: 10,
        elevation: 7,
        shadowColor: colors.grey,
        backgroundColor: colors.white,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.6,
        zIndex: 900,
        shadowRadius: 4,

    },
    listLabel: {
        color: colors.black,
        fontWeight: '400',
        flex: 8
    },

    listValue: {
        flex: 2,
        textAlign: 'right',
        // marginLeft: 240,
    },
    listIcon: {
        flex: 1,
        textAlign: 'right'
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'flex-end'
    },
    modalContent: {
        maxHeight: '80%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden'

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
        paddingBottom: 2,
        paddingHorizontal: 8,
        fontSize: 20,
        fontWeight: '800',
        color: colors.primaryDark
    },

})