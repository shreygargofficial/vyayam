import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { styles as weightLogStyles } from "./WeightLog";
import IconButton from "../../ui/IconButton";
import { colors } from "../../../constants/Colors";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import UserMeasurementModalContent from "../../userMeasurement/UserMeasurementModalContent";
import { sortArrayBasedOnDate } from "../../../utils/helperFunction/DateFunction";
import GraphUserMeasurements from "../../ui/GraphUserMeasurements";


function BodyMeasurement() {
    const [showModal, setShowModal] = useState(false);
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.userData.bodyMeasurements.length == 0) {
            setShowModal(true)
        }
    }, [user.userData.bodyMeasurements])

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
            waistData.push(measurementData.measurements.waist)

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
        }
    }, [sortedBodyMeasurement]);

    return (
        <View style={{ flex: 1 }}>
            {
                (sortedBodyMeasurement && sortedBodyMeasurement?.length) ?
                    <View style={styles.allGraphs}>
                        <FlatList
                            data={
                                [
                                    { dateData, measurementData: armLeftData, color: colors.red, label: "Left Arm Measurement" },
                                    { dateData, measurementData: armRightData, color: colors.primary, label: "Right Arm Measurement" },
                                    { dateData, measurementData: leftCalfData, color: colors.purple100, label: "Left Calf Measurement" },
                                    { dateData, measurementData: rightCalfData, color: colors.brown, label: "Right Calf Measurement" },
                                    { dateData, measurementData: leftThighData, color: colors.orange, label: "Left Thigh Measurement" },
                                    { dateData, measurementData: rightThighData, color: colors.purple800, label: "Right Thigh Measurement" },
                                    { dateData, measurementData: waistData, color: colors.red200, label: "Waist Measurement" },
                                    { dateData, measurementData: chestData, color: colors.black, label: "Chest Measurement" },
                                    { dateData, measurementData: hipsData, color: colors.green, label: "Hips Measurement" }

                                ]
                            }
                            renderItem={({ item: { dateData, measurementData, color, label } }) => {
                                return (
                                    <View style={styles.graphContainer}>
                                        <Text style={styles.headingMuscle}>{label}</Text>
                                        <GraphUserMeasurements color={color} dateData={dateData} measurementData={measurementData} />
                                    </View>
                                )
                            }}
                            keyExtractor={(item) => item.label}
                            initialNumToRender={3}
                            windowSize={5}
                        />

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

export default BodyMeasurement;

const styles = StyleSheet.create({
    iconButton: {
        bottom: 100,
        right: 16
    },
    allGraphs: {
        marginTop: 2,
    },
    graphContainer: {
        marginVertical: 10,
    },
    headingMuscle: {
        marginVertical: 10,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '300',
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'flex-end'
    },
    modalContent: {
        backgroundColor: '#bbb',
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
        fontSize: 30,
        fontWeight: '400',
        color: colors.primaryDark
    },

})